import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./Component/MainPage";
import MilkingHistory from "./Component/MilkingHistory";
import { Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter className="App">
      <header className="App-header">
        <div className="left">
          <h1>Milk Tracker</h1>
        </div>
        <ul className="center">
          <Link className="link" to="/">
            <li>Home</li>
          </Link>
          <Link className="link" to="/history">
            <li >Milking History</li>
          </Link>
        </ul>
        <div className="right">Contact Us</div>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/history" element={<MilkingHistory />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
