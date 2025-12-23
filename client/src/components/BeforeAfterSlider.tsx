import { useState, type ChangeEvent } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  isInteractive?: boolean; 
}

const BeforeAfterSlider = ({ beforeImage, afterImage, isInteractive = true }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [hasInteracted, setHasInteracted] = useState(false); 

  const handleDrag = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
    if (!hasInteracted) setHasInteracted(true); 
  };

  return (
    <div className="relative w-full aspect-[4/3] h-auto overflow-hidden group select-none bg-slate-900 rounded-xl">
      
      {/* 1. The 'After' Image (Background) */}
      <img
        src={afterImage}
        alt="After result"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* 2. The 'Before' Image (Foreground) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-[#00f3ff]"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before repair"
          className="absolute top-0 left-0 h-full max-w-none object-cover"
          style={{ width: `${100 * (100 / sliderPosition)}%` }} 
        />
      </div>

      {/* INTERACTIVE ELEMENTS */}
      {isInteractive && (
        <>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleDrag}
            onMouseDown={() => setHasInteracted(true)}
            onTouchStart={() => setHasInteracted(true)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-30" 
          />

          <div
            className="absolute top-0 bottom-0 w-1 bg-[#00f3ff] pointer-events-none z-20 shadow-[0_0_20px_rgba(0,243,255,0.6)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                
                {!hasInteracted && (
                   <div className="absolute w-14 h-14 bg-[#00f3ff]/40 rounded-full animate-ping"></div>
                )}
                
                <div className="relative w-10 h-10 bg-[#00f3ff] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-white">
                   <svg 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="20" 
                     height="20" 
                     viewBox="0 0 24 24" 
                     fill="none" 
                     stroke="black" 
                     strokeWidth="3" 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                   >
                     <path d="m9 18-6-6 6-6"/>
                     <path d="m15 6 6 6-6 6"/>
                   </svg>
                </div>
            </div>
          </div>
        </>
      )}
      
      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded border border-white/10 pointer-events-none z-10">
        ПРЕДИ
      </div>
      <div className="absolute bottom-3 right-3 bg-[#00f3ff]/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded pointer-events-none z-10">
        СЛЕД
      </div>

    </div>
  );
};

export default BeforeAfterSlider;