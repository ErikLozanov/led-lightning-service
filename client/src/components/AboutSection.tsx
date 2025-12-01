import { Award, Users, Wrench } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Text Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
               <div className="h-1 w-12 bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]"></div>
               <span className="text-[#00f3ff] font-bold tracking-widest uppercase">За Нас</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ние връщаме <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                светлината на пътя ви.
              </span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                В <strong className="text-white">LED Lightning Service</strong> не просто полираме фарове – ние възстановяваме сигурността. Разбираме, че кристално ясните светлини не са само естетика, а жизненоважен елемент за вашето безопасно шофиране през нощта.
              </p>
              <p>
                Използваме само най-висок клас полимери, UV-защитни фолиа и професионална техника за рециклиране, за да гарантираме резултат, който трае с години, а не месеци.
              </p>
            </div>

            {/* Checkmarks / Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Професионална техника", "2 Години Гаранция", "Висококачествени материали", "Експресно обслужване"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-[#00f3ff] text-xl">✓</span>
                        <span className="text-white font-medium">{item}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* RIGHT: Visuals (Image Grid) */}
          <div className="relative">
             {/* Main Image */}
             <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop" 
                  alt="Workshop" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
             </div>
             
             {/* Floating Badge (Experience) */}
             <div className="absolute -bottom-10 -left-10 z-20 bg-black/80 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] hidden md:block">
                <div className="flex items-center gap-4">
                    <div className="bg-[#00f3ff] text-black p-3 rounded-full">
                        <Award size={32} />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">5+</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Години Опит</p>
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* BOTTOM: Glass Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:border-[#00f3ff]/50 transition-colors group text-center">
                <Wrench className="w-10 h-10 text-gray-500 group-hover:text-[#00f3ff] mx-auto mb-4 transition-colors" />
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">1200+</h3>
                <p className="text-gray-400">Реставрирани Фара</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:border-[#00f3ff]/50 transition-colors group text-center">
                <Users className="w-10 h-10 text-gray-500 group-hover:text-[#00f3ff] mx-auto mb-4 transition-colors" />
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">850+</h3>
                <p className="text-gray-400">Доволни Клиенти</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-xl hover:border-[#00f3ff]/50 transition-colors group text-center">
                <Award className="w-10 h-10 text-gray-500 group-hover:text-[#00f3ff] mx-auto mb-4 transition-colors" />
                <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">100%</h3>
                <p className="text-gray-400">Гаранция за Качество</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;