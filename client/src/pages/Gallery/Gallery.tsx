import { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import ProjectCard from '../../components/ProjectCard';
import SEO from '../../components/SEO';
import ContactSection from '../../components/ContactSection'; 
import { Search } from 'lucide-react';

const Gallery = () => {
	const { projects, loading, error } = useGallery();
	const [searchTerm, setSearchTerm] = useState('');

	// Filter projects based on search (Model or Year)
	const filteredProjects = projects.filter(project => 
		project.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(project.production_year && project.production_year.includes(searchTerm))
	);

	return (
		<div className="min-h-screen bg-slate-900 text-white font-sans">
			<SEO 
				title="Галерия Проекти" 
				description="Разгледайте нашето портфолио от реставрирани фарове. Търсете по модел или година."
			/>

			{/* Main Content Wrapper (Padding for Navbar) */}
			<div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
				
				{/* Header & Search Section */}
				<div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
					
					{/* Header - Animate UP */}
					<div data-aos="fade-up" className="text-center md:text-left">
						 <h1 className="text-4xl font-bold tracking-wider mb-2">
							ПЪЛНА <span className="text-[#00f3ff]">ГАЛЕРИЯ</span>
						 </h1>
						 <p className="text-gray-400">Общо {filteredProjects.length} проекта</p>
					</div>

					{/* Search Input - Animate UP with slight delay */}
					<div data-aos="fade-up" data-aos-delay="100" className="relative w-full md:w-96">
						<input 
							type="text" 
							placeholder="Търси модел (напр. Audi A6)..." 
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full bg-slate-800 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all placeholder-gray-500"
						/>
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
					</div>
				</div>

				{/* Loading / Error States */}
				{loading && <div className="text-center py-20 animate-pulse text-gray-500">Зареждане на проектите...</div>}
				{error && <div className="text-center py-20 text-red-400">Възникна грешка при зареждането.</div>}
				
				{/* Empty Search State */}
				{!loading && filteredProjects.length === 0 && (
					<div className="text-center py-20">
						<p className="text-xl text-gray-400">Няма намерени резултати за "{searchTerm}"</p>
						<button onClick={() => setSearchTerm('')} className="mt-4 text-[#00f3ff] hover:underline font-bold">
							Изчисти търсенето
						</button>
					</div>
				)}

				{/* The Project Grid (Animate each card) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredProjects.map((project, index) => (
						<div key={project.id} data-aos="fade-up" data-aos-delay={index * 100} className="h-full">
							<ProjectCard project={project} />
						</div>
					))}
				</div>

			</div>

			<ContactSection /> 
		</div>
	);
};

export default Gallery;