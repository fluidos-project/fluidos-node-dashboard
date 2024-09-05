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
import { AvailableFlavorPage } from './pages/Flavor/AvailableFlavorPage';
import { TransactionPage } from './pages/Transaction/TransactionPage';
import  {NotFoundPage}  from './pages/utils/NotFoundPage';
import SingleFlavorPage from './pages/Flavor/SingleFlavorPage';
import  NodeInfoPage  from './pages/Nodes/NodeInfoPage';
import { BreadcrumbsComponent } from './components/BreadcrumbsComponent';
import SingleSolverPage from './pages/Solver/SingleSolverPage';
import SinglePeeringCandidatePage from './pages/PeeringCandidates/SinglePeeringCandidatePage';
import SingleContractPage from './pages/Contracts/SingleContractPage';
import SingleReservationPage from './pages/Reservation/SingleReservationPage';
import SingleAllocationPage from './pages/Allocations/SingleAllocationPage';
import SingleTransactionPage from './pages/Transaction/SingleTransactionPage';
import { RemoteFlavorPage } from './pages/Flavor/AcquiredFlavorPage';
import SingleRemoteFlavorPage from './pages/Flavor/SingleAcquiredFlavorPage';
import { CreateSolverRequestPage } from './pages/Solver/CreateSolverRequestPage';
import { CreateReservationPage } from './pages/Reservation/CreateReservationPage';
import { CreateAllocationPage } from './pages/Allocations/CreateAllocationPage';



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
              <Route path="/" element={<NodeInfoPage configureAlert={configureAlert}/>} />

              <Route path="/flavors" element={<FlavorsPage configureAlert={configureAlert}/>} />
              <Route path="/flavors/:name" element={<SingleFlavorPage configureAlert={configureAlert} />} />

              <Route path="/flavors/acquired" element={<RemoteFlavorPage configureAlert={configureAlert}/>} />
              <Route path="/flavors/acquired/:name" element={<SingleRemoteFlavorPage configureAlert={configureAlert}/>} />
              
              <Route path="/flavors/available" element={<AvailableFlavorPage configureAlert={configureAlert} />} />
              <Route path="/flavors/available/:name" element={<SinglePeeringCandidatePage configureAlert={configureAlert} />} />

              <Route path="/reservations" element={<ReservationPage configureAlert={configureAlert} />} />
              <Route path="/reservations/:name" element={<SingleReservationPage configureAlert={configureAlert} />} />
              <Route path="/reservations/new" element={<CreateReservationPage configureAlert={configureAlert} />} />

              <Route path="/contracts" element={<ContractPage configureAlert={configureAlert} />} />
              <Route path="/contracts/:name" element={<SingleContractPage configureAlert={configureAlert} />} />

              <Route path="/allocations" element={<AllocationPage configureAlert={configureAlert} />} />
              <Route path="/allocations/:name" element={<SingleAllocationPage configureAlert={configureAlert} />} />
              <Route path="/allocations/new" element={<CreateAllocationPage configureAlert={configureAlert} />} />

              <Route path="/solvers" element={<SolverPage configureAlert={configureAlert} />} />
              <Route path="/solvers/:name" element={<SingleSolverPage configureAlert={configureAlert} />} />
              <Route path="/solvers/new" element={<CreateSolverRequestPage configureAlert={configureAlert} />} />


              <Route path="/transactions" element={<TransactionPage configureAlert={configureAlert} />} />
              <Route path="/transactions/:name" element={<SingleTransactionPage configureAlert={configureAlert} />} />

              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
