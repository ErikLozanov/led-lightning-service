import { useState, useEffect } from 'react';
import { supabase } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

interface GalleryActionsProps {
  postId: string;     
  initialLikes: number;
  title?: string;       
}

export const GalleryActions = ({ postId, initialLikes, title }: GalleryActionsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const storageKey = `liked_gallery_${postId}`;
    if (localStorage.getItem(storageKey)) {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked) return; 

    setLikes(prev => prev + 1);
    setHasLiked(true);
    localStorage.setItem(`liked_gallery_${postId}`, 'true'); 

    const { error } = await supabase.rpc('increment_gallery_likes', { row_id: postId });
    
    if (error) {
      console.error('Error liking:', error);
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(`liked_gallery_${postId}`);
      toast.error('Възникна грешка. Моля опитайте отново.');
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href; 
    const shareText = title ? `Вижте това: ${title}` : 'Вижте този проект от Портфолиото!';

    const shareData = {
      title: 'Страхотен проект',
      text: shareText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Линкът е копиран!');
    }
  };

//   return (
//     <div className="flex items-center gap-5 mt-3 pt-2 border-t border-gray-100">
      
//       <button 
//         onClick={handleLike}
//         disabled={hasLiked}
//         className={`flex items-center gap-1.5 transition-all duration-200 ${
//           hasLiked 
//             ? 'text-red-500 scale-105' 
//             : 'text-gray-500 hover:text-red-500 hover:scale-105'
//         }`}
//         aria-label="Харесай"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor">
//           {hasLiked ? (
//             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//           ) : (
//              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//           )}
//         </svg>
//         <span className="text-sm font-semibold">{likes}</span>
//       </button>

//       <button 
//         onClick={handleShare}
//         className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
//         aria-label="Сподели"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//         </svg>
//         <span className="text-sm font-medium">Сподели</span>
//       </button>

//     </div>
//   );

return (
  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700/50">
    
    {/* Like Button */}
    <button 
      onClick={handleLike}
      disabled={hasLiked}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        hasLiked 
          ? 'bg-red-500/10 text-red-500 ring-1 ring-red-500/50' 
          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 transition-transform duration-300 ${hasLiked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} 
        viewBox="0 0 20 20" 
        fill={hasLiked ? "currentColor" : "none"} 
        stroke="currentColor"
        strokeWidth={hasLiked ? 0 : 2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="font-bold">{likes}</span>
    </button>

    {/* Share Button */}
    <button 
      onClick={handleShare}
      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-[#00f3ff]/10 text-slate-300 hover:text-[#00f3ff] transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span className="font-medium text-sm">Сподели</span>
    </button>

  </div>
);
};