import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./MainContent.css";
import SearchFlights from "../SearchFlights/SearchFlights";
import paris from "../../images/paris.PNG";
import canary from "../../images/canary islands.PNG";
import katowice from "../../images/katowice.PNG";
import Cards from "../Cards/Cards";
import flightMap from "../../images/flightMap.PNG";
import flyTogether from "../../images/flyTogether.jpg";
import backgroundSea from "../../images/maincontentBackgroundSea.jpg";

import InfoCarousel from "../InfoCarousel/InfoCarousel";
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picSelected: 0,
    };
  }

  handleGetPicture = (number) => {
    if (number == 0) {
      return backgroundSea;
    } else if (number == 1) {
      return flyTogether;
    } else if (number == 2) {
      return flightMap;
    }
  };
  handlePicChange = (number) => {
    this.setState({ picSelected: number });
    //   alert(number)
  };
  render() {
    return (
      <div>
        <div
          className="mainContent"
          style={{
            backgroundImage:
              "url(" + this.handleGetPicture(this.state.picSelected) + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <Grid container>
            <Grid item sm={1}></Grid>
            <Grid item sm={5} xs={12}>
              <br />
              <br />
              <br />
              <SearchFlights />
            </Grid>
            {/* <Grid item sm={1}></Grid>                       */}
            <Grid item sm={6} xs={12}>
              {/* <img className="smallerPics" src={paris}/>
                            <img className="smallerPics" src={canary}/>
                            <img className="smallerPics" src={katowice}/> */}
              <div className="" style={{marginTop:"250px"}}>
                <InfoCarousel onSelectPic={this.handlePicChange} />
              </div>
            </Grid>
            {/* <Grid item sm={1}></Grid>   */}
          </Grid>
        </div>
      </div>
    );
  }
}

export default MainContent;
