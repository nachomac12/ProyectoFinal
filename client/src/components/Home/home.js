import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class Home extends Component {
  render() {
    return (
      <div className="fluid">
        <div className="mt-1 mb-1">
          <Carousel/>
        </div>
      </div>
    )
  }
}

export default Home;