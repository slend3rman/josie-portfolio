import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  { img: "/images/dog.png" },
  { img: "/images/cat.png" },
  { img: "/images/mouse.png" },
  { img: "/images/painting.png" },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [current]);

  return (
    <section id="gallery" className="relative w-full max-w-3xl mx-auto my-10">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <img src={s.img} alt={`Slide ${i}`} key={i} className="w-full flex-shrink-0" />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
