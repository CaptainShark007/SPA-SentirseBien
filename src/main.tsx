import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/app/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@app/queryClient.ts';
import { BrowserRouter } from 'react-router-dom';
import ModalRenderer from '@components/ModalRenderer/ModalRenderer.tsx';
import Snackbar from '@components/SnackBar/SnackBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ModalRenderer />
          <Snackbar />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
