import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Home from "./Home.jsx";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail/Detail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>;
      <Route path="/country/:name" element={<Detail />}></Route>
    </Routes>
  );
}

export default App;
