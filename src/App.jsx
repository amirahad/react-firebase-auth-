
import './App.css'
import initializeAuthentication from './firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';





initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();



function App() {

  const [user, setUser] = useState({});
  const auth = getAuth();


  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL, emailVerified } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          varification: emailVerified
        };
        setUser(loggedInUser);
      }).catch(error => {
        console.log(error.message);
      });
  }


  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL, emailVerified } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          varification: emailVerified
        };
        setUser(loggedInUser);
      }).catch(error => {
        console.log(error.message);
      });
  }


  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        console.log(result.user);
        // const { displayName, email, photoURL, emailVerified } = result.user;
        // const loggedInUser = {
        //   name: displayName,
        //   email: email,
        //   photo: photoURL,
        //   varification: emailVerified
        // };
        setUser(loggedInUser);
      }).catch(error => {
        console.log(error.message);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch((error) => {
        console.log(error.message);
      });
  }





  return (
    <div className="App">
      <h1>TESTING</h1>
      {
        !user.name ? <div>
          <button onClick={handleGoogleSignIn}>Google Sign in</button>
          <button onClick={handleGithubSignIn}>Github Sign in</button>
          <button onClick={handleFacebookSignIn}>Facebook Sign in</button>
        </div> :
          <button onClick={handleSignOut}>Sign Out</button>
      }
      <br />
      {
        user.name && <div>
          <h1>Welcome {user.name}</h1>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }


    </div>
  )
}

export default App
