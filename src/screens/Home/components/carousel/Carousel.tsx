import { useEffect, useState } from 'react';
import './carousel.css';

const testimonials = [
  {
    id: 1,
    text: 'Muy buena atención y amplia variedad de servicios para elegir, lo recomiendo...',
    author: 'Jorge',
  },
  {
    id: 2,
    text: 'Excelente servicio, muy profesional y atención personalizada...',
    author: 'María',
  },
  {
    id: 3,
    text: 'Trabajar con ellos fue una experiencia increíble...',
    author: 'Carlos',
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goToIndex = (newIndex: number, dir: 'next' | 'prev') => {
    if (isAnimating || newIndex === index) return;
    setIsAnimating(true);
    setDirection(dir);
    setPrevIndex(index);
    setIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 0);
  };

  const next = () => goToIndex((index + 1) % testimonials.length, 'next');
  const prev = () =>
    goToIndex((index - 1 + testimonials.length) % testimonials.length, 'prev');

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className='testimonial-wrapper'>
      <button className='carousel-button prev' onClick={prev}>
        &lt;
      </button>

      {prevIndex !== null && prevIndex !== index && (
        <div
          key={`out-${testimonials[prevIndex].id}${direction}`}
          className={`testimonial-card out out-${direction}`}
        >
          <p className='testimonial-text'>{testimonials[prevIndex].text}</p>
          <p className='testimonial-author'>
            - {testimonials[prevIndex].author}
          </p>
        </div>
      )}

      <div
        key={`in-${testimonials[index].id}${direction}`}
        className={`testimonial-card in in-${direction}`}
      >
        <p className='testimonial-text'>{testimonials[index].text}</p>
        <p className='testimonial-author'>- {testimonials[index].author}</p>
      </div>

      <div className='dots'>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goToIndex(i, i > index ? 'next' : 'prev')}
          />
        ))}
      </div>

      <button className='carousel-button next' onClick={next}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
