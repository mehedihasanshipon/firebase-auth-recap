import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebse.config';
import { useState } from 'react';

if(!firebase.apps.length){

  firebase.initializeApp(firebaseConfig);

}

  function App() {
    const [user,setUser] = useState({});
    // Provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const ghProvider = new firebase.auth.GithubAuthProvider();

    // Handle Google sign in 
    const handleGoogleSignIn = ()=> {
      firebase.auth()
        .signInWithPopup(googleProvider)
          .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            setUser(user);
            // console.log(credential,user);
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }

      //Handle facebook sign in 
      const handleFacebookSignIn = () =>{
        firebase
          .auth()
          .signInWithPopup(fbProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            // console.log(user);
            setUser(user)

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(errorCode,errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
          });
      }
      // Handle Github Sign in
      const handleGithubSignIn = ()=> {
        firebase
          .auth()
          .signInWithPopup(ghProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = credential.accessToken;

            // The signed-in user info.
            var user = result.user;
            console.log("GH user",user)
            setUser(user)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }
    return (
      <div className="App">
        <button onClick={handleGoogleSignIn}>Google Sign-in</button><br/>
        <button onClick={handleFacebookSignIn}>Facebook Login</button><br/>
        <button onClick={handleGithubSignIn}>Github Sign IN</button>
        <h4>Name : {user.displayName} </h4>
        <p>Email: {user.email} </p>
        <img src={user.photoURL} alt=""/>
      </div>
      
    );
}

export default App;
