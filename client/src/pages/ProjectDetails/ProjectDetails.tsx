import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import type { Project } from '../../types';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import Navbar from '../../components/Navbar';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/gallery/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Зареждане...</div>;
  if (!project) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Проектът не е намерен.</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      
      {/* 1. Header Section */}
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">
          {project.car_model}
        </h1>
        {project.production_year && (
          <span className="bg-slate-800 text-neon-blue px-4 py-1 rounded-full text-sm font-bold border border-slate-700">
            Година: {project.production_year}
          </span>
        )}
      </div>

      {/* 2. Main Slider Section */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-slate-700">
           {/* We reuse your existing slider! */}
           <BeforeAfterSlider 
             beforeImage={project.before_image_url}
             afterImage={project.after_image_url}
           />
        </div>
        
        {/* Description */}
        <div className="mt-8 bg-slate-800/50 p-8 rounded-xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-neon-blue mb-4">Описание на проекта</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
            </p>
        </div>
      </div>

      {/* 3. Extra Images Gallery */}
      {project.extra_images && project.extra_images.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 px-6">
           <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-neon-blue pl-4">
             Галерия от процеса
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.extra_images.map((imgUrl, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-slate-800 hover:border-neon-blue transition-all duration-300 h-64 group cursor-pointer">
                    <img src={imgUrl} alt={`Detail ${index}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              ))}
           </div>
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/" className="text-gray-500 hover:text-white transition-colors">← Обратно към началната страница</Link>
      </div>

    </div>
  );
};

export default ProjectDetails;