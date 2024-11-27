import React,{useRef, useState,useEffect} from 'react'
import { Typography } from '@material-ui/core'
import Slider from "@material-ui/core/Slider"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { byCollectionProduct } from '../../actions/ProductAction';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Filter = () => {
    const [rating, setrating] = useState(0);
    const [price, setprice] = useState([0,25000]);
    const dispatch = useDispatch();
    const params = useParams();

    const handleRating = (event,newRating)=>{
        event.preventDefault();
        setrating(newRating);
      }

      const priceHandler = (event,newPrice)=>{
        setprice(newPrice);
      }
      const openref = useRef();
      const openrefRatings = useRef();

      const [isOpen,setisOpen] = useState(false);
      const [isOpenRatings,setisOpenRatings] = useState(false);
      const [currentpage, setcurrentpage] = useState(1);

      const show = ()=>{
        if(!isOpen){
            openref.current.className="priceOpen";
            setisOpen(true);
        }
        else{
            openref.current.className="priceClose";
            setisOpen(false)
        }
      }

      const showRatingFilter = ()=>{
        if(!isOpenRatings){
            openrefRatings.current.className="ratingsOpen";
            setisOpenRatings(true);
        }
        else{
            openrefRatings.current.className="priceClose";
            setisOpenRatings(false);
        }
      }

      // useEffect(() => {
      //   dispatch(byCollectionProduct(params,currentpage,price,rating));
      // }, [dispatch,currentpage,params,price,rating])
      
  return (
    <div className=''>
        <div>
            <div  onClick={show} className='pricebtn' >
                    <Typography>Price</Typography>
                    {
                        isOpen?<IoIosArrowUp/>:<IoIosArrowDown/>
                    }
            </div>
            <div>
                <div onClick={show} ref={openref} className='priceClose'>
                    <Slider value={price}
                    onChange={priceHandler} 
                    valueLabelDisplay='auto' 
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                    />
                </div>
            </div>
        </div>
        <div>
            <div  onClick={showRatingFilter} className='pricebtn' >
                    <Typography>Ratings Above</Typography>
                    {
                        isOpenRatings?<IoIosArrowUp/>:<IoIosArrowDown/>
                    }
            </div>
            <div>
            <div ref={openrefRatings} className='priceClose'>
                <Slider value={rating}
                  aria-labelledby='continuous-slider'
                  onChange={handleRating}
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}/>
                    <select onChange={(e)=>{handleRating(e,e.target.value)}} value={rating} name="" id="">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    </select>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Filter



{/* <div className='category-filter'>
            <div className='filterBox'>
              <div>
                <h3 className='secHeading'>Filters</h3>
              <Typography>Price</Typography>
                <Slider value={price}
                 onChange={priceHandler} 
                 valueLabelDisplay='auto' 
                 aria-labelledby='range-slider'
                 min={0}
                 max={25000}
                 />
                  <fieldset>
                  <Typography component="legend">
                    Ratings above
                  </Typography>
                  <Slider value={rating}
                  aria-labelledby='continuous-slider'
                  onChange={handleRating}
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}/>
                    <select onChange={(e)=>{handleRating(e,e.target.value)}} value={rating} name="" id="">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    </select>
                 </fieldset>
                  </div>
            </div> */}