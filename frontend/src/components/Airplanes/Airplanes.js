import React, { Component, useState } from "react";
import AirplaneService from "../../services/AirplaneService";
import "./Airplanes.css";
import logo from "../../images/profilePic.PNG";
import DetailedPlane from "./DetailedPlane";
import OverviewPlane from "./OverviewPlane";

class Airplanes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airplanes: [],
      showPopup: true,
      imgUrl: "https://picsum.photos/300",
    };
  }
  componentDidMount() {
    AirplaneService.getAllPlanes().then((response) => {
      console.log(response.data);
      this.setState({ airplanes: response.data });
    });
  }
  // togglePopup() {
  //   this.setState({
  //     showPopup: !this.state.showPopup,
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Our list of planes</h1>
        <br />
        <br />
        {this.state.airplanes.map((airplane) => (
          <OverviewPlane key={airplane.id} airplane={airplane} />
        ))}
      </div>
    );
  }
}

export default Airplanes;
