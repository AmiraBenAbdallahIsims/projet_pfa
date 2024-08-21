import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom";

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import "./slide-div.css";

function SlideDiv() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const handleTemplate = async (templateName) => {
    if (token && user) {
      const userDetails = JSON.parse(user);
      console.log(token, userDetails)
      if (token == userDetails.token) {
          navigate(`/templates/${templateName}/`);

      }
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        className="swiper_container"
      >
        <SwiperSlide >
          <img src="./images/template 1.png" alt="slide_image" onClick={() => handleTemplate("a")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/template2.png" alt="slide_image" onClick={() => handleTemplate("b")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/template3.png" alt="slide_image" onClick={() => handleTemplate("c")} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/template4.png" alt="slide_image" onClick={() => handleTemplate("d")} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}



export default SlideDiv;
