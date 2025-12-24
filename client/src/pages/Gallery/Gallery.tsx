import { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import ProjectCard from '../../components/ProjectCard';
import { SEO } from '../../components/SEO';
import ContactSection from '../../components/ContactSection';
import { Search, ChevronDown, Loader2, ArrowUpDown } from 'lucide-react';

const Gallery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 

    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        isLoading, 
        isError 
    } = useGallery(searchTerm, sortOrder);

    const allProjects = data?.pages.flatMap(page => page.projects) || [];
    const totalCount = data?.pages[0]?.total || 0;

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            <SEO title="Галерия Проекти" description="Разгледайте нашето портфолио." />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                
                {/* Header & Controls Section */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    
                    {/* Title */}
                    <div data-aos="fade-up" className="text-center lg:text-left w-full lg:w-auto">
                         <h1 className="text-4xl font-bold tracking-wider mb-2">
                            ПЪЛНА <span className="text-[#00f3ff]">ГАЛЕРИЯ</span>
                         </h1>
                         <p className="text-gray-400">
                            {isLoading ? 'Зареждане...' : `Намерени ${totalCount} проекта`}
                         </p>
                    </div>

                    {/* Controls Container */}
                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        
                        {/* 1. Sort Dropdown */}
                        <div data-aos="fade-up" data-aos-delay="50" className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ArrowUpDown className="text-gray-500 w-5 h-5" />
                            </div>
                            <select 
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                className="w-full md:w-48 bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all appearance-none cursor-pointer hover:bg-slate-700"
                            >
                                <option value="desc">Най-нови</option>
                                <option value="asc">Най-стари</option>
                            </select>
                            {/* Custom Arrow for Select */}
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ChevronDown className="text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        {/* 2. Search Input */}
                        <div data-aos="fade-up" data-aos-delay="100" className="relative w-full md:w-80">
                            <input 
                                type="text" 
                                placeholder="Търси модел..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all placeholder-gray-500"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* --- CONTENT --- */}

                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                           <div key={i} className="bg-slate-800 rounded-2xl h-[400px] animate-pulse border border-slate-700"></div>
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="text-center py-10 text-red-400">Възникна грешка.</div>
                )}

                {!isLoading && allProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400">Няма резултати.</p>
                    </div>
                )}

                {!isLoading && allProjects.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allProjects.map((project, index) => (
                            <div key={project.id} data-aos="fade-up" data-aos-delay={(index % 6) * 100} className="h-full">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                )}

                {hasNextPage && (
                    <div className="text-center mt-16" data-aos="fade-up">
                        <button 
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800/50 px-8 py-3 rounded-full text-white font-bold hover:bg-[#00f3ff] hover:text-black hover:border-transparent transition-all duration-300 disabled:opacity-50"
                        >
                            {isFetchingNextPage ? (
                                <><Loader2 className="animate-spin" /> ЗАРЕЖДАНЕ...</>
                            ) : (
                                <><ChevronDown size={20} /> ЗАРЕДИ ОЩЕ</>
                            )}
                        </button>
                    </div>
                )}

            </div>

            <ContactSection /> 
        </div>
    );
};

export default Gallery;