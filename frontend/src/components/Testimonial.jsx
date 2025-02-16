import React from 'react';
import { Star, Heart, Quote } from 'lucide-react';
import styled from 'styled-components';

const testimonials = [
  {
    name: "Sarah & James Thompson",
    event: "Wedding",
    date: "June 2023",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600",
    quote: "Our wedding day was absolutely perfect! The attention to detail and personal touches made it truly magical. We couldn't have asked for better planners.",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    event: "25th Anniversary",
    date: "September 2023",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=600",
    quote: "They transformed our 25th anniversary celebration into an unforgettable evening. The decorations were stunning and the coordination was flawless.",
    rating: 5
  },
  {
    name: "The Patel Family",
    event: "Sweet 16 Birthday",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&q=80&w=600",
    quote: "The team went above and beyond for my daughter's Sweet 16. The theme was perfectly executed and everyone had an amazing time!",
    rating: 5
  },
];

function Testimonials() {
  return (
    <Wrapper>
      <div className="testimonial-screen min-h-screen bg-gradient-to-b from-rose-50 to-white px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="pt-16 pb-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="text-rose-500 w-6 h-6" />
            <h1 className="text-4xl font-serif text-gray-800">Stories</h1>
            <Heart className="text-rose-500 w-6 h-6" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Discover what our cherished clients say about their special moments with us.
            Each story represents a unique celebration we had the privilege to bring to life.
          </p>
        </div>

        <div className="grids max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white cont rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="text-rose-400 w-8 h-8 mb-2" />
                  <p className="text-gray-600 italic mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-rose-500">{testimonial.event}</p>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
.grid{
padding:2vw;
}
.cont{
padding:1vh;
}
  .testimonial-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  @media (max-width: 640px) {
    .testimonial-screen {
      padding: 10px;
    }
  }
`;

export default Testimonials;