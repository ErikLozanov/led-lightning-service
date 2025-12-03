import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import type { Project } from '../types';
import toast from 'react-hot-toast';

interface ProjectEditFormProps {
  project: Project; 
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectEditForm = ({ project, onSuccess, onCancel }: ProjectEditFormProps) => {
  const [carModel, setCarModel] = useState(project.car_model);
  const [description, setDescription] = useState(project.description);
  const [productionYear, setProductionYear] = useState(project.production_year || '');
  
  const [existingExtraImages, setExistingExtraImages] = useState<string[]>(project.extra_images || []);
  
  const [newBeforeFile, setNewBeforeFile] = useState<File | null>(null);
  const [newAfterFile, setNewAfterFile] = useState<File | null>(null);
  const [newExtraFiles, setNewExtraFiles] = useState<File[]>([]);
  
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleRemoveExistingExtra = (urlToRemove: string) => {
    setExistingExtraImages(prev => prev.filter(url => url !== urlToRemove));
  };

  const handleNewExtraFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewExtraFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let beforeUrl = project.before_image_url;
      let afterUrl = project.after_image_url;

      if (newBeforeFile) beforeUrl = await uploadImage(newBeforeFile);
      if (newAfterFile) afterUrl = await uploadImage(newAfterFile);

      const newExtraUrls = await Promise.all(
        newExtraFiles.map(file => uploadImage(file))
      );

      const finalExtraImages = [...existingExtraImages, ...newExtraUrls];

      await api.put(`/gallery/${project.id}`, {
        car_model: carModel,
        description,
        production_year: productionYear,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        extra_images: finalExtraImages
      });

      toast.success("Промените са запазени!");
      onSuccess();

    } catch (error) {
      console.error(error);
      toast.success("Грешка при обновяване.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-lg space-y-4 text-left border border-slate-700">
      <h3 className="text-xl font-bold text-neon-blue mb-4">Редактиране на проект</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-1">МОДЕЛ</label>
          <input type="text" value={carModel} onChange={e => setCarModel(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-1">ГОДИНА</label>
          <input type="text" value={productionYear} onChange={e => setProductionYear(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-1">ОПИСАНИЕ</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white" rows={3} />
      </div>

      {/* Main Images Edit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-red-400 font-bold mb-2">СМЯНА "ПРЕДИ" (Опция)</label>
          <input type="file" accept="image/*" onChange={e => e.target.files && setNewBeforeFile(e.target.files[0])} className="w-full text-sm text-gray-400" />
        </div>
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-neon-blue font-bold mb-2">СМЯНА "СЛЕД" (Опция)</label>
          <input type="file" accept="image/*" onChange={e => e.target.files && setNewAfterFile(e.target.files[0])} className="w-full text-sm text-gray-400" />
        </div>
      </div>

      {/* Extra Images Management */}
      <div className="bg-slate-800 p-4 rounded border border-slate-600 mt-4">
        <label className="block text-sm text-white font-bold mb-2">УПРАВЛЕНИЕ НА ГАЛЕРИЯ</label>
        
        {/* Existing Images */}
        {existingExtraImages.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {existingExtraImages.map((url, idx) => (
              <div key={idx} className="relative group w-20 h-20">
                <img src={url} alt="Extra" className="w-full h-full object-cover rounded border border-slate-600" />
                <button type="button" onClick={() => handleRemoveExistingExtra(url)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 shadow-md">✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Ones */}
        <label className="block text-xs text-gray-400 mb-1">Добави нови снимки:</label>
        <input type="file" multiple accept="image/*" onChange={handleNewExtraFilesChange} className="w-full text-sm text-gray-400" />
      </div>

      <div className="flex gap-4 mt-6">
        <button type="button" onClick={onCancel} className="flex-1 bg-slate-700 text-white font-bold py-3 rounded hover:bg-slate-600 transition-all">ОТКАЗ</button>
        <button type="submit" disabled={uploading} className="flex-1 bg-neon-blue text-black font-bold py-3 rounded hover:bg-white transition-all disabled:opacity-50">
          {uploading ? 'ЗАПАЗВАНЕ...' : 'ЗАПАЗИ ПРОМЕНИТЕ'}
        </button>
      </div>
    </form>
  );
};

export default ProjectEditForm;