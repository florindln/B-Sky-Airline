import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import './LoginPage.css';
import { Link } from "react-router-dom";

import SignUp from '../../signInUp/SignUp';
import SignIn from '../../signInUp/SignIn';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true
        }
    }

    changeLogin = () => {
        this.setState({ isSignIn: !this.state.isSignIn })
    }


    

    render() {
        return (
          <div style={{padding:"4rem 0 4rem 0"}}>
            <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <div className="login">
                {this.state.isSignIn ? <SignIn /> : <SignUp />}

                <p></p>
                {this.state.isSignIn ? (
                  <div>
                    <div>No account?</div>
                    <div className="specialColorText" >
                      <Link to='/user/register' onClick={this.changeLogin}>Sign Up</Link>
                     {/* <p  onClick={this.changeLogin}>Sign Up </p> */}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Already have an account?</div>
                    <div className="specialColorText" >
                    <Link to='/login' onClick={this.changeLogin}>Sign Up</Link>
                      {/* <p  onClick={this.changeLogin}> Sign In</p> */}
                    </div>
                  </div>
                )}
              </div>
              <div></div>
            </Grid>
            <Grid item xs={3}></Grid>
            </Grid>
          </div>
        );
    }
}

export default LoginPage;