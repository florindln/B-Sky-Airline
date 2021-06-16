import "./BookTicket.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AuthenticationService from "../../services/AuthenticationService";
import { Link, Redirect, useHistory } from "react-router-dom";
import UserService from "../../services/UserService";
import TicketService from "../../services/TicketService";
import FlightCard from "./FlightCard";
import FlightService from "../../services/FlightService";

function BookTicket(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return [
      "Review user and flight",
      "Choose seat and services",
      "Confirm and pay",
    ];
  }

  let history = useHistory();

  useEffect(() => {
    const role = AuthenticationService.getCurrentUserRole();
    // console.log(role);
    if (!role) {
      history.push("/login");
      // <Redirect push to={"/login"} />
    }
    const email = AuthenticationService.getCurrentUserEmail();
    UserService.getUserByEmail(email).then((response) => {
      setUser(response.data);
    });
  }, []);

  const handleSeatNrChange = (e) => {
    setSeatNr(e.target.value);
    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^\d+$/) || e.target.value>airplaneRows) {
        setSeatNrError(true);
      } else setSeatNrError(false);
    }
  };

  const handleSeatLetterChange = (e) => {
    setSeatLetter(e.target.value);
    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^[abcdef]$/)) {
        setSeatLetterError(true);
      } else setSeatLetterError(false);
    }
  };

  const handleCheckSeatAvailability = () => {
    if (!seatLetterError && !seatNrError) {
      const totalSeats = parseInt(flight.airplanePicked.maxCapacity); //equal to 17 rows
      const totalRows = parseInt(totalSeats / 6);

      setIsSeatAvailable(true);
      let chosenSeat;
      //add make api call to check if seat is available
      switch (seatLetter) {
        case "a":
          chosenSeat = parseInt(seatNr);
          break;
        case "b":
          chosenSeat = parseInt(seatNr) + totalRows;
          break;
        case "c":
          chosenSeat = parseInt(seatNr) + totalRows * 2;
          break;
        case "d":
          chosenSeat = parseInt(seatNr) + totalRows * 3;
          break;
        case "e":
          chosenSeat = parseInt(seatNr) + totalRows * 4;
          break;
        case "f":
          chosenSeat = parseInt(seatNr) + totalRows * 5;
          break;
        default:
          alert("error with seat logic");
      }
      TicketService.checkSeatAvailable(chosenSeat, flight.flightId).then(
        (res) => {
          setIsSeatAvailable(res.data);
        }
      );
      setseatNumberToSend(chosenSeat);
      setseatTextToSend(seatNr + " " + seatLetter);
    } else {
      setIsSeatAvailable(false);
    }
  };

  const handlePay = () => {
    if (parseFloat(user.budget) < parseFloat(flight.price)) {
      alert("Budget not enough to book this flight");
      return;
    }
    let bookTicketDTO = {
      seatNumber: seatNumberToSend,
      userId: user.userId,
      flightId: flight.flightId,
      seatText: seatTextToSend,
    };
    TicketService.bookTicket(bookTicketDTO);
    history.push("/profile");
    window.location.reload();
  };

  const handleCancel = () => {
    history.goBack()
  };

  const [seatTextToSend, setseatTextToSend] = useState("");
  const [user, setUser] = useState({});
  // const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [flight, setFlight] = useState(props.location.state.flightSent);
  const [seatNr, setSeatNr] = useState(0);
  const [seatNrError, setSeatNrError] = useState(true);
  const [seatLetter, setSeatLetter] = useState("");
  const [seatLetterError, setSeatLetterError] = useState(true);
  const [isSeatAvailable, setIsSeatAvailable] = useState(false);
  const [seatNumberToSend, setseatNumberToSend] = useState(666);
  const airplaneRows=parseInt(flight.airplanePicked.maxCapacity / 6);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <FlightCard flight={flight} />
          </div>
        );
      case 1:
        return (
          <div>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  {" "}
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/generalPlaneLayout.png"
                    }
                    alt="image here"
                  />
                </div>
                <div class="col-sm">
                  <h1>Select seat and extra services</h1>
                  <div className="container bg-light">
                    <div>
                      <h3>
                        Plane has rows 1-
                        {airplaneRows}{" "}
                      </h3>
                    </div>
                    <h3>Seat:</h3>
                    {seatNrError && <div>Seat number not correct</div>}
                    <div class="d-flex p-2 justify-content-center">
                      <div className="float-left">Row: </div>
                      <input
                        className="seatInput float-right"
                        type="text"
                        placeholder="Seat row"
                        onChange={handleSeatNrChange}
                      ></input>
                    </div>
                    {seatLetterError && <div>Seat letter not correct</div>}
                    <div class="d-flex p-2 justify-content-center">
                      {" "}
                      Letter:{" "}
                      <input
                        className="seatInput float-right"
                        type="text"
                        placeholder="Seat letter"
                        onChange={handleSeatLetterChange}
                      ></input>
                    </div>
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      onClick={handleCheckSeatAvailability}
                    >
                      Check Availablity
                    </button>
                    {!isSeatAvailable ? (
                      <div className="text-danger h2">Seat not available</div>
                    ) : (
                      <div className="text-success h2">Seat available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div class="container">
              <div class="row">
                <div class="col-sm border">
                  <h1>Billing Details</h1>
                  <div className="h3">User details</div>
                  <div className="d-flex justify-content-between">
                    <h4>
                      {user.firstName} {user.lastName} born in{" "}
                      {user.dateOfBirth}
                    </h4>
                    <div className="float-right">
                      <h4>Budget {user.budget} EUR</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm border">
                  <div className="h3">Flight details</div>
                  <div className="d-flex justify-content-between">
                    <h4>
                      {flight.origin} to {flight.destination}
                    </h4>

                    <div className="float-right">
                      <h4>Cost {flight.price} EUR</h4>
                    </div>
                  </div>
                  <div className="h3">Seat {seatNr + " " + seatLetter} </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm border">
                  <h1>Payment options</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <h1>Pay</h1>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={handlePay}
                  >
                    Pay
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 2 && !isSeatAvailable) {
      alert("Please choose a valid seat");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsSeatAvailable(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {handleReset()}
            {/* <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Reset" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTicket;
