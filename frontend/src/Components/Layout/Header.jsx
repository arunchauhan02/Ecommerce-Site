import React, { useEffect,useRef,useState } from 'react'
import ect1 from "../../assets/icons/ect1.png"
import ect2 from "../../assets/icons/ect2.png"
import ect3 from "../../assets/icons/ect3.png"
import ect4 from "../../assets/icons/ect4.png"
import ect5 from "../../assets/icons/ect5.jpg"
import ect6 from "../../assets/icons/ect6.png"
import ect7 from "../../assets/icons/right-header-img1.png"
import ect8 from "../../assets/icons/right-header-img2.png"
import ect9 from "../../assets/icons/right-header-img3.png"
import ect10 from "../../assets/icons/right-header-img4.png"
import ect11 from "../../assets/icons/cross.png"  
import siteLogo from "../../assets/icons/SiteLogo.jpg"  
import "../../Styles/Navbar.css"
import "../../Styles/Search.css"
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {getproduct, SearchProduct} from "../../actions/ProductAction"
import Product from "../Home/Product"
import Loader from '../Loader/Loader'
import Useroptions from './Useroptions'
import SearchProducts from '../Product/SearchProducts'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({noOfItems}) => {
    
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();
    const searchref = useRef();
    const Hamburgur = useRef();
    function searchProduct(){
        searchref.current.className = "Search";
    }
    function closeSearch(){
        searchref.current.className = "beforeSearch";
    }
    function open(){
        Hamburgur.current.className = "sideBar";
    }
    function closed(){
        Hamburgur.current.className = "closeSideBar";
    }
    const {products,loading} = useSelector(state=>state.searchProduct);
    useEffect(() =>{
        dispatch(SearchProduct(keyword));

    }, [keyword])

    
  return (
    <div className='header'>
        <div ref = {searchref} className='beforeSearch'>
            <button onClick={closeSearch} className='cross'><img src={ect11} alt="" /></button>
            <form action="">
                <input type="seacrh" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search...'/>
                <button type="submit">Search</button>
            </form>
            <div className='searchDetails'>
                {
                    loading ? <Loader/>:
                    products && products.map((pr)=>{
                        return < SearchProducts pr={pr}/>
                    })
                }
            </div>
        </div>
      <div className="navicons">
        <ul className = "iconsnav">
            <li><Link to="/"><img className="naviconsimg" src={ect1} alt=""/></Link></li>
            <li><Link to="/"><img className="naviconsimg" src={ect2} alt=""/></Link></li>
            <li><Link to="/"><img className="naviconsimg" src={ect3} alt=""/></Link></li>
            <li><Link to="/"><img className="naviconsimg" src={ect4} alt=""/></Link></li>
        </ul>
        <ul className = "iconsnav">
            <li><a className="telephone" href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><img className="naviconsimg" src={ect5} alt=""/><p>9310100258</p></a></li>
            <li><a className = "whatsapp" href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><img className="naviconsimg" src={ect6} alt=""/><p>Chat With Us</p></a></li>
        </ul>
      </div>
      <header>
        <div className="header-desktop">
            <div className="container">
                <div className="top-header">
                    <div className='menu-icon'>
                        <MenuIcon onClick={open}/>
                        <div className='hidden' ref={Hamburgur}>
                            <CloseIcon onClick={closed}/>
                            <img className='site-Logo-sidebar' src={siteLogo} alt="" />
                            <div className='menu-option'>
                                <li onClick={closed}><Link to="/">Home</Link></li>
                                <li onClick={closed}><Link to="collections/wallets">Wallets</Link></li>
                                <li onClick={closed}><Link to="collections/glasses">Glasses</Link></li>
                                <li onClick={closed}><Link to="collections/rings">Rings</Link></li>
                                <li onClick={closed}><Link to="collections/shoes">Shoes</Link></li>
                            </div>
                        </div>
                    </div>
                    <div className="left-menu">
                        <ul className="left-menu-option">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="collections/wallets">Wallets</Link></li>
                            <li><Link to="collections/glasses">Glasses</Link></li>
                            <li><Link to="collections/rings">Rings</Link></li>
                            <li><Link to="collections/shoes">Shoes</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="icon">
                    <img src={siteLogo} alt=""/>
                </div>
                <div className="right-menu">
                    <button onClick={searchProduct} className = "right-menu-btn"><SearchIcon/></button>
                    <Link to="/login"><button className = "right-menu-btn"><PersonOutlineOutlinedIcon/></button></Link>
                    <Link to="/cart"><button className = "right-menu-btn"><LocalGroceryStoreOutlinedIcon/></button></Link>
                    <sup>{noOfItems}</sup>
                </div>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Header
