import { MapPin, Phone, Facebook } from "lucide-react";

const ContactSection = () => {
    return (
        <footer
            id="contact"
            className="bg-black border-t border-slate-800 pt-20 pb-10 relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Column 1: Brand & Intro */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                        VPRIME <span className="text-[#00f3ff]">LIGHTS</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Професионално отношение към детайла. Ние връщаме блясъка
                        на вашия автомобил и гарантираме безопасността ви на
                        пътя.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=61585466737646"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all"
                        >
                            <Facebook size={20} />
                        </a>
                        {/* <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-neon-blue hover:text-black transition-all">
              <Instagram size={20} />
            </a> */}
                    </div>
                </div>

                {/* Column 2: Quick Contact */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-neon-blue/30 pb-2 inline-block">
                        КОНТАКТИ
                    </h3>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="tel:+359893383533"
                                className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                            >
                                <span className="bg-slate-800 p-2 rounded group-hover:bg-neon-blue group-hover:text-black transition-colors">
                                    <Phone size={18} />
                                </span>
                                +359 89 338 3533
                            </a>
                        </li>
                        {/* <li>
              <a href="mailto:info@ledlightning.bg" className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group">
                <span className="bg-slate-800 p-2 rounded group-hover:bg-neon-blue group-hover:text-black transition-colors">
                   <Mail size={18} />
                </span>
                info@ledlightning.bg
              </a>
            </li> */}
                        <li>
                            <a
                                href="viber://chat?number=%2B359888888888"
                                className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                            >
                                <span className="bg-slate-800 p-2 rounded group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm0 2.05c5.334 0 9.778 3.978 9.778 8.93 0 5.084-4.444 9.061-9.778 9.061-1.075 0-2.105-.164-3.07-.466l-2.03.116L5.807 20.3l.05-2.257c-2.115-1.638-3.525-4.148-3.525-6.932 0-4.952 4.314-8.93 9.668-8.93z" />
                                    </svg>
                                </span>
                                Чат във Viber
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Working Hours */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-neon-blue/30 pb-2 inline-block">
                        РАБОТНО ВРЕМЕ
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex justify-between">
                            <span>Понеделник - Петък:</span>
                            <span className="text-white font-bold">
                                09:00 - 18:00
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span>Събота:</span>
                            <span className="text-white font-bold">
                                10:00 - 14:00
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span>Неделя:</span>
                            <span className="text-red-400">Почивен ден</span>
                        </li>
                    </ul>
                    <div className="mt-6 flex items-start gap-3 text-gray-400 text-sm">
                        <MapPin size={20} className="text-neon-blue shrink-0" />
                        <p>
                            гр. Перник, Ладовица, <br />
                            ул. Ямбол, 2304
                        </p>
                    </div>
                </div>

                {/* Column 4: Map (Placeholder) */}
                <div className="bg-slate-800 rounded-xl overflow-hidden h-64 border border-slate-700 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d519.1500961021653!2d23.109270810135737!3d42.602911083734874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14aacdbc82db821f%3A0xe23600b5c6f22dd9!2sVPrime%20Lights!5e0!3m2!1sbg!2sbg!4v1766573353954!5m2!1sbg!2sbg"
                        width={600}
                        height={450}
                        style={{ border: "0" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div className="absolute inset-0 bg-neon-blue/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-gray-600 text-xs">
                <p>© 2025 VPrime Lights. Всички права запазени.</p>
            </div>
        </footer>
    );
};

export default ContactSection;
