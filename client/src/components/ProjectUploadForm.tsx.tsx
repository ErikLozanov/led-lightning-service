import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface ProjectUploadFormProps {
  onSuccess: () => void;
}

const ProjectUploadForm = ({ onSuccess }: ProjectUploadFormProps) => {
  const [carModel, setCarModel] = useState('');
  const [description, setDescription] = useState('');
  const [productionYear, setProductionYear] = useState(''); 
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [extraFiles, setExtraFiles] = useState<File[]>([]); 
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleExtraFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to Array and add to existing list
      setExtraFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeExtraFile = (index: number) => {
    setExtraFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile || !carModel) {
      toast.success("Моля попълнете задължителните полета (Модел, Описание, Преди/След).");
      return;
    }

    try {
      setUploading(true);

      const beforeUrl = await uploadImage(beforeFile);
      const afterUrl = await uploadImage(afterFile);

      const extraImageUrls = await Promise.all(
        extraFiles.map(file => uploadImage(file))
      );

      // 3. Send to Backend
      await api.post('/gallery', {
        car_model: carModel,
        description,
        production_year: productionYear,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        extra_images: extraImageUrls
      });

      toast.success("Проектът е добавен успешно!");
      onSuccess();

    } catch (error) {
      console.error("Upload failed:", error);
      toast.success("Грешка при качване.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-lg space-y-4 text-left border border-slate-700">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Model */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Модел *</label>
          <input 
            type="text" 
            value={carModel}
            onChange={e => setCarModel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-neon-blue outline-none"
            placeholder="Audi A6 C7"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Година (Опция)</label>
          <input 
            type="text" 
            value={productionYear}
            onChange={e => setProductionYear(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-neon-blue outline-none"
            placeholder="2015"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Описание *</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-neon-blue outline-none"
          rows={3}
        />
      </div>

      {/* Main Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-red-400 font-bold mb-2">📸 СНИМКА ПРЕДИ *</label>
          <input type="file" accept="image/*" onChange={e => e.target.files && setBeforeFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white" />
        </div>
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-neon-blue font-bold mb-2">✨ СНИМКА СЛЕД *</label>
          <input type="file" accept="image/*" onChange={e => e.target.files && setAfterFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white" />
        </div>
      </div>

      {/* Extra Images */}
      <div className="bg-slate-800 p-4 rounded border border-slate-600 mt-4">
        <label className="block text-sm text-white font-bold mb-2">ДОПЪЛНИТЕЛНИ СНИМКИ (Опция)</label>
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleExtraFilesChange}
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white mb-4"
        />
        
        {/* Preview List of selected extra files */}
        {extraFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {extraFiles.map((file, idx) => (
              <div key={idx} className="relative bg-slate-900 px-3 py-1 rounded border border-slate-700 flex items-center gap-2">
                <span className="text-xs text-gray-300 truncate max-w-[100px]">{file.name}</span>
                <button type="button" onClick={() => removeExtraFile(idx)} className="text-red-400 hover:text-white font-bold">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" disabled={uploading} className="w-full bg-neon-blue text-black font-bold py-4 rounded hover:bg-white transition-all disabled:opacity-50 mt-6 uppercase">
        {uploading ? 'КАЧВАНЕ...' : 'ПУБЛИКУВАЙ ПРОЕКТ'}
      </button>
    </form>
  );
};

export default ProjectUploadForm;