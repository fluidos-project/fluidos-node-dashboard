import { useState } from 'react'
import './App.css'
import {Routes, Route } from "react-router-dom"
import { FlavorsPage } from './pages/FlavourPage';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ReservationPage } from './pages/ReservationPage';
import { ContractPage } from './pages/ContracPage';
import { AllocationPage } from './pages/AllocationPage';
import { SolverPage } from './pages/SolverPage';
import { PeeringCandidatePage } from './pages/PeeringCandidatePage';
import { TransactionPage } from './pages/TransactionPage';
import { NotFoundPage } from './pages/NotFoundPage';



function App() {

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ display: 'flex', mt: 8 }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              
            }}
          >
            <Routes>
              <Route path="/flavors" element={<FlavorsPage />} />
              <Route path="/reservations" element={<ReservationPage />} />
              <Route path="/contracts" element={<ContractPage />} />
              <Route path="/allocations" element={<AllocationPage />} />
              <Route path="/solvers" element={<SolverPage />} />
              <Route path="/peeringcandidates" element={<PeeringCandidatePage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
