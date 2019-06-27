import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class Home extends Component {
  render() {
    return (
        <div className="container-fluid">
          <div className="mt-1 mb-1">
            <Carousel/>
          </div>
          {/* <div className="mt-2 mb-1">
            <img className="img-fluid" src='/images/fotolibu1.jpg' />
          </div> */}
        </div>
    )
  }
}

export default Home;