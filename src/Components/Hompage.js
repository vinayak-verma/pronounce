import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Homepage Components/Header';
import HomepageSection from './Homepage Components/HomepageSection1';
class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HomepageSection />
      </div>
    );
  }
}

export default Homepage;














