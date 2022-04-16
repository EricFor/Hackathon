import logo from "./logo.svg";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/HomePage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<Signup />}></Route>
        		<Route path="/login" element={<Login />}></Route>
				<Route path="/home" element={<Home />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
