import { Wrench, ShieldCheck, Sparkles, Lightbulb, Repeat, Eye } from 'lucide-react';

const services = [
  {
    title: "Цялостно Рециклиране",
    description: "Пълно разглобяване, почистване на рефлектори, смяна на лупи и настройки за перфектен лъч.",
    icon: <Wrench className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Пастиране и Полиране",
    description: "Премахване на жълтите отлагания и драскотини за кристална прозрачност.",
    icon: <Sparkles className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "UV Защитно Фолио",
    description: "Висококачествено PPF фолио, което предпазва фаровете от камъчета и повторно пожълтяване.",
    icon: <ShieldCheck className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Смяна на Стъкла",
    description: "Подмяна на напукани или силно увредени стъкла с чисто нови поликарбонатни капаци.",
    icon: <Repeat className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "LED Тунинг",
    description: "Инсталиране на 'Angel Eyes', 'Devil Eyes' или динамични мигачи за модерна визия.",
    icon: <Lightbulb className="w-10 h-10 text-[#00f3ff]" />,
  },
  {
    title: "Регулиране на Фарове",
    description: "Прецизно машинно регулиране за максимална видимост и безопасност на пътя.",
    icon: <Eye className="w-10 h-10 text-[#00f3ff]" />,
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
            НАШИТЕ <span className="text-[#00f3ff]">УСЛУГИ</span>
          </h2>
          <div className="h-1 w-24 bg-[#00f3ff] mx-auto shadow-[0_0_15px_#00f3ff]"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Предлагаме пълна гама от професионални услуги за възстановяване и подобряване на автомобилните светлини.
          </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-[#00f3ff]/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,243,255,0.1)] h-full">
                  <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-[#00f3ff] shadow-lg">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f3ff] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  </div>
                </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;