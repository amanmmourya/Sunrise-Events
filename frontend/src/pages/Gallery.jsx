import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/gallery.css";
import styled from 'styled-components'





const Gallery = () => {
  const [imgoW, setImgoW] = useState([]);
  const [imgoR, setImgoR] = useState([]);
  const [imgoS, setImgoS] = useState([]);
  const [imgoH, setImgoH] = useState([]);
  useEffect(() => {
    // For wedding
    const fetchImagesW = async () => {
      const folderId = "1zmlf4cDUa15ilRSHcMoKHI9GzAFZyYWT"; // Your folder ID
      const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q"; // Your API Key

      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log("new check", data.files);
        setImgoW(data.files);

      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImagesW();
    // For Reception
    const fetchImagesR = async () => {
      const folderId = "10M9F_BvmRraw9iT5-ZS5ndP9FtiW6kln"; // Your folder ID
      const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q"; // Your API Key

      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log("new check", data.files);
        setImgoR(data.files);

      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImagesR();
    // For Sangeet
    const fetchImagesS = async () => {
      const folderId = "1YXWoMYlmJ8Ri7dLmAtKMNVUuN-imYfjz"; // Your folder ID
      const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q"; // Your API Key

      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log("new check", data.files);
        setImgoS(data.files);

      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImagesS();
    // For Haldi
    const fetchImagesH = async () => {
      const folderId = "11A0yd9PhZ3CJ5OJ0JDfyrreMZzvvnmZT"; // Your folder ID
      const apiKey = "AIzaSyD6YPEniA0tbg8tIp_pRPrFGPIkTa0AX9Q"; // Your API Key

      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log("new check", data.files);
        setImgoH(data.files);

      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImagesH();

  }, []);

  let eventImages = {
    Wedding: [
      '../../public/img/mrg3.jpg',

    ],
    Reception: [
      '../../public/img/mrg3.jpg',


    ],
    Sangeet: [
      '../../public/img/mrg3.jpg',


    ],
    Haldi: [
      '../../public/img/mrg3.jpg',


    ],
  };
  imgoW.forEach((image) => (
    eventImages.Wedding.push(`https://drive.google.com/thumbnail?id=${image.id}&authuser=0`)
  ));
  imgoR.forEach((image) => (
    eventImages.Reception.push(`https://drive.google.com/thumbnail?id=${image.id}&authuser=0`)
  ));
  imgoS.forEach((image) => (
    eventImages.Sangeet.push(`https://drive.google.com/thumbnail?id=${image.id}&authuser=0`)
  ));
  imgoH.forEach((image) => (
    eventImages.Haldi.push(`https://drive.google.com/thumbnail?id=${image.id}&authuser=0`)
  ));
  // console.log(imgo)



  return (
    <>
      <Wrapper>
        <div className="cont">
          <div className="gallery-container">
            <h1 className="gallery-heading">Event Gallery</h1>
            <div className="main-container1">
              {Object.entries(eventImages).map(([eventName, images]) => (
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
                    }}
                  >
                    {images.map((src, index) => (
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
    </>
  );
};
const Wrapper = styled.section`
.cont{
padding:5%;
}
.gallery-heading{
color:#1A090D;
font-weight:500;
font-family: sans-serif;
}
.event-title{
color:#B80C09;
font-weight:700;
font-size:4vh;
margin:3vh;
font-family: sans-serif;
}
.gallery-swiper{
margin:auto;
}
`
export default Gallery;
