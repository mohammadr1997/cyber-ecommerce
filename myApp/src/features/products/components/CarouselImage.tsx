import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import { useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { API_URL } from "@/constants/api";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ICarouselProps {
  images: string[]
}

export default function CarouselImage({ images }: ICarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
console.log('check images',images)
  return (
    <div style={{ width: '100%', maxWidth: '850px' ,margin:'0 auto',padding:'10px'}}>
      
      {/* Main image */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={10}
        slidesPerView={1}
        className="mainSwiper"
      >
        {images.map((url, index) => {
            if(url.startsWith('/uploads')){
                return  <SwiperSlide key={url}>
            <img
              src={`${API_URL}${url}`}
              alt={`Product ${index + 1}`}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'contain',
              }}
            />
          </SwiperSlide> 
            }else{
                return  <SwiperSlide key={url}>
            <img
             src={`${API_URL}/uploads/${url}`}
              alt={`Product ${index + 1}`}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'contain',
              }}
            />
          </SwiperSlide>
            }
        }
                        
          
        )}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress
        className="thumbSwiper"
        style={{ marginTop: '10px' }}
      >
        {images.map((url, index) => {
           if(url.startsWith('/uploads')){
            return <SwiperSlide key={url}>
                
            <img
             src={`${API_URL}/uploads/${url}`}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '90px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          </SwiperSlide>
           } else{
            return <SwiperSlide key={url}>
            <img
            src={`${API_URL}/uploads/${url}`}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '90px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          </SwiperSlide>
           }
             
        }

          
        )}
      </Swiper>

    </div>
  
)}