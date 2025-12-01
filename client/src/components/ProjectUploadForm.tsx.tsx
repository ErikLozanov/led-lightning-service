import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext'; // We reuse the connection from Auth
import api from '../api/axios'; // We use our configured Axios

interface ProjectUploadFormProps {
  onSuccess: () => void;
}

const ProjectUploadForm = ({ onSuccess }: ProjectUploadFormProps) => {
  const [carModel, setCarModel] = useState('');
  const [description, setDescription] = useState('');
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Helper function to upload one image to Supabase Storage
  const uploadImage = async (file: File) => {
    // 1. Create a unique file name (timestamp + original name) to avoid conflicts
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    
    // 2. Upload to the 'images' bucket
    const { data, error } = await supabase.storage
      .from('images') 
      .upload(fileName, file);

    if (error) throw error;

    // 3. Get the public URL so we can save it in the database
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!beforeFile || !afterFile || !carModel) {
      alert("Моля попълнете всички полета и изберете снимки.");
      return;
    }

    try {
      setUploading(true);

      // Step 1: Upload images to Cloud (Supabase Storage)
      const beforeUrl = await uploadImage(beforeFile);
      const afterUrl = await uploadImage(afterFile);

      // Step 2: Send text data + image URLs to our Backend
      await api.post('/gallery', {
        car_model: carModel,
        description,
        before_image_url: beforeUrl,
        after_image_url: afterUrl
      });

      alert("Проектът е добавен успешно!");
      
      // Cleanup form
      setCarModel('');
      setDescription('');
      setBeforeFile(null);
      setAfterFile(null);
      
      // Notify parent (Dashboard) to refresh the list
      onSuccess();

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Грешка при качване. Проверете конзолата.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-lg space-y-4 text-left border border-slate-700">
      
      {/* Car Model Input */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Модел Автомобил</label>
        <input 
          type="text" 
          value={carModel}
          onChange={e => setCarModel(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-neon-blue outline-none transition-colors"
          placeholder="Напр: Audi A6 C7"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-bold text-gray-400 mb-1 uppercase">Описание</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-neon-blue outline-none transition-colors"
          placeholder="Напр: Пълно рециклиране, нови лупи и UV фолио..."
          rows={3}
        />
      </div>

      {/* Image Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Before Image */}
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-red-400 font-bold mb-2">📸 СНИМКА ПРЕДИ</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) setBeforeFile(e.target.files[0]);
            }}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-500/20 file:text-red-400 hover:file:bg-red-500/30 cursor-pointer"
          />
        </div>

        {/* After Image */}
        <div className="bg-slate-800 p-4 rounded border border-slate-600">
          <label className="block text-sm text-neon-blue font-bold mb-2">✨ СНИМКА СЛЕД</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) setAfterFile(e.target.files[0]);
            }}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-neon-blue/20 file:text-neon-blue hover:file:bg-neon-blue/30 cursor-pointer"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={uploading}
        className="w-full bg-neon-blue text-black font-bold py-4 rounded hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase tracking-wider"
      >
        {uploading ? 'КАЧВАНЕ...' : 'ПУБЛИКУВАЙ ПРОЕКТ'}
      </button>
    </form>
  );
};

export default ProjectUploadForm;