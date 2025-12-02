import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const COOKIE_KEY = 'vprime_cookies_accepted';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage. If not found, show the banner.
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent !== 'true') {
      // Use a slight delay to ensure it doesn't flicker during the initial render
      setTimeout(() => setIsVisible(true), 1500); 
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // For simplicity, we treat "Decline" as "Dismiss, but ask again later"
    // In a real app, declining would disable analytics/tracking scripts.
    setIsVisible(false); 
    // You could set a timestamp here to show it again in 30 days
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] p-4">
      <div 
        data-aos="fade-up" // Animate in using our new AOS library
        className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0"
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">🍪</span>
          <p className="text-sm text-gray-300">
            Използваме "бисквитки" за да анализираме трафика и да подобрим вашето преживяване. Продължавайки, вие се съгласявате с това.
          </p>
        </div>

        <div className="flex flex-shrink-0 space-x-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-[#00f3ff] text-black font-bold py-2 px-4 rounded hover:bg-white transition-colors text-sm"
          >
            <Check size={20} />
            Приемам
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none flex items-center justify-center gap-1 border border-slate-700 text-gray-400 hover:text-white py-2 px-4 rounded transition-colors text-sm"
          >
            <X size={20} />
            Отказвам
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;