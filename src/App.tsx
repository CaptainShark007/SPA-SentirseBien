import { Route, Routes } from 'react-router';
import './App.css';
import PublicLayout from '@layout/public/PublicLayout';
import Home from '@screens/Home/Home';

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
