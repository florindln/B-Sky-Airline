import React, { Component } from "react";
import MainContent from "../../MainContent/MainContent";
import Cards from '../../Cards/Cards'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
       
        <MainContent />
        <Cards />
      </div>
    );
  }
}

export default HomePage;
