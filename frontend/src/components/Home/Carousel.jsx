import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      id: 1,
      url: "https://picsum.photos/id/1018/500/300",
      alt: "Image 1",
    },
    {
      id: 2,
      url: "https://picsum.photos/id/1024/500/300",
      alt: "Image 2",
    },
    {
      id: 3,
      url: "https://picsum.photos/id/1035/500/300",
      alt: "Image 3",
    },
  ];

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.alt}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out object-cover ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center">
        <button
          onClick={handlePrevClick}
          className="p-4 rounded-full text-white hover:bg-gray-700 mr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 absolute top-1/2 left-0 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          className="p-4 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 absolute top-1/2 right-0 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
