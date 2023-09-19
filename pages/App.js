import React from "react";
import Home from "./components/Home";
import { HashRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Home />
      </HashRouter>
    );
  }
}

export default App;
