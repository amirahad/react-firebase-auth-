
import './App.css'
import initializeAuthentication from './firebase/firebase.initialize';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';





initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();



function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        setError(error.message);
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
        setError(error.message);
      });
  }



  const handleRegistration = e => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password must contain 2 upper case');
      return;
    }



    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      }).catch(error => {
        setError(error.message);
      });

  }


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch((error) => {
        setError(error.message);
      });
  }

  // const handleEmailChange = e => {
  //   setEmail(e.target.value);
  // }

  // const handlePassChange = e => {
  //   setPassword(e.target.value);
  // }




  return (
    <div className="App">
      <h1>TESTING AUTHENTICATION</h1>
      <form className='my-4' onSubmit={handleRegistration}>
        <div className="form-group row mx-auto">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-8">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder='Email'
              onBlur={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="form-group row mx-auto">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>
        {
          error && <p className='text-danger'>{error}</p>
        }

        {/* <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
        <input type="submit" value="Register" />
      </form>

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
