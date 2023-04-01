import React, { Component } from "react";
import { Link } from "react-router-dom";
import css from "../styles/login.module.scss";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  deleteUser
} from "firebase/auth";
import app from "../firebase/config";
import Google from "../assets/google.svg";
import { getDatabase, ref, set } from "firebase/database";
class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  submithandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // Signed in

        this.setState({ message: "Login Successfully" });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/user-not-found).") {
          this.setState({ message: "Email Does not Exit" });
        } else if (errorMessage == "Firebase: Error (auth/wrong-password).") {
          this.setState({ message: "Wrong Password" });
        }
      });
  };

  googleHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const GoogleAuth = new GoogleAuthProvider();
    signInWithPopup(auth, GoogleAuth)
      .then((res) => {
        this.setState({ message: "*Successfully Login" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className={css.container}>
        <form onSubmit={this.submithandler}>
          <div className={css.login}>
            <h1>Login</h1>
            <p style={{ color: "red" }}>{this.state.message}</p>
            <div className={css.email}>
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className={css.password}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={css.button}>
              <button type="submit">Login</button>
            </div>
            <h2>OR</h2>
            <div className={css.google} onClick={this.googleHandler}>
              <img src={Google} />
              <h5>Login via Google</h5>
            </div>
          </div>
          <Link to="/signup">Signup</Link>
        </form>
      </div>
    );
  }
}

export default login;
