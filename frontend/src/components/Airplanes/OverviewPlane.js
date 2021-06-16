import React, { Component } from "react";
import DetailedPlane from "./DetailedPlane";


class OverviewPlane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // imageUrl: "https://picsum.photos/300",
      imageUrl:"../../images/"+this.props.airplane.imageUrl ,
      showDetails: false,
    };
   

  }
  handleShowDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

 

  render() {    
    return (
      <div>
        <div className="div_container">         
          <img src={process.env.PUBLIC_URL+"/images/"+this.props.airplane.imageUrl} style={{ maxHeight: "300px" }}></img>
          <h3>
            {this.props.airplane.brand} {this.props.airplane.model}
          </h3>
          <button
            type="button"
            class="btn btn-outline-info"
            onClick={this.handleShowDetails}
          >
            More details
          </button>
          {this.state.showDetails ? (
            <div className="changePosition">
              <DetailedPlane
                airplane={this.props.airplane}
                onShowDetails={this.handleShowDetails}
              />
            </div>
          ) : null}
          <br />
        </div>
      </div>
    );
  }
}

export default OverviewPlane;
