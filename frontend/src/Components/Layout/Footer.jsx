import React from 'react'
import "../../Styles/Footer.css"
import mail from "../../assets/icons/mail-logo.png"
import siteLogo from "../../assets/icons/SiteLogo.jpeg"  
const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-section">
            <div className="address-email">
                <p>House No. :- D-35, Gali No. :- 9,Surya Colony, Sehatput Faridabad, <br/>Chetan Market </p>
                <a className="mail" href="https://www.youtube.com/watch?v=fFHyqhmnVfshttps://www.google.com"><img className = "mail-logo" src={mail} alt=""/><h4>arunchauhan1102@gmail.com</h4></a>
                <a className="call-us" href="https://www.youtube.com/watch?v=fFHyqhmnVfshttps://www.google.com"><h4>Call us: 9310100258</h4></a>            </div>
            <div className="aboutus-information">
                <div className="toalign">
                    <h3>Information</h3>
                    <ul>
                        <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>Our Story</p></a></li>
                        <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs">Blog</a></li>
                        <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs">Bulk Order</a></li>
                    </ul>
                </div>
            </div>
            <div className="shopping-policies">
                <h3>Shopping policies</h3>
                <ul className="remove-list-decor">
                    <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>Terms and conditions</p></a></li>
                    <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>shipping policies</p></a></li>
                    <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>Privacy policy</p></a></li>
                    <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>Return Policy</p></a></li>
                    <li><a href="https://www.youtube.com/watch?v=fFHyqhmnVfs"><p>Refund Policy</p></a></li>
                </ul>
            </div>
        </div>
        <hr className="btw-line"/>
        <section>
            <div className="footer-end">
                <div className='footer-logo'>
                    <img src={siteLogo} alt="" />
                </div>
                <p>
                    &copy; OnlyMen | All rights reserved
                </p>
            </div>
        </section>

    </footer>
    </div>
  )
}

export default Footer
