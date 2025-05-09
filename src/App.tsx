import { Route, Routes } from 'react-router';
import './App.css';
import PublicLayout from '@layout/public/PublicLayout';
import Home from '@screens/Home/Home';
import Reservas from '@screens/Reservas/Reservas';
import PublicGuard from '@layout/public/PublicGuard';

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />

        <Route element={<PublicGuard />}>
          <Route path='mis-reservas/:idUser' element={<Reservas />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
