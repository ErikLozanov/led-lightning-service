import { useState, type ChangeEvent } from 'react';

// Define what data this component NEEDS to work
interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleDrag = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full h-64 overflow-hidden group select-none bg-slate-900">
      {/* 1. The 'After' Image (Background) */}
      <img
        src={afterImage}
        alt="After result"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* 2. The 'Before' Image (Foreground) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-neon-blue"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before repair"
          className="absolute top-0 left-0 h-full max-w-none object-cover"
          style={{ width: `${100 * (100 / sliderPosition)}%` }} 
        />
      </div>

      {/* 3. Slider Handle */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleDrag}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />

      {/* 4. Visual Dragger */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-neon-blue pointer-events-none z-20 shadow-[0_0_15px_rgba(0,243,255,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3m0 0l3 3m-3-3h12m-12 0l3-3m0 0l3 3m-3-3h12" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;