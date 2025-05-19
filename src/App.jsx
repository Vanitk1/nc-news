import React from "react";
import { BrowserRouter } from "react-router-dom"
import './App.css'; 
import AllRoutes from './routes/routes'
import Header from "./components/Header"
import Footer from "./components/Footer";

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <AllRoutes/>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
