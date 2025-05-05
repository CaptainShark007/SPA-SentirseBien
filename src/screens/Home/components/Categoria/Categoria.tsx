import './categoria.css';

interface CategoriaProps {
  categoria: {
    key: string;
    title: string;
    description: string;
    imagePath: string;
  };
  categoriaSeleccionada: (_key: string) => void;
}

const Categoria = ({ categoria, categoriaSeleccionada }: CategoriaProps) => {
  const { key, title, description, imagePath } = categoria;

  return (
    <div
      className='service'
      style={{ backgroundImage: `url(${imagePath})` }}
      onClick={() => categoriaSeleccionada(key)}
    >
      <div className='overlay'></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Categoria;
