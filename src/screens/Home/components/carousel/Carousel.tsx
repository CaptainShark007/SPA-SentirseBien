import styles from '@screens/Home/components/carousel/Carousel.module.css';
import { useEffect, useState } from 'react';

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
    <div className={styles['testimonial-wrapper']}>
      <button
        className={`${styles['carousel-button']} ${styles['prev']}`}
        onClick={prev}
      >
        &lt;
      </button>

      {prevIndex !== null && prevIndex !== index && (
        <div
          key={`out-${testimonials[prevIndex].id}${direction}`}
          className={`${styles['testimonial-card']} out ${styles[`out-${direction}`]}`}
        >
          <p>{testimonials[prevIndex].text}</p>
          <p className={styles['testimonial-author']}>
            - {testimonials[prevIndex].author}
          </p>
        </div>
      )}

      <div
        key={`in-${testimonials[index].id}${direction}`}
        className={`${styles['testimonial-card']} ${styles.in} ${styles[`in-${direction}`]}`}
      >
        <p>{testimonials[index].text}</p>
        <p className={styles['testimonial-author']}>
          - {testimonials[index].author}
        </p>
      </div>

      <div className={styles['dots']}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => goToIndex(i, i > index ? 'next' : 'prev')}
          />
        ))}
      </div>

      <button
        className={`${styles['carousel-button']} ${styles['next']}`}
        onClick={next}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
