import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import { compressImage } from '../utils/compress'; // <--- Import
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
    const compressedFile = await compressImage(file);
    
    const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`; 
    
    const { error } = await supabase.storage.from('images').upload(fileName, compressedFile);
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleExtraFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExtraFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeExtraFile = (index: number) => {
    setExtraFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile || !carModel) {
      toast.error("Моля попълнете всички полета!");
      return;
    }

    try {
      setUploading(true);
      toast.loading("Обработване и компресиране...", { id: 'upload' });

      const beforeUrl = await uploadImage(beforeFile);
      const afterUrl = await uploadImage(afterFile);

      const extraImageUrls = await Promise.all(
        extraFiles.map(file => uploadImage(file))
      );

      await api.post('/gallery', {
        car_model: carModel,
        description,
        production_year: productionYear,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        extra_images: extraImageUrls
      });

      toast.success("Проектът е качен успешно!", { id: 'upload' });
      
      setCarModel('');
      setDescription('');
      setProductionYear('');
      setBeforeFile(null);
      setAfterFile(null);
      setExtraFiles([]);
      onSuccess();

    } catch (error) {
      console.error(error);
      toast.error("Грешка при качване.", { id: 'upload' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-lg space-y-4 text-left border border-slate-700">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Модел *</label>
               <input type="text" value={carModel} onChange={e => setCarModel(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" placeholder="Audi A6 C7"/>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Година (Опция)</label>
               <input type="text" value={productionYear} onChange={e => setProductionYear(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" placeholder="2015"/>
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Описание *</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" rows={3}/>
        </div>

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

        <div className="bg-slate-800 p-4 rounded border border-slate-600 mt-4">
            <label className="block text-sm text-white font-bold mb-2">ДОПЪЛНИТЕЛНИ СНИМКИ (Опция)</label>
            <input type="file" multiple accept="image/*" onChange={handleExtraFilesChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white mb-4"/>
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

        <button type="submit" disabled={uploading} className="w-full bg-[#00f3ff] text-black font-bold py-4 rounded hover:bg-white transition-all disabled:opacity-50 mt-6 uppercase">
            {uploading ? 'ОБРАБОТВАНЕ И КАЧВАНЕ...' : 'ПУБЛИКУВАЙ ПРОЕКТ'}
        </button>
    </form>
  );
};

export default ProjectUploadForm;