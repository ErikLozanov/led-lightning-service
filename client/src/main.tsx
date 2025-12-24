import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient(); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> 
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}> 
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);