import React,{useEffect, useState} from 'react'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react"
import "./imageSlider.css"

const ImageSilder = ({images,content}) => {
    const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex(index => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  function showPrevImage() {
    setImageIndex(index => {
      if (index === 0) return images.length - 1
      return index - 1
    })
  }

  useEffect(() => {
    setTimeout(()=>{
      if (imageIndex === images.length - 1){
        setImageIndex(0);
      }
      else{
        setImageIndex(imageIndex+1);
      }
    },1000);
  }, [imageIndex])



  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a href="#after-image-slider-controls" className="skip-link">
        Skip Image Slider Controls
      </a>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map(( url, index) => (
           <img
            key={url}
            src={url}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate:`${-100*imageIndex}%`} }
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: "-6.7rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".55rem",
        }}
      >
        {images.map((img, index) => (
          <button
            key={index}
            className="img-slider-bottom-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              content?"":<img src={img} alt = "img"/>
            ) : (
              content ?"":<img src={img} alt="" />
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>

  )
}

export default ImageSilder
