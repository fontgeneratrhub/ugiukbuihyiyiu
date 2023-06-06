import React from "react";
import avi from "../../images/User-avatar.svg.png";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Esha",
      title: "Software Engineer",
      image: avi,
      rating: 5,
      comment:
        "I am so grateful for the convenience and efficiency of this website. It connected me with a skilled technician who fixed my device promptly. The whole process was seamless, and I highly recommend it to anyone in need of reliable technical assistance.",
    },
    {
      id: 2,
      name: "Bilal",
      title: "Marketing Manager",
      image: avi,
      rating: 3,
      comment:
        "Using this website to find a technician was a game-changer for me. I was skeptical at first, but the technician I found was knowledgeable and friendly. They resolved my technical issue with ease, and I didn't even have to leave my home. I will definitely rely on this service in the future.",
    },
    {
      id: 3,
      name: "Husnain",
      title: "Small Business Owner",
      image: avi,
      rating: 4,
      comment:
        "I had a great experience using this website to find a technician for my device repair. The platform was user-friendly, and it didn't take long to find a qualified technician. They arrived on time and provided excellent service. The only reason I'm giving 4 stars is because the pricing was a bit higher than expected.",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return stars;
  };

  return (
    <section className="min-h-screen flex justify-center items-center border-t border-gray-300 p-10">
      <div className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-10">Testimonials</h1>
        <div className="flex flex-col sm:flex-row justify-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center justify-center bg-gray-50 border border-gray-400 rounded-lg p-4 m-4 flex-1 hover:shadow-lg"
            >
              <img
                className="rounded-full w-20 h-20 mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{testimonial.title}</p>
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-500 text-center">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
