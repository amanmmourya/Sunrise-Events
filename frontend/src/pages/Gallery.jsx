import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styled from "styled-components";

const Gallery = () => {
  const [images, setImages] = useState({
    Wedding: ['https://symphonyevents.com.au/wp-content/uploads/2023/01/DSC_6896-2-scaled.jpg','https://symphonyevents.com.au/wp-content/uploads/2023/06/30-scaled.jpg','https://www.oyorooms.com/blog/wp-content/uploads/2018/02/fe.jpg','https://www.oyorooms.com/blog/wp-content/uploads/2018/02/The-Mandap.jpeg','https://desiweds.com/wp-content/uploads/2021/11/wedding-decorator-style-budget-hero-scaled.jpg','https://www.weddingsutra.com/images/aakar-events-thumb-700x452.jpg','https://image.wedmegood.com/resized/720X/uploads/project/288234/1714133943_KRISHNAM_309.jpg?crop=11,225,2025,1139'],
    Haldi: ['https://images.news9live.com/wp-content/uploads/2024/11/haldi-ceremony.jpg?q=50&w=1200','https://i.pinimg.com/736x/8d/3f/57/8d3f575269f6f1f3413df3bd5e3f6950.jpg','https://lh7-rt.googleusercontent.com/docsz/AD_4nXc6dXBnZlRrGbT3DictzR0XgNVhu7S1D7irGIB7xWYkJ9R9icgN7OTZrZw3kwNTLwaPCmne8JxBOdz99RcOQ08GCeYeEYE9A1oQPUpTX2iAOVvVEU6cKq38Dw9l4bzSjzQ4_uUafQyZYfEaL4xtXzpmH5o?key=tengnEEI-l-I2MRTrqXQBg','https://eventsbysaniya.com/wp-content/uploads/Rachita-Darren-Haldi-Ceremony.2.jpg','https://media-api.xogrp.com/images/b0e84a56-db35-4752-acdd-c8d39c2743cc~rs_768.h','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizk0HYTwMGaaykYIgM6rBPS_Zptcusawuztb5MwUNnpi8H_Zb31jhvSiCumC1WCtFIxzcgMD6L4KVuVIIxkFleumVilTCKJcc33cUgbTW64f5hgEUlCBlquOs8UEG_YUufpuvHPfdpCdmJV72sCXZjSl-pf-so-jgQCwcYIvhFuovUJcrHLnxAEcxEElVX/s750/8.jpg'],
    Reception: ['https://d397bfy4gvgcdm.cloudfront.net/187093-PMW-1857.jpeg','https://images.squarespace-cdn.com/content/v1/5f989ee3b46fdb1a74285a6a/61986e1c-864f-4c9d-8bdc-454d5ab2c5bc/Event_Envy_Gold_Frame_w_Red_Flowers_Reception_Stage','https://symphonyevents.com.au/wp-content/uploads/2023/07/Alekhya_Himanth_Wedding_387-1024x683.jpg','https://images.squarespace-cdn.com/content/v1/5f989ee3b46fdb1a74285a6a/61986e1c-864f-4c9d-8bdc-454d5ab2c5bc/Event_Envy_Gold_Frame_w_Red_Flowers_Reception_Stage','https://i.ytimg.com/vi/wzeQc8qSR_4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLADP0iYNcaOfNmAtbGmaf8zt_-MRw'],
    BirthDay:['https://www.greenvelope.com/blog/wp-content/uploads/colorful-outdoor-party-decor.jpeg','https://cdn.togetherv.com/blue-themed-birthday-party-decor-1_1660486587.webp','https://images-cdn.ubuy.co.in/66f58428e1785c49f27d83d2-rose-gold-birthday-party-decorations.jpg','https://i.pinimg.com/236x/d9/c8/62/d9c862655c9d9172154d57c89c145ac9.jpg','https://cdn.shopify.com/s/files/1/1552/7691/files/outdoor-birthday-decor.jpg?v=1678351065']
  });

  // const folders = {
  //   Wedding: "1zmlf4cDUa15ilRSHcMoKHI9GzAFZyYWT",
  //   BabyShower: "1YXWoMYlmJ8Ri7dLmAtKMNVUuN-imYfjz",
  //   Birthday: "11A0yd9PhZ3CJ5OJ0JDfyrreMZzvvnmZT",
  // };

  // const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q";

  // useEffect(() => {
  //   const fetchImages = async (eventType, folderId) => {
  //     const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;
  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data.files) {
  //         setImages((prevState) => ({
  //           ...prevState,
  //           [eventType]: data.files.map(
  //             (file) => `https://lh3.googleusercontent.com/d/${file.id}`
  //           ),
  //         }));
  //       }
  //     } catch (error) {
  //       console.error(`Error fetching ${eventType} images:`, error);
  //     }
  //   };

  //   Object.entries(folders).forEach(([eventType, folderId]) =>
  //     fetchImages(eventType, folderId)
  //   );
  // }, []);

  return (
    <Wrapper>
      <div className="gallery-container">
        <h1 className="gallery-heading">❤️ Event Gallery ❤️</h1>
        {Object.entries(images).map(([eventName, eventImages]) => (
          <div key={eventName} className="event-block">
            <h2 className="event-title">{eventName}</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              effect="fade"
              loop={true}
              className="gallery-swiper"
            >
              {eventImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="image-wrapper">
                    <img src={src} alt={`${eventName} ${index + 1}`} className="gallery-image" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
background: linear-gradient(to bottom right, #fff5f5, #ffffff);
  padding: 5vh 5vw;
  min-height: 100vh;

  .gallery-container {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    padding: 4vh 4vw;
    box-shadow: 0 8px 30px rgba(220, 38, 38, 0.2);
  }

  .gallery-heading {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 5vh;
    color: #dc2626;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .event-block {
    margin-bottom: 8vh;
  }

  .event-title {
    font-size: 2rem;
    color: #c02942;
    margin-bottom: 2vh;
    text-align: center;
    font-weight: 600;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery-image {
    width: 90%;
    max-height: 70vh;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }

  .gallery-image:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    .gallery-heading {
      font-size: 2.2rem;
    }
    .event-title {
      font-size: 1.5rem;
    }
  }
`;

export default Gallery;
