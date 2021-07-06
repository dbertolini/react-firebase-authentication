import React, {useState} from 'react'
import "./App.css";
import getFirebase from "./firebase";

const firebaseInstance = getFirebase();

function App() {

  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signInEmail = async (event) => {
    try {
      if (firebaseInstance) {
        const res = await firebaseInstance.auth().signInWithEmailAndPassword(email, password);

        console.log("Response: ", res)

        if(res.user.emailVerified) {
          alert("Welcome back!")
        }
        else {
          alert("Please, verify your email account!")
        }
      }
    } catch (error) {
      console.log("error", error)
      alert(error.message)
    }
  }

  const signUpEmail = async(event) => {
    try {
      if (firebaseInstance) {
        const res = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
        console.log("Response: ", res)
        res.user.updateProfile({
          displayName: fullname
        })
        res.user.sendEmailVerification();
        firebaseInstance.auth().signOut();
        alert('New account created! Please, verify your email to activate the account!');
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Email Sign In</h1>
      <div>
        <label htmlFor="txtFullname">Fullname:</label>
        <input onChange={(e)=>setFullname(e.target.value)} type="text" id="txtFullname" placeholder="Fullname"></input>
      </div>
      <div>
        <label htmlFor="txtEmail">Email:</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="text" id="txtEmail" placeholder="Email"></input>
      </div>
      <div>
        <label htmlFor="txtPassword">Password:</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" id="txtPassword" placeholder="Password"></input>
      </div>
      <div>
        <button onClick={(e) => signInEmail(e)}>Sign In</button>
      </div>
      <div>
        <button onClick={(e) => signUpEmail(e)}>Sign Up</button>
      </div>
    </div>
  );
}

export default App;
