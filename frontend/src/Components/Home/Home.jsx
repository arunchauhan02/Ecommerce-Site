import React,{useState} from 'react'
import Product from "./Product"
import "../../Styles/Home.css"
import Metadata from '../Layout/Metadata'
import {getAllProducts} from "../../actions/ProductAction"
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react"
import Loader from '../Loader/Loader'
import ImageSilder from './ImageSilder'
import img1 from "../../assets/sliderimgs/sliderimg1.webp"
import img2 from "../../assets/sliderimgs/sliderimg2.webp"
import img3 from "../../assets/sliderimgs/sliderimg3.webp"
import img4 from "../../assets/sliderimgs/sliderimg4.webp"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pandents from './Pandents'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SmallLoader from '../Loader/SmallLoader'


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
  
  const product = products;

  const carDashBoard = products && products.filter((item)=>item.category==="dashboard");
  const Gods = products && products.filter((item)=>item.category==="gods");
  const vintages = products && products.filter((item)=>item.category==="vintages");
  const pandents = products && products.filter((item)=>item.category==="pandents");
  const combos = products && products.filter((item)=>item.category==="combos");

  useEffect(() => {
    dispatch(getAllProducts());
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
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
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
      <ImageSilder images={images}/>
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
            <h2>Vintage Collection</h2>
            <p>Our Popular Vintages</p>
        </div>
      </div>
      <div className='slider'>
        {
          loading?<SmallLoader/>:<Slider {...settings}>
          {vintages && vintages.map(pr=>(
            <Product key={pr._id} pr={pr}/>
          ))}
          </Slider>
        }
      </div>
    </section >

    <section className='home-blocks'>
      <h1 className='Heading'>
        God Pandents
      </h1>
      <div className='Pandents-Block'>
        {pandents && pandents.map((item)=>( item.category==="glasses"?<Pandents item={item}/>:""))}
      </div>
    </section>

    <section className='home-blocks'>
      <div className="latest-combo-heading-details background">
          <div className="latest-combo-heading">
              <h2>Car DashBoard</h2>
              <p>for your car dashboard</p>
          </div>
        </div>
        <div className='slider'>

          <Slider {...settings}>
          {carDashBoard && carDashBoard.map((pr)=>(
            <Product key={pr._id} pr={pr}/>
          ))}
          </Slider>
        </div>
      </section >
      <section className='home-blocks god-background'>
        <h1 className='Heading'>
          Beloved Gods
        </h1>
        <div className='slider'>
          <Slider {...settings}>
          {Gods && Gods.map((pr)=>(
            <Product key={pr._id} pr={pr}/>
          ))}
          </Slider>
        </div>

      </section>
    </>
  )
}

export default Home
