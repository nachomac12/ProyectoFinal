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

const Footer = () => {
    return (
        <div className="bg-info text-white">
            <div className="LogoFooter text-center p-2">RedProf</div>
            <hr className="my-auto flex-grow-1" style={{borderColor: "white"}} />
            <div className="row">
                <div className="col m-2">
                    <div className="row">
                        <div className="col m-3" style={{alignItems: 'center', display: 'flex'}}>
                            <LocationOn fontSize="large" style={{marginRight: '5px'}}/> La Plata, 1900
                        </div>
                        <div className="col m-3" style={{alignItems: 'center', display: 'flex'}}>
                            <ContactPhone fontSize="large" style={{marginRight: '5px'}}/> 221-3131311
                        </div>
                        <div className="w-100"></div>
                        <div className="col m-3" style={{alignItems: 'center', display: 'flex'}}>
                            <WatchLater fontSize="large" style={{marginRight: '5px'}}/> Lu/Vie 08:00-18:00
                        </div>
                        <div className="col m-3" style={{alignItems: 'center', display: 'flex'}}>
                            <ContactMail fontSize="large" style={{marginRight: '5px'}}/> redprof@gmail.com
                        </div>
                    </div>
                </div>

                <div className="col m-2">
                    <ul className="mt-3" style={{listStyle: "none"}}>
                        <li className="mt-1"><FaInstagram size="1.5em"/> redprof</li>
                        <li className="mt-1"><FaTwitter size="1.5em"/> redprof</li>
                        <li className="mt-1"><FaFacebook size="1.5em"/> redprof</li>
                    </ul>
                </div>
            </div>
            <p className="text-center p-3">© Copyright SamaProject Development</p>
        </div>
    )
}

export default Footer;