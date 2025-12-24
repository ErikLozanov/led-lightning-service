import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProjectUploadForm from '../../components/ProjectUploadForm';
import ProjectEditForm from '../../components/ProjectEditForm';
import TestimonialUpload from '../../components/TestimonialUpload';
import api from '../../api/axios';
import type { Project } from '../../types';
import { ChevronLeft, ChevronRight, Search, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Testimonial {
  id: number;
  client_name?: string;
  review_image_url: string;
}

interface ProjectsResponse {
  projects: Project[];
  total: number;
  totalPages: number;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
  total: number;
  totalPages: number;
}

const Dashboard = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [projectPage, setProjectPage] = useState(1);
  const [projectTotalPages, setProjectTotalPages] = useState(1);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const [testimonialTotalPages, setTestimonialTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');

  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects');
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit' | 'create-testimonial'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (location.state && location.state.action === 'edit' && location.state.project) {
        setActiveTab('projects');
        setEditingProject(location.state.project);
        setViewMode('edit');
        window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 4. Update fetchProjects to use searchTerm
  const fetchProjects = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get<ProjectsResponse>('/gallery', {
        // Pass search param to backend
        params: { page, limit: 9, search: searchTerm } 
      });
      setProjects(res.data.projects);
      setProjectTotalPages(res.data.totalPages);
      setProjectPage(page);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get<TestimonialsResponse>('/testimonials', {
        params: { page, limit: 12 } 
      });
      setTestimonials(res.data.testimonials);
      setTestimonialTotalPages(res.data.totalPages);
      setTestimonialPage(page);
    } catch (err) {
      console.error("Failed to load testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  // 5. Update useEffect to trigger on searchTerm change with debounce
  useEffect(() => {
    if (!session) {
      navigate('/admin');
      return;
    }
    
    if (viewMode === 'list') {
        const timeoutId = setTimeout(() => {
            if (activeTab === 'projects') fetchProjects(projectPage);
            if (activeTab === 'testimonials') fetchTestimonials(testimonialPage);
        }, 500);

        return () => clearTimeout(timeoutId);
    }
  }, [session, navigate, activeTab, projectPage, testimonialPage, viewMode, searchTerm]); 

  // 6. Handle Search Input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setProjectPage(1); 
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Сигурни ли сте?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) { toast.success("Грешка при изтриване."); }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!window.confirm("Изтриване на този отзив?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) { toast.success("Грешка при изтриване."); }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setViewMode('edit');
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-700 pb-6 gap-4">
          <h1 className="text-3xl font-bold text-white">Админ <span className="text-[#00f3ff]">Панел</span></h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">{session.user.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-500/50 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors text-sm font-bold">Изход</button>
          </div>
        </div>

        {viewMode === 'list' && (
            <div className="flex gap-4 mb-8">
            <button 
                onClick={() => { setActiveTab('projects'); setViewMode('list'); }}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'projects' ? 'bg-[#00f3ff] text-black' : 'bg-slate-800 text-gray-400 hover:text-white'}`}
            >
                Проекти
            </button>
            <button 
                onClick={() => { setActiveTab('testimonials'); setViewMode('list'); }}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'testimonials' ? 'bg-[#00f3ff] text-black' : 'bg-slate-800 text-gray-400 hover:text-white'}`}
            >
                Отзиви
            </button>
            </div>
        )}

        {activeTab === 'projects' && (
          <>
            {/* 7. Search Bar */}
            {viewMode === 'list' && (
               <div className="mb-8 relative">
                  <input 
                    type="text" 
                    placeholder="Търсене на проекти по модел..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full bg-slate-800 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all placeholder-gray-500 font-medium"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
               </div>
            )}

            {viewMode === 'list' && (
              <button 
                onClick={() => setViewMode('create')}
                className="w-full mb-8 bg-slate-800 border-2 border-dashed border-slate-700 hover:border-[#00f3ff] text-gray-400 hover:text-white py-6 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform text-[#00f3ff]">+</span>
                <span className="font-bold">Добави Проект</span>
              </button>
            )}

            {viewMode === 'create' && (
              <div className="mb-12 bg-slate-800 rounded-xl p-8 border border-slate-700 relative">
                <button onClick={() => setViewMode('list')} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                <ProjectUploadForm onSuccess={() => { setViewMode('list'); fetchProjects(1); }} />
              </div>
            )}

            {viewMode === 'edit' && editingProject && (
               <div className="mb-12 bg-slate-800 rounded-xl p-8 border border-slate-700 relative">
                 <button onClick={() => setViewMode('list')} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                 <ProjectEditForm 
                   project={editingProject} 
                   onSuccess={() => { setViewMode('list'); fetchProjects(projectPage); }}
                   onCancel={() => setViewMode('list')}
                 />
               </div>
            )}

            {viewMode === 'list' && (
              <>
                {loading ? <p className="text-center py-10 animate-pulse text-gray-500">Зареждане...</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((post) => (
                      <div key={post.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors">
                        <div className="h-48 overflow-hidden"><img src={post.after_image_url} className="w-full h-full object-cover" /></div>
                        <div className="p-4">
                          <h3 className="font-bold text-white truncate text-lg mb-4">{post.car_model}</h3>
                          
                          {/* 8. Updated Actions with View Button */}
                          <div className="flex justify-end gap-2">
                             <Link 
                               to={`/project/${post.slug}`} 
                               target="_blank" 
                               className="text-gray-400 text-xs font-bold border border-slate-600 px-3 py-2 rounded hover:bg-slate-700 hover:text-white flex items-center gap-1 transition-colors"
                             >
                                <Eye size={14} />
                             </Link>

                            <button onClick={() => startEdit(post)} className="text-[#00f3ff] text-xs font-bold border border-[#00f3ff]/30 px-3 py-2 rounded hover:bg-[#00f3ff]/10 transition-colors">РЕДАКТИРАЙ</button>
                            <button onClick={() => handleDeleteProject(post.id)} className="text-red-400 text-xs font-bold border border-red-500/30 px-3 py-2 rounded hover:bg-red-500/10 transition-colors">ИЗТРИЙ</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!loading && projects.length === 0 && (
                    <p className="text-center text-gray-500 py-10">Няма намерени проекти.</p>
                )}

                 <div className="flex justify-center items-center gap-4 mt-8">
                    <button 
                      onClick={() => setProjectPage(p => Math.max(1, p - 1))}
                      disabled={projectPage === 1}
                      className="p-2 bg-slate-800 rounded hover:bg-white/10 disabled:opacity-50"
                    >
                      <ChevronLeft />
                    </button>
                    <span className="text-gray-400">Страница {projectPage} от {projectTotalPages}</span>
                    <button 
                      onClick={() => setProjectPage(p => Math.min(projectTotalPages, p + 1))}
                      disabled={projectPage === projectTotalPages}
                      className="p-2 bg-slate-800 rounded hover:bg-white/10 disabled:opacity-50"
                    >
                      <ChevronRight />
                    </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ... Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <>
            {viewMode === 'list' && (
              <button 
                onClick={() => setViewMode('create-testimonial')}
                className="w-full mb-8 bg-slate-800 border-2 border-dashed border-slate-700 hover:border-purple-500 text-gray-400 hover:text-white py-6 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform text-purple-500">★</span>
                <span className="font-bold">Качи Отзив (Скрийншот)</span>
              </button>
            )}

            {viewMode === 'create-testimonial' && (
              <div className="mb-12 bg-slate-800 rounded-xl p-8 border border-slate-700 relative">
                <button onClick={() => setViewMode('list')} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                <TestimonialUpload onSuccess={() => { setViewMode('list'); fetchTestimonials(1); }} />
              </div>
            )}

            {viewMode === 'list' && (
              <>
                {loading ? <p className="text-center py-10 animate-pulse text-gray-500">Зареждане...</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        <div className="h-64 bg-black p-2">
                            <img src={t.review_image_url} className="w-full h-full object-contain" />
                        </div>
                        <div className="p-4 flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-300">{t.client_name || 'Без име'}</span>
                          <button onClick={() => handleDeleteTestimonial(t.id)} className="text-red-400 hover:text-white font-bold">✕ ИЗТРИЙ</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button 
                      onClick={() => setTestimonialPage(p => Math.max(1, p - 1))}
                      disabled={testimonialPage === 1}
                      className="p-2 bg-slate-800 rounded hover:bg-white/10 disabled:opacity-50"
                    >
                      <ChevronLeft />
                    </button>
                    <span className="text-gray-400">Страница {testimonialPage} от {testimonialTotalPages}</span>
                    <button 
                      onClick={() => setTestimonialPage(p => Math.min(testimonialTotalPages, p + 1))}
                      disabled={testimonialPage === testimonialTotalPages}
                      className="p-2 bg-slate-800 rounded hover:bg-white/10 disabled:opacity-50"
                    >
                      <ChevronRight />
                    </button>
                </div>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;