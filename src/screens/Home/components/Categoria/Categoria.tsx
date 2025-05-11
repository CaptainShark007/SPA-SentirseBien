// Categoria.tsx
import './categoria.css';

interface CategoriaProps {
  categoria: {
    key: string;
    title: string;
    description: string;
    imagePath: string;
  };
  categoriaSeleccionada: (key: string) => void;
}

const Categoria = ({ categoria, categoriaSeleccionada }: CategoriaProps) => {
  const { key, title, description, imagePath } = categoria;

  return (
    <div
      className='categoria-card'
      onClick={() => categoriaSeleccionada(key)}
    >
      <div 
        className='categoria-image'
        style={{ backgroundImage: `url(${imagePath})` }}
      ></div>
      <div className='categoria-content'>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className='explore-button'>Explorar tratamientos</button>
      </div>
    </div>
  );
};

export default Categoria;