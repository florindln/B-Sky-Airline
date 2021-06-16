import React, { Component } from "react";
import AirplaneService from "../../../../services/AirplaneService"


class UpdateAirplane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      model: "",
      topSpeed: "",
      fuelConsumptionPer100Km: "",
      brand: "",
      maxCapacity: "",      
      description: "",
      imageUrl: "",
    };
    this.changeimageUrlHandler = this.changeimageUrlHandler.bind(this);
    this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
    this.changemodelHandler = this.changemodelHandler.bind(this);
    this.changetopSpeedHandler = this.changetopSpeedHandler.bind(this);
    this.changefuelConsumptionPer100KmHandler = this.changefuelConsumptionPer100KmHandler.bind(this);
    this.changemaxCapacityHandler = this.changemaxCapacityHandler.bind(this);
    this.changebrandHandler = this.changebrandHandler.bind(this);
    this.updateAirplane = this.updateAirplane.bind(this);
  }

  componentDidMount() {
    AirplaneService.getPlaneById(this.state.id).then((res) => {
      let airplane = res.data;
      this.setState({
        model: airplane.model,
        topSpeed: airplane.topSpeed,
        fuelConsumptionPer100Km: airplane.fuelConsumptionPer100Km,
        maxCapacity: airplane.maxCapacity,
        brand: airplane.brand,
        description: airplane.description,
        imageUrl: airplane.imageUrl,
      });
    });
  }

  updateAirplane = (e) => {
    e.preventDefault();
    let airplane = {
        brand: this.state.brand,
        model: this.state.model,
        topSpeed: this.state.topSpeed,
        fuelConsumptionPer100Km: this.state.fuelConsumptionPer100Km,
        maxCapacity: this.state.maxCapacity,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      };
    // console.log("Airplane =>" + JSON.stringify(Airplane));

    AirplaneService.updatePlaneById(this.state.id,airplane).then((response)=>{
        this.props.history.push("/airplane/admin")
    })
  };

  changeimageUrlHandler = (event) => {
    this.setState({ imageUrl: event.target.value });
  };

  changedescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changemodelHandler = (event) => {
    this.setState({ model: event.target.value });
  };

  changetopSpeedHandler = (event) => {
    this.setState({ topSpeed: event.target.value });
  };

  changefuelConsumptionPer100KmHandler = (event) => {
    this.setState({ fuelConsumptionPer100Km: event.target.value });
  };

  changemaxCapacityHandler = (event) => {
    this.setState({ maxCapacity: event.target.value });
  };

  changebrandHandler = (event) => {
    this.setState({ brand: event.target.value });
  };

  cancel() {
    this.props.history.push("/airplane/admin");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 ">
            <h2 className="text-center">Update Airplane</h2>
            <div className="card-body">
            <form>
                  <div className="form-group">
                    <label>Brand:</label>
                    <input
                      name="brand"
                      className="form-control textbox"
                      value={this.state.brand}
                      onChange={this.changebrandHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Model:</label>
                    <input
                      name="model"
                      className="form-control textbox"
                      value={this.state.model}
                      onChange={this.changemodelHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Top speed:</label>
                    <input
                      name="Top speed"
                      className="form-control textbox"
                      value={this.state.topSpeed}
                      onChange={this.changetopSpeedHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Fuel consumption:</label>
                    <input
                      //   type="phone"
                      name="fuelConsumptionPer100Km"
                      className="form-control textbox"
                      value={this.state.fuelConsumptionPer100Km}
                      onChange={this.changefuelConsumptionPer100KmHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Max capacity:</label>
                    <input
                      // type="email"
                      name="maxCapacity"
                      className="form-control textbox"
                      value={this.state.maxCapacity}
                      onChange={this.changemaxCapacityHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      name="description"
                      className="form-control textbox"
                      value={this.state.description}
                      onChange={this.changedescriptionHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Image Url:</label>
                    <input
                      name="imageUrl"
                      className="form-control textbox"
                      value={this.state.imageUrl}
                      onChange={this.changeimageUrlHandler}
                    />
                  </div>
                <button
                  className="btn btn-success"
                  onClick={this.updateAirplane}
                >
                  Save
                </button>

                <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateAirplane;
