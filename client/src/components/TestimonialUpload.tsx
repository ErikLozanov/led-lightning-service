import { useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const TestimonialUpload = ({ onSuccess }: { onSuccess: () => void }) => {
  const [clientName, setClientName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return toast.success("Моля изберете снимка (скрийншот).");

    try {
      setUploading(true);
      
      // 1. Upload to Supabase Storage
      const fileName = `review-${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);

      // 2. Save to DB
      await api.post('/testimonials', {
        client_name: clientName, 
        review_image_url: publicUrl
      });

      toast.success("Отзивът е качен!");
      setClientName('');
      setFile(null);
      onSuccess();

    } catch (err) {
      console.error(err);
      toast.success("Грешка при качване.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Качи Отзив (Скрийншот)</h3>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Име на клиент (Опция)</label>
        <input 
          type="text" 
          value={clientName} 
          onChange={e => setClientName(e.target.value)} 
          className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-neon-blue font-bold mb-1">📸 Скрийншот от чат</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && setFile(e.target.files[0])}
          className="w-full text-sm text-gray-400"
        />
      </div>

      <button disabled={uploading} className="w-full bg-neon-blue text-black font-bold py-2 rounded hover:bg-white transition-all">
        {uploading ? 'Качване...' : 'Запиши'}
      </button>
    </form>
  );
};

export default TestimonialUpload;