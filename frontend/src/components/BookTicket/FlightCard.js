import React, { useState } from "react";
import "./FlightCard.css";

function FlightCard(props) {
  const [flight, setFlight] = useState(props.flight);

  return (
    <div className="container">
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <div class="my-0 font-weight-normal titleFont">
            <div className="row justify-content-center">
              {" "}
              <i style={{ float: "left" }}>{flight.departureDate}</i>
            </div>
            <i class="fas fa-plane-departure" style={{ float: "left" }}></i>

            {flight.origin}
            <i
              class="fa fa-long-arrow-right arrowMargin"
              aria-hidden="true"
            ></i>
            {flight.destination}
            <i class="fas fa-plane-arrival" style={{ float: "right" }}></i>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title origDestFont ">
            {/* $0 <small class="text-muted">asas/ mo</small> */}

            {flight.departureTime.slice(0, -3)}
            <small class="text-muted"> --- </small>
            <small class="text-muted"> {flight.duration}h </small>
            {/* <i class="fa fa-plane withMargin" aria-hidden="true"></i>{" "} */}
            <small class="text-muted"> ---> </small>
            {flight.arrivalTime.slice(0, -3)}
          </div>
          <h1 class="card-title origDestFont">
            <div class="inline" style={{ float: "left" }}>
              Cost
            </div>
            -
            <div class="inline" style={{ float: "right" }}>
              {flight.price} EUR
            </div>
          </h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Granted for free:</li>
            <li>Carry on bag space</li>
            <li>Online check-in</li>
          </ul>
          <button
            type="button"
            data-test="fare-upsell-button"
            class="fare-upsell-button"
          >
            <div class="fare-upsell-title">Upgrade to premium</div>
            {/* <div class="fare-upsell-price"> for +‎€52.80 </div> */}
          </button>
          {/* <button
              type="button"
              class="btn btn-lg btn-block btn-outline-primary"
            >
              Sign up for free
            </button> */}
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
