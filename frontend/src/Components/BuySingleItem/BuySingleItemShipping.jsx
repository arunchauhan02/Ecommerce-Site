import React, { useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {saveShippingInfo} from "../../actions/CartActions";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HouseIcon from '@mui/icons-material/House';
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import PinDropIcon from "@material-ui/icons/PinDrop";
import Metadata from "../Layout/Metadata";
import { Country,State } from 'country-state-city';
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import "../../Styles/Shipping.css";
import CheckOutSteps from "../Cart/CheckOutSteps.jsx"
import {useNavigate} from "react-router-dom";

const BuySingleItem = () => {
    const dispatch = useDispatch();
    const  {shippingInfo} = useSelector(state=>state.BuySingleItem);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const shippingSubmit = (e)=>{
        e.preventDefault();
        if(phoneNo.length<10 || phoneNo.length>10){
            return ;
        }
        dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
        navigate("/buysingleitem/shipping/order/confirm")
    }

  return (
    <>
    <Metadata title={"Shipping Details"}/>
    <CheckOutSteps activeSteps={0}/>
    <div className="shippingContainer">
        <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form onSubmit={shippingSubmit} encType='multipart/form-data' className='shippingForm'>
                <div>
                    <HouseIcon/>
                    <input type="text" placeholder='Address' required value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                </div>
                <div>
                    <LocationCityIcon/>
                    <input type="text" placeholder='city' required value={city} onChange={(e)=>{setCity(e.target.value)}} />
                </div>
                 <div>
                    <PinDropIcon/>
                    <input type="text" placeholder='pinCode' required value={pinCode} onChange={(e)=>{setPinCode(e.target.value)}} />
                </div>
                <div>
                    <PhoneIcon/>
                    <input type="text" placeholder='Phone No.' value={phoneNo} required onChange={(e)=>{setPhoneNo(e.target.value)}} />
                </div>
                <div>
                    <PublicIcon/>
                    <select name="" value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="">Country</option>
                        {Country && Country.getAllCountries().map((item)=>{
                            return <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                            </option>
                        })}
                    </select>
                </div>
                {country && <div>
                        <TransferWithinAStationIcon/>
                        <select value={state} required onChange={(e)=>{setState(e.target.value)}} id="">
                            <option value="">State</option>
                            {
                                State && State.getStatesOfCountry(country).map((item)=>{
                                    return <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                }
                <input type="submit" value="Continue" className='shippingBtn'  />

            </form>
        </div>
    </div>
    </>
  )
}

export default BuySingleItem;
