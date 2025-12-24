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
  const [isAnimating, setIsAnimating] = useState(false); 

  useEffect(() => {
    const storageKey = `liked_gallery_${postId}`;
    if (localStorage.getItem(storageKey)) {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); 

    setLikes(prev => prev + 1);
    setHasLiked(true);
    localStorage.setItem(`liked_gallery_${postId}`, 'true'); 

    const { error } = await supabase.rpc('increment_gallery_likes', { row_id: postId });
    
    if (error) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(`liked_gallery_${postId}`);
      toast.error('Could not like post');
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = title ? `Check out: ${title}` : 'Check out this project!';
    const shareData = { title: 'Amazing Restoration', text: shareText, url: shareUrl };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!', {
        icon: '🔗',
        style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' },
      });
    }
  };

  return (
    <div className="mt-8 p-3 md:p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm flex flex-row items-stretch md:justify-between gap-3 md:gap-0 shadow-lg transition-all duration-300">
      
      <div className="flex-1 md:flex-none flex items-center gap-4">
        
        {/* Like Button */}
        <button 
          onClick={handleLike}
          disabled={hasLiked}
          className={`
            relative group w-full md:w-auto flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:py-2.5 rounded-xl transition-all duration-300 border
            ${hasLiked 
              ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
              : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5'
            }
          `}
        >
          <div className="relative flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 transition-transform duration-300 ${isAnimating ? 'scale-150' : 'scale-100'} ${hasLiked ? 'fill-current' : 'group-hover:scale-110'}`} 
              viewBox="0 0 20 20" 
              fill={hasLiked ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth={hasLiked ? 0 : 1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {isAnimating && (
               <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping"></span>
            )}
          </div>

          <span className={`font-bold text-lg ${hasLiked ? 'text-red-400' : 'text-slate-300 group-hover:text-white'}`}>
            {likes}
          </span>
        </button>
        
        <span className="hidden md:block text-slate-600 text-sm font-medium">
          {hasLiked ? 'Благодарим!' : 'Харесай проекта'}
        </span>
      </div>

      {/* --- SHARE BUTTON --- */}
      <button 
        onClick={handleShare}
        className="
          flex-1 md:flex-none justify-center md:w-auto
          group flex items-center gap-2 px-4 py-3 md:py-2.5 rounded-xl 
          bg-slate-900/50 border border-slate-700 text-slate-400
          hover:border-[#00f3ff]/50 hover:text-[#00f3ff] hover:bg-[#00f3ff]/5 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]
          transition-all duration-300
        "
      >
        <span className="text-sm font-bold tracking-wide group-hover:text-white transition-colors">СПОДЕЛИ</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

    </div>
  );
};