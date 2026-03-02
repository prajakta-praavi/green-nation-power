import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CalculatorOverlay from './components/calculator/CalculatorOverlay'
import AppLayout from './components/layout/AppLayout'
import AboutPage from './pages/AboutPage'
import CommercialPage from './pages/CommercialPage'
import EpcPage from './pages/EpcPage'
import HomePage from './pages/HomePage'
import LocationLandingPage from './pages/LocationLandingPage'
import LocationsPage from './pages/LocationsPage'
import LegacyLocationRedirect from './pages/LegacyLocationRedirect'
import ProjectsPage from './pages/ProjectsPage'
import ResidentialPage from './pages/ResidentialPage'

function App() {
  const [calculatorState, setCalculatorState] = useState({
    isOpen: false,
    initialTab: 'residential',
  })

  const openCalculator = (tab = 'residential') => {
    setCalculatorState({
      isOpen: true,
      initialTab: tab,
    })
  }

  const closeCalculator = () => {
    setCalculatorState((previous) => ({ ...previous, isOpen: false }))
  }

  return (
    <>
      <Routes>
        <Route
          element={<AppLayout onOpenCalculator={openCalculator} />}
        >
          <Route path="/" element={<HomePage onOpenCalculator={openCalculator} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/residential" element={<ResidentialPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/epc" element={<EpcPage />} />
          <Route
            path="/best-solar-provider-in/:citySlug"
            element={<LocationLandingPage onOpenCalculator={openCalculator} />}
          />
          <Route
            path="/best-solar-provider-in-*"
            element={<LegacyLocationRedirect />}
          />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <CalculatorOverlay
        isOpen={calculatorState.isOpen}
        initialTab={calculatorState.initialTab}
        onClose={closeCalculator}
      />
    </>
  )
}

export default App
