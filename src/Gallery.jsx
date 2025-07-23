import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imagePaths = [
  '/images/painting.png',
  '/images/dog.png',
  '/images/cat.png',
  '/images/mouse.png',
];

function GalleryScene({ images, currentIndex, offset, onImageClick }) {
  const groupRef = useRef();
  const targetX = -currentIndex * 3 + offset;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {images.map((img, idx) => {
        const texture = useTexture(img);
        return (
          <motion.group
            key={idx}
            position={[idx * 3, 0, 0]}
            initial={{ x: 5 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
          >
            <mesh position={[0, 0.5, 0]} onClick={onImageClick}>
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial map={texture} />
            </mesh>
            <mesh position={[0, 0.5, -0.02]}> {/* Frame */}
              <planeGeometry args={[2.4, 2.4]} />
              <meshStandardMaterial color="#2b2b2b" />
            </mesh>
            <Html position={[0, -1.4, 0]} center zIndexRange={[0, 2]}> {/* Label below, behind YOU DIED */}
              <div style={{ 
                color: '#111', 
                fontSize: '13px', 
                backgroundColor: '#fdfdfd', 
                padding: '5px 10px', 
                borderRadius: '6px', 
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                fontFamily: 'serif',
                border: '1px solid #aaa',
              }}>
                {img.split('/').pop()}
              </div>
            </Html>
          </motion.group>
        );
      })}
    </group>
  );
}

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [offset, setOffset] = useState(0);
  const [youDied, setYouDied] = useState(false);
  const scrollRef = useRef(null);

  const scrollToImage = (index) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: index * 80, behavior: 'smooth' });
    }
  };

  const handleImageClick = () => {
    setYouDied(true);
    setTimeout(() => {
      setYouDied(false);
      setCurrentIndex(0);
    }, 3000);
  };

  useEffect(() => {
    if (currentIndex === -1) return;

    let startX = null;
    const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
      if (startX === null) return;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX > 50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
      else if (deltaX < -50 && currentIndex < imagePaths.length - 1) setCurrentIndex(currentIndex + 1);
      startX = null;
    };

    let mouseStart = null;
    const handleMouseDown = (e) => { mouseStart = e.clientX; };
    const handleMouseUp = (e) => {
      if (mouseStart === null) return;
      const deltaX = e.clientX - mouseStart;
      if (deltaX > 50 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
      else if (deltaX < -50 && currentIndex < imagePaths.length - 1) setCurrentIndex(currentIndex + 1);
      mouseStart = null;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex((prev) => prev - 1);
      else if (e.key === 'ArrowRight' && currentIndex < imagePaths.length - 1) setCurrentIndex((prev) => prev + 1);
    };

    const canvasContainer = document.getElementById('gallery-canvas');
    if (canvasContainer) {
      canvasContainer.addEventListener('touchstart', handleTouchStart);
      canvasContainer.addEventListener('touchend', handleTouchEnd);
      canvasContainer.addEventListener('mousedown', handleMouseDown);
      canvasContainer.addEventListener('mouseup', handleMouseUp);
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (canvasContainer) {
        canvasContainer.removeEventListener('touchstart', handleTouchStart);
        canvasContainer.removeEventListener('touchend', handleTouchEnd);
        canvasContainer.removeEventListener('mousedown', handleMouseDown);
        canvasContainer.removeEventListener('mouseup', handleMouseUp);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-[#f4f1ed] text-gray-900 flex flex-col items-center justify-center">
      <div id="gallery-canvas" className="h-[60vh] w-full max-w-6xl relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-red-800 z-20">
          Do not touch the artwork...my dev is crazyy
        </div>

        {currentIndex === -1 && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-30"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            onAnimationComplete={() => setCurrentIndex(0)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl mb-4"
            >
              🚪 Door Opening...
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg animate-bounce"
            >
              👉 See Josie's Exhibits
            </motion.div>
          </motion.div>
        )}

        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          {currentIndex >= 0 && (
            <GalleryScene images={imagePaths} currentIndex={currentIndex} offset={offset} onImageClick={handleImageClick} />
          )}
        </Canvas>

        <AnimatePresence>
          {youDied && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black text-red-600 text-5xl font-extrabold z-50"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              YOU DIED
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 p-4 bg-white shadow-inner"
      >
        {imagePaths.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className="w-20 h-20 object-cover cursor-pointer rounded border border-gray-300 hover:border-blue-500"
            whileHover={{ scale: 1.1 }}
            onClick={() => scrollToImage(idx)}
          />
        ))}
      </div>
    </div>
  );
}
