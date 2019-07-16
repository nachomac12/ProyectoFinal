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

const Footer = () => {
    const dia = new Date;
    var año = dia.getFullYear()
    return (
        <div className="container-fluid bg-white text-info">
            <hr className="my-auto flex-grow-1" style={{borderColor: "#CEECF5"}}/>
            <div className="LogoFooter text-center p-2">redemplear</div>
            <div className="row text-center mt-2" style={{float: 'none', margin: '0 auto'}}> 
                <div className="col-md mt-1">
                    <div><LocationOn fontSize="large"/> La Plata, 1900</div>
                    <br/>
                    <div><ContactPhone fontSize="large"/> 221-3131311</div>
                </div>
                    
                <div className="col-md mt-1"> 
                    <div><WatchLater fontSize="large"/> Lu/Vie 08:00-18:00</div>
                    <br/>
                    <div style={{marginLeft: '10%'}}><ContactMail fontSize="large"/> redemplear@gmail.com</div>
                </div>

                <div className="col-md mt-1">
                    <div><FaInstagram size="1.5em"/> redemplear</div> <br/>
                    <div><FaFacebook size="1.5em"/> redemplear</div> <br/>
                    <div><FaTwitter size="1.5em"/> redemplear</div> <br/>
                </div>

                <div className="col-md mt-1">
                    <div style={{margin: 'auto'}}>
                        <QRCode value="https://redemplear.herokuapp.com/" />
                    </div> 
                </div>
            </div>
            <p className="text-center p-3">© Copyright SamaProject Development {año}</p>
        </div>
    )
}

export default Footer;