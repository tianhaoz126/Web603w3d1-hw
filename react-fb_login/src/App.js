import logo from './logo.svg';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Define the LoginForm component
function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />
      <input type="submit" value="Login" className="btn bg-success text-white my-3" />
    </form>
  );
}

// Define the Home component
function Home({ fbpic, fbdata }) {
  return (
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline text-success mx-2">
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  );
}

// Define the App component
function App() {
  const [login, setLogin] = useState(false); // Set up login
  const [data, setData] = useState({}); // Set up FB data
  const [picture, setPicture] = useState(''); // Set up FB profile image

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="container">
        <Card style={{ width: '800px' }} className="mx-auto mt-5">
          <Card.Header className="pb-4">
            <h1>My React App</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {!login && (
                <React.Fragment>
                  <h3>Please login using one of the following:</h3>
                  <LoginForm />
                  <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                  />
                </React.Fragment>
              )}
              {login && <Home fbpic={picture} fbdata={data} />}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
