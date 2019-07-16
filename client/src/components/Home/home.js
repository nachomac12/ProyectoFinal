import React, { Component } from 'react';
import Carousel from './carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PaperHomeList from './paper_home_list';

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop: 3}}>
          <Carousel/>
        </div>
        <div style={{paddingTop: 40, paddingBottom: 40, marginTop: 3, marginBottom: 3, backgroundColor: '#F0F0F0'}}>
          <PaperHomeList />
        </div>
      </div>
    )
  }
}

export default Home;