import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/gallery.css";
import styled from "styled-components";

const Gallery = () => {
  const [images, setImages] = useState({
    Wedding: [],
    BabyShower: [],
    Birthday: [],
  });

  const folders = {
    Wedding: "1zmlf4cDUa15ilRSHcMoKHI9GzAFZyYWT",
    BabyShower: "1YXWoMYlmJ8Ri7dLmAtKMNVUuN-imYfjz",
    Birthday: "11A0yd9PhZ3CJ5OJ0JDfyrreMZzvvnmZT",
  };

  const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q";

  useEffect(() => {
    const fetchImages = async (eventType, folderId) => {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.files) {
          setImages((prevState) => ({
            ...prevState,
            [eventType]: data.files.map(
              (file) => `https://lh3.googleusercontent.com/d/${file.id}`
            ),
          }));
        }
      } catch (error) {
        console.error(`Error fetching ${eventType} images:`, error);
      }
    };

    Object.entries(folders).forEach(([eventType, folderId]) =>
      fetchImages(eventType, folderId)
    );
  }, []);

  return (
    <Wrapper>
      <div className="cont">
        <div className="gallery-container">
          <h1 className="gallery-heading">Event Gallery</h1>
          <div className="main-container1">
            {Object.entries(images).map(([eventName, eventImages]) => (
              <div key={eventName} className="relative">
                <h3 className="event-title">{eventName}</h3>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={3}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4500 }}
                  loop={true}
                  className="gallery-swiper"
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                    2560: { slidesPerView: 5 },
                  }}
                >
                  {eventImages.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={src}
                        alt={`${eventName} ${index + 1}`}
                        className="gallery-image hover:scale-05 transition-transform duration-300 ease-in-out"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cont {
    padding: 5%;
    background-color: rgb(223, 210, 210);
  }
  .gallery-container {
    border-radius: 2%;
  }
  .gallery-heading {
    color: #1a090d;
    font-weight: 500;
    font-family: sans-serif;
  }
  .event-title {
    color: #b80c09;
    font-weight: 700;
    font-size: 4vh;
    margin: 3vh;
    font-family: sans-serif;
  }
  .gallery-swiper {
    margin: auto;
  }
`;

export default Gallery;
