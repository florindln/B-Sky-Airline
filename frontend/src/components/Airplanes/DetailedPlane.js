import React, { Component } from "react";

class DetailedPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="container popup">
        {/* <h1>Image here:{this.props.airplane.imageUrl}</h1> */}
        <img src={process.env.PUBLIC_URL+"/images/"+this.props.airplane.imageUrl} style={{maxWidth:300}}/>
        <h3>Brand: {this.props.airplane.brand}</h3>
        <h3>Model: {this.props.airplane.model}</h3>
        <h3>Top speed: {this.props.airplane.topSpeed} KM/H</h3>
        <h3>Passenger capacity: {this.props.airplane.maxCapacity}</h3>
        <h3>
          Average fuel consumption for 100KM:{" "}
          {this.props.airplane.fuelConsumptionPer100Km} litres
        </h3>
        <h3>Description:</h3>
        <p> {this.props.airplane.description}</p>
        <button
          type="button"
          class="btn btn-outline-danger"
          onClick={this.props.onShowDetails}
        >
          Close
        </button>
      </div>
    );
  }
}

export default DetailedPlane;
