import React from 'react'
import ReactStars from "react-rating-stars-component";
import "../../Styles/reviewsstyle.css"
import cimg from "../../assets/icons/right-header-img1.png"
import {Rating} from "@material-ui/lab"

const Review = ({rev}) => {
  const options = {
    value:rev.rating,
    readOnly:true,
    precision:0.1
  }
  return (
    <div className='review'>
        <div className='reviewDetails'>
            <img src={rev.image} alt="" />
        <h4>{rev.name}</h4>
        <p>{rev.comment}</p>
        <Rating {...options}/>
        </div>
    </div>
  )
}

export default Review
