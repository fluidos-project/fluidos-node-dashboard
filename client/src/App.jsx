import { useState } from 'react'
import './App.css'
import {Routes, Route, Navigate } from "react-router-dom"
import { FlavorsPage } from './pages/Flavor/FlavourPage';
import { Alert, Box, Breadcrumbs, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AlertComponent } from './components/AlertComponent';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ReservationPage } from './pages/Reservation/ReservationPage';
import { ContractPage } from './pages/Contracts/ContractPage';
import { AllocationPage } from './pages/Allocations/AllocationPage';
import { SolverPage } from './pages/Solver/SolverPage';
import { PeeringCandidatePage } from './pages/PeeringCandidates/PeeringCandidatePage';
import { TransactionPage } from './pages/TransactionPage';
import  {NotFoundPage}  from './pages/NotFoundPage';
import SingleFlavorPage from './pages/Flavor/SingleFlavorPage';
import  NodeInfoPage  from './pages/NodeInfoPage';
import { BreadcrumbsComponent } from './components/BreadcrumbsComponent';
import SingleSolverPage from './pages/Solver/SingleSolverPage';
import SinglePeeringCandidatePage from './pages/PeeringCandidates/SinglePeeringCandidatePage';
import SingleContractPage from './pages/Contracts/SingleContractPage';
import SingleReservationPage from './pages/Reservation/SingleReservationPage';



function App() {

  const [alert, setAlert] = useState({type: "", message: ""});

  const configureAlert = (msg) => {
    setAlert({
      type: msg.type,
      message: msg.message
    })
    //console.log(msg)
  }

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
            {alert && <AlertComponent alert={alert} configureAlert={configureAlert}/>}
            <BreadcrumbsComponent />
            <Routes>
              <Route path="/" element={<Navigate to="/flavors" replace />} />

              <Route path="/flavors" element={<FlavorsPage configureAlert={configureAlert}/>} />
              <Route path="/flavors/:name" element={<SingleFlavorPage configureAlert={configureAlert} />} />
              
              <Route path="/reservations" element={<ReservationPage configureAlert={configureAlert} />} />
              <Route path="/reservations/:name" element={<SingleReservationPage configureAlert={configureAlert} />} />

              <Route path="/contracts" element={<ContractPage configureAlert={configureAlert} />} />
              <Route path="/contracts/:name" element={<SingleContractPage configureAlert={configureAlert} />} />

              <Route path="/allocations" element={<AllocationPage configureAlert={configureAlert} />} />

              <Route path="/solvers" element={<SolverPage configureAlert={configureAlert} />} />
              <Route path="/solvers/:name" element={<SingleSolverPage configureAlert={configureAlert} />} />

              <Route path="/peeringcandidates" element={<PeeringCandidatePage configureAlert={configureAlert} />} />
              <Route path="/peeringcandidates/:name" element={<SinglePeeringCandidatePage configureAlert={configureAlert} />} />

              <Route path="/transactions" element={<TransactionPage configureAlert={configureAlert} />} />
              <Route path="/info" element={<NodeInfoPage configureAlert={configureAlert}/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
