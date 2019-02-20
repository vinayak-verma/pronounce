import React, { Component } from 'react';
import '../../Styles/HomepageSection1.css';
import { Link } from 'react-router-dom';

export default class HomepageSection1 extends Component {
  render() {
    return (
      <div className='HomepageSection1'>
        <h1 className='HomepageSection1-h1'>Address Students<br />Better</h1>
        <p className='briefParagraph'>Learn to pronounce students' names easily and effectively.</p>
        <Link to='/login'>
          <button type="button" className="btn btn-success HomepageSection1-GoToNameHubButton">Go to Database</button>
        </Link>
        {/*<button type="button" className="btn btn-warning HomepageSection1-exploreButton">Explore ↓</button>*/}
      </div>
    );
  }
}
