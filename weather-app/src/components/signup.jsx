import React, { Component } from "react";
import { Link } from "react-router-dom";
import sig_css from "../styles/signup.module.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  deleteUser
} from "firebase/auth";
import app from "../firebase/config";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import Google from "../assets/google.svg";

class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      Rpassword: "",
      birth: "",
      address: "",
      city: "",
    };
  }
  writeUserData() {
    let userId = uuidv4();
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      username: this.state.fname + " " + this.state.lname,
      email: this.state.email,
      birth: this.state.birth,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.setState(
      {
        fname: event.target.fname.value,
        sname: event.target.sname.value,
        email: event.target.email.value,
        password: event.target.password.value,
        Rpassword: event.target.r_password.value,
        city: event.target.city.value,
        address: event.target.address.value,
        birth: event.target.birth.value,
        psdcolor: "black",
        message: "",
        emailcolor: "black",
      },
      function () {
        if (this.state.password == this.state.Rpassword) {
          if (this.state.password.length > 5) {
            const auth = getAuth(app);
            createUserWithEmailAndPassword(
              auth,
              this.state.email,
              this.state.password
            )
              .then(async (userCredential) => {
                // Signed in
                console.log(userCredential);
              

                // ...
                this.writeUserData();
                this.setState({ message: "successfully sign up " });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                if (
                  errorMessage == "Firebase: Error (auth/email-already-in-use)."
                ) {
                  this.setState({
                    emailcolor: "red",
                    message: "*Email Alredy Taken",
                  });
                  return;
                }
              });
          } else {
            this.setState({
              psdcolor: "red",
              message: "Password should be at least 6 characters",
            });
          }
        } else {
          this.setState({
            psdcolor: "red",
            message: "*Both password must be same",
          });
        }
        //setstat end
      }
    );
  };

  googlehandler = (e) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        this.setState({ message: "*Successfully Register" });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  render() {
    console.log(this.state.emailcolor);
    let passwordstyle = {
      borderColor: this.state.psdcolor,
    };
    let emailstyle = {
      borderColor: this.state.emailcolor,
    };
    console.log(this.state);
    return (
      <div className={sig_css.container}>
        <form onSubmit={this.submitHandler}>
          <h1>Sign Up</h1>
          <p
            style={{
              color: "red",
              fontStyle: "italic",
              fontFamily: "sans-serif",
            }}
          >
            {this.state.message}
          </p>
          <div className={sig_css.name}>
            <div>
              <label>F Name</label>
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label>L Name</label>
              <input type="text" name="sname" placeholder="Last Name" />
            </div>
          </div>
          <div className={sig_css.auth}>
            <div>
              <label>Email</label>
              <input
                type="email"
                style={emailstyle}
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                style={passwordstyle}
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label>R-password</label>
              <input
                type="password"
                style={passwordstyle}
                name="r_password"
                placeholder="Repeat Password"
              />
            </div>
            <div>
              <label>Birth</label>
              <input className={sig_css.birth} type="date" name="birth" required/>
            </div>
          </div>
          <div>
            <div>
              <label>Address</label>
              <input type="text" name="address" placeholder="Address"  required/>
            </div>
            <div>
              <label>City</label>
              <input type="text" name="city" placeholder="City"  required/>
            </div>
          </div>
          <button type="submit" name="button">
            Submit
          </button>
          <h2>OR</h2>
          <div className={sig_css.google} onClick={this.googlehandler}>
            <img src={Google} alt="Google" />
            <h3>Sign up via Google</h3>
          </div>
          <Link to={"/login"}>
            <h3>Login</h3>
          </Link>
        </form>
      </div>
    );
  }
}

export default signup;
