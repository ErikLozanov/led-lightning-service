import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import type { Project } from '../types';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Trash2, Upload } from 'lucide-react';

interface ProjectEditFormProps {
  project: Project; 
  onSuccess: () => void;
  onCancel: () => void;
}

// Unified item type to handle both existing URLs and new Files
interface GalleryItem {
  id: string;      
  type: 'existing' | 'new';
  url?: string;    
  file?: File;     
  preview: string; 
}

const ProjectEditForm = ({ project, onSuccess, onCancel }: ProjectEditFormProps) => {
  const [carModel, setCarModel] = useState(project.car_model);
  const [description, setDescription] = useState(project.description);
  const [productionYear, setProductionYear] = useState(project.production_year || '');
  
  // Initialize state with existing images from the project
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    return (project.extra_images || []).map((url, idx) => ({
      id: `existing-${idx}`,
      type: 'existing',
      url: url,
      preview: url
    }));
  });
  
  const [newBeforeFile, setNewBeforeFile] = useState<File | null>(null);
  const [newAfterFile, setNewAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_').replace(/[^\w.-]/g, '')}`;
    const { error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
  };

  // --- GALLERY LOGIC ---

  const handleNewExtraFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newItems = Array.from(e.target.files).map((file, idx) => ({
        id: `new-${Date.now()}-${idx}`,
        type: 'new' as const,
        file: file,
        preview: URL.createObjectURL(file)
      }));
      setGalleryItems(prev => [...prev, ...newItems]);
      e.target.value = ''; 
    }
  };

  const removeGalleryItem = (index: number) => {
    setGalleryItems(prev => prev.filter((_, i) => i !== index));
  };

  const moveGalleryItem = (index: number, direction: 'left' | 'right') => {
    setGalleryItems(prev => {
      const newArr = [...prev];
      if (direction === 'left' && index > 0) {
        [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
      } else if (direction === 'right' && index < newArr.length - 1) {
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      }
      return newArr;
    });
  };

  // --- SUBMIT ---

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let beforeUrl = project.before_image_url;
      let afterUrl = project.after_image_url;

      // 1. Upload new Main Images if selected
      if (newBeforeFile) beforeUrl = await uploadImage(newBeforeFile);
      if (newAfterFile) afterUrl = await uploadImage(newAfterFile);

      // 2. Process Gallery Items in their CURRENT visual order
      const finalExtraImages = await Promise.all(
        galleryItems.map(async (item) => {
          if (item.type === 'existing' && item.url) {
            return item.url; 
          } else if (item.type === 'new' && item.file) {
            return await uploadImage(item.file); 
          }
          return '';
        })
      );

      // Filter out any failed/empty entries
      const cleanExtraImages = finalExtraImages.filter(url => url !== '');

      // 3. Update Database
      await api.put(`/gallery/${project.id}`, {
        car_model: carModel,
        description,
        production_year: productionYear,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        extra_images: cleanExtraImages
      });

      toast.success("Промените са запазени!");
      onSuccess();

    } catch (error) {
      console.error(error);
      toast.error("Грешка при обновяване.");
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
          <input type="text" value={carModel} onChange={e => setCarModel(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-1">ГОДИНА</label>
          <input type="text" value={productionYear} onChange={e => setProductionYear(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-400 mb-1">ОПИСАНИЕ</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-[#00f3ff] outline-none" rows={3} />
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

      {/* Unified Gallery Manager */}
      <div className="bg-slate-800 p-4 rounded border border-slate-600 mt-4">
        <label className="block text-sm text-white font-bold mb-4">УПРАВЛЕНИЕ НА ГАЛЕРИЯ</label>
        
        {/* Add New Ones */}
        <div className="relative mb-4">
             <input type="file" multiple accept="image/*" onChange={handleNewExtraFilesChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
             <div className="w-full bg-slate-900 border-2 border-dashed border-slate-700 rounded-lg p-4 text-center text-gray-400 flex flex-col items-center gap-2 hover:border-[#00f3ff] hover:text-[#00f3ff] transition-all">
                <Upload size={24} />
                <span className="text-xs font-bold uppercase">Добави още снимки</span>
             </div>
        </div>
        
        {/* Render Mixed List */}
        {galleryItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item, idx) => (
              <div key={item.id} className="relative group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <div className="aspect-square w-full">
                    <img src={item.preview} alt="Gallery item" className="w-full h-full object-cover" />
                </div>
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {/* Move Left */}
                    <button 
                        type="button" 
                        onClick={() => moveGalleryItem(idx, 'left')} 
                        disabled={idx === 0}
                        className="p-1 bg-slate-700 text-white rounded hover:bg-[#00f3ff] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    {/* Move Right */}
                    <button 
                        type="button" 
                        onClick={() => moveGalleryItem(idx, 'right')} 
                        disabled={idx === galleryItems.length - 1}
                        className="p-1 bg-slate-700 text-white rounded hover:bg-[#00f3ff] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ArrowRight size={18} />
                    </button>
                    
                    {/* Delete */}
                    <button 
                        type="button" 
                        onClick={() => removeGalleryItem(idx)} 
                        className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
                 
                 {/* Order Badge */}
                 <div className="absolute top-1 left-1 bg-black/70 text-[#00f3ff] text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                    #{idx + 1}
                 </div>
              </div>
            ))}
          </div>
        )}
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