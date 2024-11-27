import React,{useState} from 'react'
import Product from "./Product"
import "../../Styles/Home.css"
import Metadata from '../Layout/Metadata'
import {getAllProducts, getAllProductsForHome} from "../../actions/ProductAction";
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react"
import Loader from '../Loader/Loader'
import ImageSilder from './ImageSilder'
import img1 from "../../assets/sliderimgs/sliderimg1.jpg"
import img2 from "../../assets/sliderimgs/sliderimg2.jpg"
import img3 from "../../assets/sliderimgs/sliderimg3.jpg"
import img4 from "../../assets/sliderimgs/sliderimg4.jpg"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pandents from './Pandents'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SmallLoader from '../Loader/SmallLoader'
import SliderProduct from './SliderProduct';


const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return(
    <div onClick={onClick} className={`arrow ${className}`} >
      <ArrowCircleLeftOutlinedIcon class="arrows" style={{color:"white"}}/>
    </div>
  )
  }

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return(
    <div onClick={onClick} className={`arrow ${className}`} >
      <ArrowCircleRightOutlinedIcon class="arrows" style={{color:"white"}}/>
    </div>
  )
}

const Home = ({setnoOfItems}) => {


  const {cartItems} = useSelector(state=>state.Cart);

  const images = [img1,img2,img3,img4];

  const dispatch = useDispatch();
  const {loading,productsCount,products} = useSelector(state=>state.products)

  const {isAuthenticated} = useSelector(state=>state.user);
  
  let watches = products && products.filter((item)=>item.category==="watches");
  watches =  watches && watches.length<6?watches:watches && watches.slice(1,6);
  let tshirts = products && products.filter((item)=>item.category==="tshirts");
  tshirts =  tshirts && tshirts.length<6?tshirts:tshirts && tshirts.slice(0,5);
  let combos = products && products.filter((item)=>item.category==="combos");
  combos =  combos && combos.length<5?combos:combos && combos.slice(0,4);
  let shoes = products && products.filter((item)=>item.category==="shoes");
  shoes =  shoes && shoes.length<6?shoes:shoes && shoes.slice(0,5);

  useEffect(() => {
    dispatch(getAllProductsForHome());
    setnoOfItems(cartItems.length);
  }, [dispatch,cartItems.length]);


  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows : true,
    nextArrow: <SampleNextArrow to="next"/>,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: "kgj",
    }));
  };

  
  return (
    <>
    <Metadata title="Only Men Wants"/>
    <div>
    {loading?<Loader/>:<div className='HomePage'>
      <ImageSilder content={1} images={images}/>
    </div>}
    </div>
    <section className='home-blocks'>
      <h1 className='Heading'>
        Latest Combos
      </h1>
      <div className="latest-combos background">
        <div className="latest-combo-collection">
          {combos && combos.map(pr=>(
            <Product key={pr._id} pr={pr}/>
          ))}
        </div>
      </div>
    </section>
    <section className='home-blocks'>
    <div className="latest-combo-heading-details background">
        <div className="latest-combo-heading">
            <h2>Watch Collection</h2>
            <p>Our Popular Watches</p>
        </div>
      </div>
      <div className='slider'>
        {
          loading?<SmallLoader/>:<Slider className='fixslide' {...settings}>
          {watches && watches.map(pr=>(
            <SliderProduct key={pr._id} pr={pr}/>
          ))}
          </Slider>
        }
      </div>
    </section >

    <section className='home-blocks'>
      <h1 className='Heading'>
      Shoes
      </h1>
      <div className='Pandents-Block'>
        {shoes && shoes.map((item)=>( <Pandents item={item}/>))}
      </div>
    </section>

      <section className='home-blocks god-background'>
        <h1 className='Heading'>
          T-shirts
        </h1>
        <div className='slider'>
          <Slider className='fixslide' {...settings}>
          {tshirts && tshirts.map((pr)=>(
            <Product key={pr._id} pr={pr}/>
          ))}
          </Slider>
        </div>
        
      </section>
    </>
  )
}

export default Home
