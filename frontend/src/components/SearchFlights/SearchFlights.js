import React, { Component } from "react";
import "./SearchFlights.css";
import { Link, Redirect } from "react-router-dom";
import FlightService from "../../services/FlightService";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

class SearchFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectJustOrigin: false,
      redirectAllData: false,
      redirectOrigDest: false,
      origin: "",
      destination: "",
      departure: "",
      flights: [],
    };
  }

  handleOriginChange = (e) => {
    this.setState({ origin: e.target.value });
  };
  handleDestinationChange = (e) => {
    this.setState({ destination: e.target.value });
  };
  handleDepartureChange = (e) => {
    this.setState({ departure: e.target.value });
  };
  handleSearch = () => {
    FlightService.getFlightByOrigin(this.state.origin).then((response) => {
      this.setState({ flights: response.data });
    });
  };
  handleSearchAllData = () => {
    FlightService.getAllFlights().then((response) => {
      this.setState({ flights: response.data });
    });
  };

  SubmitSearch = () => {
    if (this.state.origin) {
      if (this.state.destination) {
        if (this.state.departure) {
          this.setState({ redirectAllData: true });
        } else this.setState({ redirectOrigDest: true });
      } else {
        this.setState({ redirectJustOrigin: true });
      }
    } else {
      alert("please fill at least origin");
    }
    return Promise.resolve(0);
  };
  render() {
    const infoSearch =
      "Search by multiple criterias:\n Enter just origin \n Enter origin and destination \n Enter origin,destination and departure date";

    return (
      <div>
        {this.state.redirectJustOrigin ? (
          <Redirect push to={"/flights/" + this.state.origin} />
        ) : null}
        {this.state.redirectOrigDest ? (
          <Redirect
            push
            to={"/flights/" + this.state.origin + "/" + this.state.destination}
          />
        ) : null}
        {this.state.redirectAllData ? (
          <Redirect
            push
            to={
              "/flights/" +
              this.state.origin +
              "/" +
              this.state.destination +
              "/" +
              this.state.departure
            }
          />
        ) : null}
        <div className="encapsulate container">
          <div>
            Search flights
            <Tooltip
              title={
                <span style={{ whiteSpace: "pre-line" }}>{infoSearch}</span>
              }
            >
              <InfoIcon />
            </Tooltip>
          </div>
          <form className="formCapsule">
            <div class="form-group">
              <input
                type="text"
                class="form-control changed"
                placeholder="Flight Origin"
                onChange={this.handleOriginChange}
              />
              <input
                type="text"
                class="form-control changed"
                placeholder="Flight Destination"
                onChange={this.handleDestinationChange}
              />
            </div>
            <div>
              <label className="spaceOut">Departure</label>
              {/* <label className="spaceOut">Return?</label> */}
            </div>
            <div>
              <input
                class="form-control"
                type="date"
                id="example-date-input"
                onChange={this.handleDepartureChange}
              ></input>
              {/* <input
                class="form-control dateFormat"
                type="date"
                id="example-date-input"
              ></input> */}
            </div>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                this.SubmitSearch().then((promise) => {
                  try {
                    this.props.onCloseClick();
                  } catch {}
                });
              }}
            >
              Search
            </button>
            {this.props.hasCloseButton && (
              <button
                type="button"
                class="btn btn-danger"
                onClick={this.props.onCloseClick}
              >
                Close
              </button>
            )}
            {/* <Link
              to={{
                pathname: "/flights/" + this.state.origin,
                state: {
                  flights: this.state.flights,
                },
              }}
               onClick={this.handleSearchAllData}
            >
              search
            </Link> */}
            {/* <Link to="/flights">Goto all flights</Link> */}
            {/* <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleSearch}
            >
              Search
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default SearchFlights;
