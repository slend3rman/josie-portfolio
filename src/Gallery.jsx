import React, { useEffect, useState } from "react";

const slides = [
  { src: "/images/painting.png", alt: "Painting" },
  { src: "/images/dog.png", alt: "Dog" },
  { src: "/images/cat.png", alt: "Cat" },
  { src: "/images/mouse.png", alt: "Mouse" },
];

export default function Gallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gallery" className="py-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Gallery</h2>
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-lg shadow">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </section>
  );
}
