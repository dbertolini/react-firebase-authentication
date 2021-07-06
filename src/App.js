import React, {useState} from 'react'
import "./App.css";
import getFirebase from "./firebase";

const firebaseInstance = getFirebase();

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = async (event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await firebaseInstance
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log("user", user);
        alert("Welcome back!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const signUp = async(event) => {
    event.preventDefault();

    try {
      if (firebaseInstance) {
        const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
        console.log("user", user)
        alert(`Welcome ${email}!`);
      }
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }

  };

  return (
    <div className="App">
      <div>
        <label htmlFor="txtEmail">Email:</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="text" id="txtEmail" placeholder="Email"></input>
      </div>
      <div>
        <label htmlFor="txtPassword">Password:</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" id="txtPassword" placeholder="Password"></input>
      </div>
      <div>
        <button onClick={(e) => signIn(e)}>Sign In</button>
      </div>
      <div>
        <button onClick={(e) => signUp(e)}>Sign Up</button>
      </div>
    </div>
  );
}

export default App;
