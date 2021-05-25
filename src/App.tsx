import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Nav from "./nav";

function App() {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

export default App;
