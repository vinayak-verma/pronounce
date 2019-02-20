import React, { Component } from 'react';
import './App.css';
import Register from './Components/Register';
import Database from './Components/Database';
//import Homepage from './Components/Hompage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      container: [],
    }
    this.registerMode = this.registerMode.bind(this);
  }
  componentDidMount = () => {
    this.database = [];
    this.database
      .push(<Database registerMode={this.registerMode} />);
      this.setState({
        container: this.database,
      });
    this.registerPage = [];
    this.registerPage.push(<Register />);
    }
  registerMode = () => {
    this.setState({
      container: this.registerPage,
    });
  }
  render() {
    return (<div>{this.state.container}</div>);
  }
}

export default App;
