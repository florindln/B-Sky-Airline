import React, { Component } from "react";
import AirplaneService from "../../../../services/AirplaneService";

class AdminAirplanePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airplanes: [],
      model: "",
      topSpeed: "",
      fuelConsumptionPer100Km: "",
      brand: "",
      maxCapacity: "",
      isAscending: false,
      description: "",
      imageUrl: "",
    };

    this.changeimageUrlHandler = this.changeimageUrlHandler.bind(this);
    this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
    this.changemodelHandler = this.changemodelHandler.bind(this);
    this.changetopSpeedHandler = this.changetopSpeedHandler.bind(this);
    this.changefuelConsumptionPer100KmHandler = this.changefuelConsumptionPer100KmHandler.bind(
      this
    );
    this.changemaxCapacityHandler = this.changemaxCapacityHandler.bind(this);
    this.changebrandHandler = this.changebrandHandler.bind(this);
    this.saveairplanes = this.saveairplanes.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);

    this.sortBy = this.sortBy.bind(this);
  }

  saveairplanes = (e) => {
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
    AirplaneService.createPlane(airplane);
    this.setState({
      model: "",
      topSpeed: "",
      fuelConsumptionPer100Km: "",
      maxCapacity: "",
      brand: "",
      description: "",
      imageUrl: "",
    });
    window.location.reload(true);
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

  deleteRecord(id) {
    AirplaneService.deletePlane(id).then((res) => {
      this.setState({
        airplanes: this.state.airplanes.filter(
          (airplane) => airplane.airplaneId !== id
        ),
      });
    });
  }

  componentDidMount() {
    AirplaneService.getAllPlanes().then((response) => {
      this.setState({ airplanes: response.data });
    });
  }

  editRecord(id) {
    this.props.history.push(`/airplane/admin/edit/${id}`);
  }

  addRecord() {
    this.props.history.push("/add-record");
  }

  sortBy(key) {
    var variable = this.state.airplanes.sort();
    console.log(variable);

    if (this.state.isAscending) {
      this.setState({
        airplanes: this.state.airplanes.sort((a, b) =>
          a[key] < b[key] ? 1 : -1
        ),
      });
      this.setState({
        isAscending: false,
      });
    } else {
      this.setState({
        airplanes: this.state.airplanes.sort((a, b) =>
          a[key] > b[key] ? 1 : -1
        ),
      });
      this.setState({
        isAscending: true,
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Airplanes overview</h3>
          <table className="table table-striped table-borderless list-item-1">
            <thead>
              <tr>
                <th>Id</th>
                <th
                  onClick={() => {
                    this.sortBy("brand");
                  }}
                >
                  {" "}
                  Brand{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("model");
                  }}
                >
                  {" "}
                  Model{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("topSpeed");
                  }}
                >
                  {" "}
                  Top speed{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("fuelConsumptionPer100Km");
                  }}
                >
                  {" "}
                  Consumption/100km{" "}
                </th>
                <th
                  onClick={() => {
                    this.sortBy("maxCapacity");
                  }}
                >
                  {" "}
                  Max capacity{" "}
                </th>

                <th> Actions </th>
              </tr>
            </thead>

            <tbody>
              {this.state.airplanes.map((airplane) => (
                <tr key={airplane.airplaneId}>
                  <td>{airplane.airplaneId}</td>
                  <td>{airplane.brand}</td>
                  <td>{airplane.model}</td>
                  <td>{airplane.topSpeed}</td>
                  <td>{airplane.fuelConsumptionPer100Km}</td>
                  <td>{airplane.maxCapacity}</td>
                  <td className="action-column">
                    <button
                      style={{ width: "50px" }}
                      onClick={() => this.editRecord(airplane.airplaneId)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>

                    <button
                      style={{ marginLeft: "10px", width: "80px" }}
                      onClick={() => this.deleteRecord(airplane.airplaneId)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <div className="row">
              <div className="col">
                {" "}
                <h3>Add airplane</h3>
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
                      onClick={this.saveairplanes}
                    >
                      Add Airplane
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAirplanePage;
