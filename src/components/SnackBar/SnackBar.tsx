import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { hideSnackbar } from './snackBar.slice';
import './SnackBar.css';

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { open, message, type, duration } = useAppSelector(
    (state) => state.snackbar
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideSnackbar());
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [open, duration, dispatch]);

  return (
    <div className={`snackbar ${open ? 'show' : ''} ${type}`}>{message}</div>
  );
};

export default Snackbar;
