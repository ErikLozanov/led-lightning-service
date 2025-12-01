import { Wrench, ShieldCheck, Sparkles, Lightbulb, Repeat, Eye } from 'lucide-react';

const services = [
  {
    title: "Цялостно Рециклиране",
    description: "Пълно разглобяване, почистване на рефлектори, смяна на лупи и настройки за перфектен лъч.",
    icon: <Wrench className="w-10 h-10 text-neon-blue" />,
    price: "от 150 лв."
  },
  {
    title: "Пастиране и Полиране",
    description: "Премахване на жълтите отлагания и драскотини за кристална прозрачност.",
    icon: <Sparkles className="w-10 h-10 text-neon-blue" />,
    price: "от 40 лв."
  },
  {
    title: "UV Защитно Фолио",
    description: "Висококачествено PPF фолио, което предпазва фаровете от камъчета и повторно пожълтяване.",
    icon: <ShieldCheck className="w-10 h-10 text-neon-blue" />,
    price: "от 60 лв."
  },
  {
    title: "Смяна на Стъкла",
    description: "Подмяна на напукани или силно увредени стъкла с чисто нови поликарбонатни капаци.",
    icon: <Repeat className="w-10 h-10 text-neon-blue" />,
    price: "от 80 лв."
  },
  {
    title: "LED Тунинг",
    description: "Инсталиране на 'Angel Eyes', 'Devil Eyes' или динамични мигачи за модерна визия.",
    icon: <Lightbulb className="w-10 h-10 text-neon-blue" />,
    price: "По договаряне"
  },
  {
    title: "Регулиране на Фарове",
    description: "Прецизно машинно регулиране за максимална видимост и безопасност на пътя.",
    icon: <Eye className="w-10 h-10 text-neon-blue" />,
    price: "20 лв."
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
            НАШИТЕ <span className="text-neon-blue">УСЛУГИ</span>
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto shadow-[0_0_15px_#00f3ff]"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Предлагаме пълна гама от професионални услуги за възстановяване и подобряване на автомобилните светлини.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,243,255,0.1)]"
            >
              {/* Icon Container */}
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-neon-blue shadow-lg">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Price Tag */}
              <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-mono text-neon-blue border border-neon-blue/30 px-3 py-1 rounded bg-neon-blue/10">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;