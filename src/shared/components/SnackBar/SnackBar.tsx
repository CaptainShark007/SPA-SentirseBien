import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { hideSnackbar } from './snackBar.slice';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
    <div className={`snackbar ${open ? 'show' : ''} ${type}`}>
      {type === 'success' ? (
        <CheckCircleOutlinedIcon />
      ) : type === 'error' ? (
        <ReportOutlinedIcon />
      ) : (
        <InfoOutlinedIcon />
      )}

      {message}
    </div>
  );
};

export default Snackbar;
