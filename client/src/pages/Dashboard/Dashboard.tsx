import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProjectUploadForm from '../../components/ProjectUploadForm.tsx';
import ProjectEditForm from '../../components/ProjectEditForm';
import TestimonialUpload from '../../components/TestimonialUpload';
import api from '../../api/axios';
import type { Project } from '../../types';

// Define Testimonial Type locally
interface Testimonial {
  id: number;
  client_name?: string;
  review_image_url: string;
}

const Dashboard = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View State
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects');
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Fetch Logic
  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, testRes] = await Promise.all([
        api.get('/gallery'),
        api.get('/testimonials')
      ]);
      setProjects(projRes.data);
      setTestimonials(testRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [session, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  // Delete Handlers
  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Сигурни ли сте?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) { alert("Грешка при изтриване."); }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!window.confirm("Изтриване на този отзив?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) { alert("Грешка при изтриване."); }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setViewMode('edit');
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-700 pb-6 gap-4">
          <h1 className="text-3xl font-bold text-white">Админ <span className="text-[#00f3ff]">Панел</span></h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">{session.user.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-500/50 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors text-sm font-bold">Изход</button>
          </div>
        </div>

        {/* TABS SWITCHER */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setActiveTab('projects'); setViewMode('list'); }}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'projects' ? 'bg-[#00f3ff] text-black' : 'bg-slate-800 text-gray-400 hover:text-white'}`}
          >
            Управление на Проекти
          </button>
          <button 
            onClick={() => { setActiveTab('testimonials'); setViewMode('list'); }}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'testimonials' ? 'bg-[#00f3ff] text-black' : 'bg-slate-800 text-gray-400 hover:text-white'}`}
          >
            Управление на Отзиви
          </button>
        </div>

        {/* === PROJECTS TAB === */}
        {activeTab === 'projects' && (
          <>
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
                <ProjectUploadForm onSuccess={() => { setViewMode('list'); fetchData(); }} />
              </div>
            )}

            {viewMode === 'edit' && editingProject && (
               <div className="mb-12">
                 <ProjectEditForm 
                   project={editingProject} 
                   onSuccess={() => { setViewMode('list'); fetchData(); }}
                   onCancel={() => setViewMode('list')}
                 />
               </div>
            )}

            {viewMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((post) => (
                  <div key={post.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                    <div className="h-48 overflow-hidden"><img src={post.after_image_url} className="w-full h-full object-cover" /></div>
                    <div className="p-4">
                      <h3 className="font-bold text-white truncate">{post.car_model}</h3>
                      <div className="mt-4 flex justify-end gap-2">
                        <button onClick={() => startEdit(post)} className="text-[#00f3ff] text-sm font-bold border border-[#00f3ff]/30 px-3 py-1 rounded hover:bg-[#00f3ff]/20">РЕДАКТИРАЙ</button>
                        <button onClick={() => handleDeleteProject(post.id)} className="text-red-400 text-sm font-bold border border-red-500/30 px-3 py-1 rounded hover:bg-red-500/20">ИЗТРИЙ</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* === TESTIMONIALS TAB === */}
        {activeTab === 'testimonials' && (
          <>
            {viewMode === 'list' && (
              <button 
                onClick={() => setViewMode('create')}
                className="w-full mb-8 bg-slate-800 border-2 border-dashed border-slate-700 hover:border-purple-500 text-gray-400 hover:text-white py-6 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform text-purple-500">★</span>
                <span className="font-bold">Качи Отзив (Скрийншот)</span>
              </button>
            )}

            {viewMode === 'create' && (
              <div className="mb-12 bg-slate-800 rounded-xl p-8 border border-slate-700 relative">
                <button onClick={() => setViewMode('list')} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                <TestimonialUpload onSuccess={() => { setViewMode('list'); fetchData(); }} />
              </div>
            )}

            {viewMode === 'list' && (
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
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;