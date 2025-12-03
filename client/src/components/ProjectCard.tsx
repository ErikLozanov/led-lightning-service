import { Link } from 'react-router-dom';
import type { Project } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-[#00f3ff]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] group h-full flex flex-col">
      
      <Link to={`/project/${project.slug}`} className="block relative">
         <div className="pointer-events-none"> 
           <BeforeAfterSlider 
             beforeImage={project.before_image_url}
             afterImage={project.after_image_url}
             isInteractive={false} 
           />
         </div>
         
         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-30 duration-300">
            <span className="text-white font-bold border-2 border-white px-6 py-2 rounded-full tracking-widest hover:bg-white hover:text-black transition-colors">ВИЖ ДЕТАЙЛИ</span>
         </div>
      </Link>

      <div className="p-6 relative flex-1 flex flex-col">
        <Link to={`/project/${project.slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 hover:text-[#00f3ff] transition-colors uppercase truncate">
            {project.car_model}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 border-l-2 border-[#00f3ff]/30 pl-3 mb-4">
          {project.description}
        </p>
        
        {project.production_year && (
           <div className="mt-auto flex justify-end">
              <span className="text-xs font-mono text-[#00f3ff] border border-[#00f3ff]/30 px-2 py-1 rounded bg-[#00f3ff]/5">
                {project.production_year}
              </span>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;