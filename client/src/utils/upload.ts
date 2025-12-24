import { supabase } from '../context/AuthContext';
import { compressImage } from './compress';
import { addWatermark } from './watermark';

export const processAndUpload = async (file: File, bucket: string = 'images'): Promise<string> => {
  try {
    const watermarkedFile = await addWatermark(file);

    const compressedFile = await compressImage(watermarkedFile);

    const cleanName = file.name.replace(/[^\w.-]/g, '_');
    const fileName = `${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, compressedFile);
    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
    
  } catch (error) {
    console.error("Upload pipeline failed:", error);
    throw error;
  }
};