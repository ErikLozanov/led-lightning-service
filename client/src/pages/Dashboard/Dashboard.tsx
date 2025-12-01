import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProjectUploadForm from '../../components/ProjectUploadForm.tsx';
import ProjectEditForm from '../../components/ProjectEditForm'; 
import api from '../../api/axios';
import type { Project } from '../../types';

const Dashboard = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View Modes: 'list', 'create', 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/gallery');
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate('/admin');
      return;
    }
    fetchProjects();
  }, [session, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете този проект?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert("Грешка при изтриване.");
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setViewMode('edit');
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-slate-700 pb-6 gap-4">
          <h1 className="text-3xl font-bold text-white">
            Админ <span className="text-neon-blue">Панел</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">{session.user.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-500/50 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors text-sm font-bold">
              Изход
            </button>
          </div>
        </div>

        {/* --- LOGIC FOR SWITCHING VIEWS --- */}

        {/* 1. EDIT MODE */}
        {viewMode === 'edit' && editingProject && (
           <div className="mb-12">
             <ProjectEditForm 
               project={editingProject} 
               onSuccess={() => {
                 setViewMode('list');
                 setEditingProject(null);
                 fetchProjects();
               }}
               onCancel={() => {
                 setViewMode('list');
                 setEditingProject(null);
               }}
             />
           </div>
        )}

        {/* 2. CREATE MODE */}
        {viewMode === 'create' && (
          <div className="mb-12 bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl relative">
            <button onClick={() => setViewMode('list')} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
            <h2 className="text-xl font-bold mb-6">Нов Запис</h2>
            <ProjectUploadForm onSuccess={() => {
              setViewMode('list');
              fetchProjects();
            }} />
          </div>
        )}

        {/* 3. LIST MODE (Default) */}
        {viewMode === 'list' && (
          <>
            {/* Create Button */}
            <div className="mb-12">
              <button 
                onClick={() => setViewMode('create')}
                className="w-full bg-slate-800 border-2 border-dashed border-slate-700 hover:border-neon-blue text-gray-400 hover:text-white py-8 rounded-xl transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">+</span>
                <span className="font-bold">Добави нов проект</span>
              </button>
            </div>

            {/* Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-neon-blue pl-4">Управление на проекти</h2>
              {loading ? (
                <p className="text-gray-500">Зареждане...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((post) => (
                    <div key={post.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg group">
                      <div className="h-48 overflow-hidden relative">
                        <img src={post.after_image_url} alt={post.car_model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white text-lg truncate">{post.car_model}</h3>
                        <div className="mt-4 pt-4 border-t border-slate-700 flex justify-end gap-2">
                          <button onClick={() => startEdit(post)} className="text-neon-blue hover:text-white text-sm font-bold border border-neon-blue/30 hover:bg-neon-blue/20 px-3 py-1 rounded transition-colors">
                            РЕДАКТИРАЙ
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-white text-sm font-bold border border-red-500/30 hover:bg-red-500/20 px-3 py-1 rounded transition-colors">
                            ИЗТРИЙ
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;