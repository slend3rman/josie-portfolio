

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaInstagram, FaReddit, FaSnapchatGhost } from "react-icons/fa";
import Gallery from "./Gallery";
import Shop from "./Shop";
import Request from "./Request";

const pets = [
  { img: "/images/dog.png", text: "and this is my Nacho" },
  { img: "/images/cat.png", text: "Say hi to Sosuke" },
  { img: "/images/mouse.png", text: "and also to this lil guy" },
];

function Home() {
  // Reveal sections: art, then each pet, then greeting/cta/footer
  const revealSections = [
    {
      img: "/images/painting.png",
      text: "This is my art",
      direction: "left",
    },
    ...pets.map((pet, idx) => ({
      img: pet.img,
      text: pet.text,
      direction: idx % 2 === 0 ? "right" : "left",
    })),
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-blue-50 text-gray-900 font-sans">
      {/* Floating Nav for Mobile */}
      <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 bg-white/90 rounded-full shadow-lg px-6 py-2 flex gap-8 sm:hidden border">
        <Link to="/gallery" className="font-semibold text-blue-600">Gallery</Link>
        <Link to="/request" className="font-semibold text-blue-600">Request</Link>
      </nav>

      {/* Greeting Section (always at top) */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] pt-12 pb-8 text-center">
        <motion.img
          src="/images/josephine.png"
          alt="Josephine"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Hello, I'm Josephine
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-600 mb-3"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Welcome to my art portfolio!
        </motion.p>
        <div className="flex justify-center gap-4 mt-2 mb-6">
          <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram size={28} /></a>
          <a href="#" aria-label="Reddit" className="hover:text-orange-500"><FaReddit size={28} /></a>
          <a href="#" aria-label="Snapchat" className="hover:text-yellow-500"><FaSnapchatGhost size={28} /></a>
        </div>
      </section>

      {/* Reveal Story Sections */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.5 }}
      >
        {revealSections.map((section, idx) => {
          const variants = {
            hidden: {
              opacity: 0,
              x: section.direction === "left" ? -150 : 150,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, delay: idx * 0.2 },
            },
          };
          return (
            <motion.section
              key={idx}
              variants={variants}
              className="flex flex-col items-center justify-center min-h-[60vh] py-6 overflow-x-hidden"
            >
              <motion.img
                src={section.img}
                alt={section.text}
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg shadow mb-4 object-cover"
              />
              <motion.span className="block text-xl sm:text-2xl font-playfair italic text-gray-800 mt-1">
                {section.text}
              </motion.span>
            </motion.section>
          );
        })}
      </motion.div>

      {/* CTA to Gallery */}
      <div className="flex justify-center py-8">
        <Link to="/gallery" className="text-xl font-bold underline text-blue-700 hover:text-blue-500 transition block mt-4">
          Explore My Work
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6 mt-10">
        &copy; {new Date().getFullYear()} Josephine's Art Portfolio
      </footer>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <header className="w-full bg-white/80 shadow-sm py-3 px-4 flex justify-between items-center sticky top-0 z-40">
        <Link to="/" className="text-lg font-bold text-blue-700">Josephine's Art</Link>
        <nav className="hidden sm:flex gap-8">
          <Link to="/gallery" className="font-semibold hover:text-blue-600">Gallery</Link>
          <Link to="/shop" className="font-semibold hover:text-blue-600">Shop</Link>
          <Link to="/request" className="font-semibold hover:text-blue-600">Request</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </Router>
  );
}
