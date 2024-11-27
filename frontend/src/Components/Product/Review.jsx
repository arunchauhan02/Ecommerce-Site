import React from 'react'
import ReactStars from "react-rating-stars-component";
import "../../Styles/reviewsstyle.css"
import cimg from "../../assets/icons/right-header-img1.png"
import {Rating} from "@material-ui/lab";
import {WhatsappShareButton,FacebookShareButton,TwitterShareButton} from 'react-share';
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { useLocation } from 'react-router-dom';

const Review = ({rev,productId}) => {
  const options = {
    value:rev.rating,
    readOnly:true,
    precision:0.1
  }

  let c = Date.now()

  console.log(c);


  
  return (
    <div className='review'>
        <div className='reviewDetails'>
            <img src={rev.image} alt="" />
        <h4>{rev.name}</h4>
        <Rating {...options}/>
        <p>{rev.comment}</p>
        <div className='revDetails2'>
          <div>
            <WhatsappShareButton url={window.location.href}><SiWhatsapp/></WhatsappShareButton>
            <TwitterShareButton url={window.location.href}><FaXTwitter/></TwitterShareButton>
          </div>
          <div>
            {rev && rev.date.slice(0,10)}
          </div>

        </div>
        </div>
    </div>
  )
}

export default Review
