export const addWatermark = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.floor(img.width * 0.04); 
      ctx.font = `900 ${fontSize}px "Inter", sans-serif`; 
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      
      const text = "VPRIME LIGHTS";
      const padding = Math.floor(img.width * 0.03); 

      const x = canvas.width - padding;
      const y = canvas.height - padding;

      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.globalAlpha = 0.5; 
      ctx.fillStyle = "white";
      ctx.fillText(text, x, y);

      ctx.globalAlpha = 1.0;

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Watermark creation failed'));
          return;
        }
        const watermarkedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        resolve(watermarkedFile);
      }, file.type, 0.95); 
    };

    img.onerror = (err) => reject(err);
  });
};