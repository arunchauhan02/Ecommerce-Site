import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { ClearErros, byCollectionProduct } from '../../actions/ProductAction';
import Loader from '../Loader/Loader';
import Metadata from '../Layout/Metadata';
import Product from '../Home/Product';
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom';
import Slider from "@material-ui/core/Slider"
import { Typography } from '@material-ui/core';
import "./Collection.css"

const Glassess = () => {
    const dispatch = useDispatch();
    const [currentpage, setcurrentpage] = useState(1);
    const params = useParams();
    const [price, setprice] = useState([0,25000]);
    const [rating, setrating] = useState(0)
    useEffect(() => {
      dispatch(byCollectionProduct(params,currentpage,price,rating));
    }, [dispatch,currentpage,params,price,rating])

    const {loading,product,resultPerPage,productsCount,filteredProductCount} = useSelector(state=>state.products);

    const setCurrentPageno = (e)=>{
      setcurrentpage(e);
    };

    const priceHandler = (event,newPrice)=>{
      setprice(newPrice);
    }
    const handleRating = (event,newRating)=>{
      event.preventDefault();
      setrating(newRating);
    }

    let count = filteredProductCount;
  return (
    <div>{loading?<Loader/>:<div className='collection'>
            <Metadata title={params.id}/>
              <div className="latest-combo-heading-details background">
                <div className="latest-combo-heading">
                  <h2 className='Heading'>{params.id[0].toUpperCase() + params.id.slice(1)}</h2>
                </div>
              </div>
            <div className='category-filter'>
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
            </div>
              <div className="latest-combos add-width">
                <div className="latest-combo-collection">
                  {product && product.map(pr=>{
                    return <Product key={pr._id} pr={pr}/>
                  })}
                </div>
              </div>
            </div>
            {resultPerPage<count && <div className='paginationBox'>
              <Pagination 
              activePage={currentpage} 
              itemsCountPerPage={resultPerPage} 
              totalItemsCount={productsCount} 
              onChange={setCurrentPageno} 
              nextPageText="next" 
              prevPageText="prev" 
              firstPageText="first" 
              lastPageText="last" 
              itemClass='page-item' 
              linkClass='page-link'
              activeClass='pageItemsActive'
              activeLinkClass='pageLinkActive'/>
            </div>}
          </div>
        }
    </div>
  )
}

export default Glassess
