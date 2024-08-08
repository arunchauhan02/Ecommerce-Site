import React,{Fragment,useState,useEffect} from 'react'
import Metadata from '../Layout/Metadata'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import { ClearErros, createProduct } from '../../actions/ProductAction';
import "./NewProduct.css"
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstant1';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import Dashboard from '@material-ui/icons/Dashboard';

const NewProduct = () => {


    const dispatch = useDispatch();
    const { loading,error, success } = useSelector((state) => state.NewProduct);

    const navigate  = useNavigate();


    const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [discount, setdiscount]  = useState(0);


  const categories = [
    "gods",
    "vintages",
    "decor",
    "pandents",
    "combos",
    "dashboard"
  ];

  useEffect(() => {
    if (error) {
      dispatch(ClearErros());
    }

    if (success) {
      toast('New Product Added Successfully');
      navigate("/admin/dashboard")
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);

    });
  };


    const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", Stock);
        myForm.set("discount",discount);
        
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
      };

  return (
    <div>
      <Fragment>
      <Metadata title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <DiscountOutlinedIcon/>
              <input type="number"
              placeholder='Discount'
              required 
              onChange={(e)=>{setdiscount(e.target.value)}} />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
    </div>
  )
}

export default NewProduct
