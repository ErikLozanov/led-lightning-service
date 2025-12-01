import { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Project } from '../types';

export const useGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // We just say '/gallery' because baseURL is already set to /api
        const response = await api.get<Project[]>('/gallery'); 
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};