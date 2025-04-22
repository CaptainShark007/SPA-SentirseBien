import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/app/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@app/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  // Colocar depspues manejo de errores con error boundaries y con snakebar
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
