import React from 'react';
import './App.css';
import {Presentation} from "./models/types";
import {Program} from "./components/program/Program";

type AppProps = {
  presentation: Presentation
}

function App(props: AppProps) {
  return (
    <div className="App">
      <Program presentation={props.presentation} />
    </div>
  );
}

export default App;

