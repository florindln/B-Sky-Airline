import React, { Component } from "react";
import FlightService from "../../../../services/FlightService"


class UpdateFlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      departureDate: "",
      departureTime: "",
      arrivalTime: "",
      origin: "",
      destination: "",      
      price: "",
      airplaneId: "",
    };
    this.changepriceHandler = this.changepriceHandler.bind(this);
    this.changedepartureDateHandler = this.changedepartureDateHandler.bind(this);
    this.changedepartureTimeHandler = this.changedepartureTimeHandler.bind(this);
    this.changearrivalTimeHandler = this.changearrivalTimeHandler.bind(this);
    this.changedestinationHandler = this.changedestinationHandler.bind(this);
    this.changeoriginHandler = this.changeoriginHandler.bind(this);
    this.UpdateFlight = this.UpdateFlight.bind(this);
  }

  componentDidMount() {
    FlightService.getFlightById(this.state.id).then((res) => {
      let flight = res.data;
      this.setState({
        departureDate: flight.departureDate,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        destination: flight.destination,
        origin: flight.origin,
        price: flight.price,
        destination: flight.destination,
        airplaneId:flight.airplanePicked.airplaneId
      });
    });
  }

  UpdateFlight = (e) => {
    e.preventDefault();
    let flight = {
        origin: this.state.origin,
        departureDate: this.state.departureDate,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime,
        destination: this.state.destination,
        price: this.state.price,
        airplaneId: this.state.airplaneId,
      };
    // console.log("flight =>" + JSON.stringify(flight));

    FlightService.updateFlightById(this.state.id,flight).then((response)=>{
        console.log(response);
        this.props.history.push("/flight/admin")
    })
  };

//   changedestinationHandler = (event) => {
//     this.setState({ destination: event.target.value });
//   };

  changepriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };

  changedepartureDateHandler = (event) => {
    this.setState({ departureDate: event.target.value });
  };

  changedepartureTimeHandler = (event) => {
    this.setState({ departureTime: event.target.value });
  };

  changearrivalTimeHandler = (event) => {
    this.setState({ arrivalTime: event.target.value });
  };

  changedestinationHandler = (event) => {
    this.setState({ destination: event.target.value });
  };

  changeoriginHandler = (event) => {
    this.setState({ origin: event.target.value });
  };

  cancel() {
    this.props.history.push("/flight/admin");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 ">
            <h2 className="text-center">Update Flight</h2>
            <div className="card-body">
            <form>
                  <div className="form-group">
                    <label>Origin:</label>
                    <input
                      name="origin"
                      className="form-control textbox"
                      value={this.state.origin}
                      onChange={this.changeoriginHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Destination:</label>
                    <input
                      // type="email"
                      name="destination"
                      className="form-control textbox"
                      value={this.state.destination}
                      onChange={this.changedestinationHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>DepartureDate:</label>
                    <input
                      name="departureDate"
                      className="form-control textbox"
                      value={this.state.departureDate}
                      onChange={this.changedepartureDateHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Departure time:</label>
                    <input
                      name="Departure time"
                      className="form-control textbox"
                      value={this.state.departureTime}
                      onChange={this.changedepartureTimeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Arrival time:</label>
                    <input
                      //   type="phone"
                      name="arrivalTime"
                      className="form-control textbox"
                      value={this.state.arrivalTime}
                      onChange={this.changearrivalTimeHandler}
                    />
                  </div>

                  

                  <div className="form-group">
                    <label>price:</label>
                    <input
                      name="price"
                      className="form-control textbox"
                      value={this.state.price}
                      onChange={this.changepriceHandler}
                    />
                  </div>

                  {/* <div className="form-group">
                    <label>Image Url:</label>
                    <input
                      name="destination"
                      className="form-control textbox"
                      value={this.state.destination}
                      onChange={this.changedestinationHandler}
                    />
                  </div> */}
                <button
                  className="btn btn-success"
                  onClick={this.UpdateFlight}
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

export default UpdateFlight;
