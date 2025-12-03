import { Wrench, ShieldCheck, Sparkles, Lightbulb, Repeat, Eye, Sun, Zap, Droplets, Unlock, Hammer, PenTool, PlusCircle, ShoppingCart } from 'lucide-react';

const services = [
  {
    title: "Рециклиране на фарове",
    description: "Пълно възстановяване на функционалността и фабричния вид на вашите фарове.",
    icon: <Wrench className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Възстановяване на рефлектори",
    description: "Нанасяне на ново огледално покритие върху изгорели рефлектори за максимална осветеност.",
    icon: <Sun className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Вграждане на Bi-Led системи",
    description: "Модернизиране на осветлението чрез имплантиране на мощни Bi-LED лупи.",
    icon: <Lightbulb className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Ремонт на дневни светлини",
    description: "Отстраняване на дефекти, мигане или пълно изгасване на фабричните DRL модули.",
    icon: <Zap className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Отстраняване на влага/вода",
    description: "Професионално подсушаване и херметизиране за спиране на конденза завинаги.",
    icon: <Droplets className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Отваряне без следи",
    description: "Разлепяне на фаровете по щадяща технология, запазваща корпуса и канта непокътнати.",
    icon: <Unlock className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Възстановяване на инсталация",
    description: "Ремонт на изгорели кабели и букси вътре във фара за безопасно функциониране.",
    icon: <Wrench className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Лепене на счупени корпуси",
    description: "Здраво и надеждно възстановяване на пукнатини и липсващи парчета от пластмасата.",
    icon: <Hammer className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Подмяна на лепило и стъкла",
    description: "Смяна на старите напукани стъкла с нови и полагане на нов термо-устойчив силикон.",
    icon: <Repeat className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Почистване и полиране",
    description: "Двустранно почистване и пастиране за премахване на мъглата и драскотините.",
    icon: <Sparkles className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Защитно фолио (PPF)",
    description: "Монтаж на висок клас фолио за защита от камъчета, UV лъчи и повторно пожълтяване.",
    icon: <ShieldCheck className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Индивидуални проекти",
    description: "Изработка на къстъм визия - боядисване на декорации, devil eyes и други.",
    icon: <PenTool className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Добавяне на дневни светлини",
    description: "Интегриране на допълнителни LED ленти или модули за по-модерна визия.",
    icon: <PlusCircle className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Регулиране на фарове",
    description: "Прецизна настройка на светлинния поток с професионален лазерен стенд.",
    icon: <Eye className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Продажба на LED крушки",
    description: "Висококачествени LED системи с гаранция, осигуряващи перфектна видимост.",
    icon: <ShoppingCart className="w-10 h-10 text-[#00f3ff]" />,
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div data-aos="fade-up" className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
            НАШИТЕ <span className="text-[#00f3ff]">УСЛУГИ</span>
          </h2>
          <div className="h-1 w-24 bg-[#00f3ff] mx-auto shadow-[0_0_15px_#00f3ff]"></div>
          
          {/* FIX: Добавено mb-16 (повече разстояние) */}
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg text-center mb-16">
            Предлагаме пълна гама от професионални услуги за възстановяване и подобряване на автомобилните светлини.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={index * 100} 
              /* FIX: Променено duration-300 на duration-700 и добавено ease-out за плавност */
              className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl transition-all duration-700 ease-out hover:border-[#00f3ff]/50 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,243,255,0.1)] h-full"
            >
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700 border border-slate-700 group-hover:border-[#00f3ff] shadow-lg">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f3ff] transition-colors duration-500">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;