import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import { compressImage } from '../utils/compress';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { addWatermark } from '../utils/watermark';

interface ProjectUploadFormProps {
  onSuccess: () => void;
}

interface ExtraImageItem {
  file: File;
  preview: string;
}

const ProjectUploadForm = ({ onSuccess }: ProjectUploadFormProps) => {
  const [carModel, setCarModel] = useState('');
  const [description, setDescription] = useState('');
  const [productionYear, setProductionYear] = useState('');
  
  // Main images state
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  
  // Extra images state 
  const [extraImages, setExtraImages] = useState<ExtraImageItem[]>([]);
  
  const [uploading, setUploading] = useState(false);

const uploadImage = async (file: File) => {
    // 1. Add Watermark FIRST
    const watermarkedFile = await addWatermark(file);
    
    // 2. Then Compress
    const compressedFile = await compressImage(watermarkedFile);
    
    // 3. Then Upload
    const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`; 
    const { error } = await supabase.storage.from('images').upload(fileName, compressedFile);
    
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicUrl;
  };
  // --- GALLERY LOGIC (Reordering & Previews) ---

  const handleExtraFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newItems = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setExtraImages(prev => [...prev, ...newItems]);
      e.target.value = '';
    }
  };

  const removeExtraImage = (index: number) => {
    setExtraImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveExtraImage = (index: number, direction: 'left' | 'right') => {
    setExtraImages(prev => {
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
    if (!beforeFile || !afterFile || !carModel) {
      toast.error("Моля попълнете всички полета!");
      return;
    }

    try {
      setUploading(true);
      toast.loading("Обработване и компресиране...", { id: 'upload' });

      // 1. Upload Main Images
      const beforeUrl = await uploadImage(beforeFile);
      const afterUrl = await uploadImage(afterFile);

      // 2. Upload Extra Images (In the specific order defined by user)
      const extraImageUrls = await Promise.all(
        extraImages.map(item => uploadImage(item.file))
      );

      // 3. Save to DB
      await api.post('/gallery', {
        car_model: carModel,
        description,
        production_year: productionYear,
        before_image_url: beforeUrl,
        after_image_url: afterUrl,
        extra_images: extraImageUrls
      });

      toast.success("Проектът е качен успешно!", { id: 'upload' });
      
      // Reset Form
      setCarModel('');
      setDescription('');
      setProductionYear('');
      setBeforeFile(null);
      setAfterFile(null);
      setExtraImages([]);
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
            {/* BEFORE IMAGE */}
            <div className="bg-slate-800 p-4 rounded border border-slate-600">
                <label className="block text-sm text-red-400 font-bold mb-2">📸 СНИМКА ПРЕДИ *</label>
                {beforeFile && (
                  <div className="mb-3 relative h-32 w-full bg-black rounded overflow-hidden">
                      <img src={URL.createObjectURL(beforeFile)} className="w-full h-full object-contain" />
                      <button type="button" onClick={() => setBeforeFile(null)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => e.target.files && setBeforeFile(e.target.files[0])} 
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white" 
                />
            </div>

            {/* AFTER IMAGE */}
            <div className="bg-slate-800 p-4 rounded border border-slate-600">
                <label className="block text-sm text-neon-blue font-bold mb-2">✨ СНИМКА СЛЕД *</label>
                {afterFile && (
                  <div className="mb-3 relative h-32 w-full bg-black rounded overflow-hidden">
                      <img src={URL.createObjectURL(afterFile)} className="w-full h-full object-contain" />
                      <button type="button" onClick={() => setAfterFile(null)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => e.target.files && setAfterFile(e.target.files[0])} 
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white" 
                />
            </div>
        </div>

        {/* --- GALLERY MANAGER (REORDERABLE) --- */}
        <div className="bg-slate-800 p-4 rounded border border-slate-600 mt-4">
            <label className="block text-sm text-white font-bold mb-4">ДОПЪЛНИТЕЛНИ СНИМКИ (Опция)</label>
            
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleExtraFilesChange} 
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-slate-700 file:text-white mb-4"
            />
            
            {extraImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {extraImages.map((item, idx) => (
                  <div key={idx} className="relative group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                      <div className="aspect-square w-full">
                         <img src={item.preview} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         {/* Move Left */}
                         <button 
                           type="button" 
                           onClick={() => moveExtraImage(idx, 'left')} 
                           disabled={idx === 0}
                           className="p-1 bg-slate-700 text-white rounded hover:bg-[#00f3ff] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ArrowLeft size={18} />
                         </button>

                         {/* Move Right */}
                         <button 
                           type="button" 
                           onClick={() => moveExtraImage(idx, 'right')} 
                           disabled={idx === extraImages.length - 1}
                           className="p-1 bg-slate-700 text-white rounded hover:bg-[#00f3ff] hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ArrowRight size={18} />
                         </button>
                         
                         {/* Delete */}
                         <button 
                           type="button" 
                           onClick={() => removeExtraImage(idx)} 
                           className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500"
                         >
                           <Trash2 size={18} />
                         </button>
                      </div>
                      
                      {/* Order Badge */}
                      <div className="absolute top-1 left-1 bg-black/70 text-[#00f3ff] text-xs font-bold px-2 py-0.5 rounded">
                         #{idx + 1}
                      </div>
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