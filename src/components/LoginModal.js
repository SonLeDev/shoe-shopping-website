import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  authStoreLoginInformation,
  authLoginWithEmailAndPassword,
} from '../actions';
import {
  INPUT_EMAIL,
  INPUT_PASSWORD,
  INPUT_CONFIRM_PASSWORD
} from '../constants';
import Dots from 'react-activity/lib/Dots';
import 'react-activity/lib/Dots/Dots.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false,
      signingUp: false,
    };
  }

  handleInputAuth(input, type) {
    this.props.authStoreLoginInformation(input, type);
  }

  handleClickSignUp() {
    // In case when user click 2 times consecutive sign up
    if (!this.state.signingUp) {
      this.setState({ showConfirm: true, signingUp: true });
    } else {
      console.log("TODO: On click sign up")
    }
  }

  handleClickSignIn() {
    this.props.authLoginWithEmailAndPassword(this.props.inputEmail, this.props.inputPassword);
  }

  renderSignUp() {
    if (this.state.showConfirm) {
      return (
        <div className="form-group animated fadeInDown fast">
          <input
            type="password"
            id="inputConfirmPassword"
            autoComplete="off"
            className="form-control rounded-pill text-center simple-input"
            placeholder="confirm password"
            value={this.props.inputConfirmPassword}
            onChange={(input) => this.handleInputAuth(input.target.value, INPUT_CONFIRM_PASSWORD)}
          />
        </div>
      );
    }
  }

  renderSignIn() {
    if (!this.state.showConfirm) {
      return (
        <button
          type="button"
          className="btn btn-primary w-100 rounded-pill my-2 mx-0 animated fadeInUp fast"
          onClick={() => this.handleClickSignIn()}
        >
          Sign In
        </button>
      );
    }
  }

  renderBackToSignIn() {
    if (this.state.showConfirm) {
      return (
        <button
          type="button"
          className="btn btn-primary w-100 rounded-pill my-2 mx-0 animated fadeInUp fast"
          onClick={() => this.setState({ showConfirm: false, signingUp: false })}
        >
          <i className="fas fa-chevron-left"></i> Back To Sign In
        </button>
      );
    }
  }

  renderNotification() {
    if (this.props.isSignInSuccessfully === false) {
      return (
        <div className="text-center animated shake fast">
          <p className="login-notification-text">Unsuccesful attempt to sign in</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content login-modal">
            <div className="modal-header">
              <h5 className="modal-title open-sans">Login</h5>
              <button type="button" className="btn" data-dismiss="modal" id="close-login-btn"><i className="fas fa-times"></i></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    id="inputEmail"
                    autoComplete="off"
                    className="form-control rounded-pill text-center simple-input"
                    placeholder="username@example.com"
                    disabled={this.props.isSigningIn}
                    value={this.props.inputEmail}
                    onChange={(input) => this.handleInputAuth(input.target.value, INPUT_EMAIL)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="inputPassword"
                    autoComplete="off"
                    className="form-control rounded-pill text-center simple-input"
                    placeholder="password"
                    disabled={this.props.isSigningIn}
                    value={this.props.inputPassword}
                    onChange={(input) => this.handleInputAuth(input.target.value, INPUT_PASSWORD)}
                  />
                </div>
                {this.renderSignUp()}
                <div className="modal-footer text-center d-block">
                  {this.renderNotification()}
                  <Dots
                    size={31}
                    color={"#313131"}
                    animating={this.props.isSigningIn}
                    className="my-3"
                  />
                  {this.renderSignIn()}
                  <button
                    type="button"
                    className="btn btn-primary w-100 rounded-pill mx-0 my-2"
                    onClick={() => this.handleClickSignUp()}
                  >
                    Sign Up
                  </button>
                  {this.renderBackToSignIn()}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ShoeReducers }) => {
  // Add validation for email, pwd and confirm pwd
  const checkValidateItems = ["inputEmail", "inputPassword", "inputConfirmPassword"]

  checkValidateItems.forEach((item) => {
    let selectItem = document.querySelector('#' + item);
    if (selectItem !== null) {
      selectItem.classList.remove("is-valid", "is-invalid");
      if (ShoeReducers["isValid" + item] === true) {
        selectItem.classList.remove("is-invalid");
        selectItem.classList.add("is-valid");
      } else if (ShoeReducers["isValid" + item] === false) {
        selectItem.classList.remove("is-valid");
        selectItem.classList.add("is-invalid");
      }
    }
  });

  // Close login modal after successfully sign in
  if (ShoeReducers.isSignInSuccessfully) {
    document.querySelector("#close-login-btn").click();
  }

  // Return state to props
  return {
    inputEmail: ShoeReducers.inputEmail,
    inputPassword: ShoeReducers.inputPassword,
    inputConfirmPassword: ShoeReducers.inputConfirmPassword,
    isSigningIn: ShoeReducers.isSigningIn,
    isSignInSuccessfully: ShoeReducers.isSignInSuccessfully
  }
}

export default connect(mapStateToProps, {
  authStoreLoginInformation,
  authLoginWithEmailAndPassword
})(LoginModal)

//TODO: After login succesfully change the button sign into name or show the personal information
//TODO: When fail login first, reopen the modal wont show again notification
//TODO: Remove outline default of bootstrap
