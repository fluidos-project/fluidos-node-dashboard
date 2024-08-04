import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from "react-router-dom"
import { FlavorsPage } from './pages/FlavourPage';
import Header from './components/Header';


function App() {

  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<FlavorsPage />} />
      <Route path="/reservations" element={<p>reservations</p>} />
      </Routes>
    </>
  )
}

export default App
