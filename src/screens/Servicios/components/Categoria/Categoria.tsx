import { SpaInfoData } from '@features/types/serviceSpa.types';
import './categoria.css';

interface CategoriaProps {
  categoria: SpaInfoData;
  categoriaSeleccionada: (key: string) => void;
}

const Categoria = ({ categoria, categoriaSeleccionada }: CategoriaProps) => {
  const { category } = categoria;

  return (
    <div
      className='service'
      style={{ backgroundImage: `url()` }}
      onClick={() => categoriaSeleccionada(category)}
    >
      <div className='overlay'></div>
      <h3>{category}</h3>
      <p></p>
    </div>
  );
};

export default Categoria;
