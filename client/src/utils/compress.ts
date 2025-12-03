import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.3,          
    maxWidthOrHeight: 1920,  
    useWebWorker: true,      
    fileType: "image/webp"   
  };

  try {
    console.log(`Original size: ${file.size / 1024 / 1024} MB`);
    const compressedFile = await imageCompression(file, options);
    console.log(`Compressed size: ${compressedFile.size / 1024 / 1024} MB`);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed:", error);
    return file; 
  }
};