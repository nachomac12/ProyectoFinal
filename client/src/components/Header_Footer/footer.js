import React from 'react';
import { 
    FaInstagram, 
    FaFacebook, 
    FaTwitter, 
} from 'react-icons/fa';
import LocationOn from '@material-ui/icons/LocationOn';
import ContactPhone from '@material-ui/icons/ContactPhone';
import WatchLater from '@material-ui/icons/WatchLater';
import ContactMail from '@material-ui/icons/ContactMail';
import QRCode from 'qrcode.react';
import Map from '../Utilidades/map';

const Footer = () => {
    return (
        <div className="container-fluid bg-info text-white">
            <div className="LogoFooter text-center p-2">redemplear</div>
            <hr className="my-auto flex-grow-1" style={{borderColor: "white"}} />
            <div className="row mt-2 text-center"> 
                <div className="col-md mt-1">
                    <div><LocationOn fontSize="large" style={{marginRight: '5px'}}/> La Plata, 1900</div>
                    <br/>
                    <div><ContactPhone fontSize="large" style={{marginRight: '5px'}}/> 221-3131311</div>
                </div>
                    
                <div className="col-md mt-1"> 
                    <div><WatchLater fontSize="large" style={{marginRight: '5px'}}/> Lu/Vie 08:00-18:00</div>
                    <br/>
                    <div><ContactMail fontSize="large" style={{marginRight: '5px'}}/> redemplear@gmail.com</div>
                </div>

                <div className="col-md mt-1">
                    <ul style={{listStyle: "none"}}>
                        <li><FaInstagram size="1.5em"/> redemplear</li>
                        <li className="mt-1"><FaTwitter size="1.5em"/> redemplear</li>
                        <li className="mt-1"><FaFacebook size="1.5em"/> redemplear</li>
                    </ul>
                </div>

                <div className="col-md mt-1">
                    <div style={{margin: 'auto'}}>
                        <QRCode value="https://aqueous-beach-90166.herokuapp.com/" />
                    </div> 
                </div>
            </div>
            <p className="text-center p-3">© Copyright SamaProject Development</p>
        </div>
    )
}

export default Footer;