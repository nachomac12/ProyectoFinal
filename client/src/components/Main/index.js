import React, { Component } from 'react';
import Header from '../Header_Footer/header';
import Footer from '../Header_Footer/footer';
import './main.css';

class Main extends Component {
  render() {
    return (
      <div className="col-md">
        <Header />
        <div>
            {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Main;