import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import OrderBookPage from 'src/pages/OrderBookPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from 'src/constants/routes-constants'
import 'src/styles/globals.css'

const RootComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.ORDER_BOOK_ROUTE} element={<OrderBookPage />} />
      </Routes>
    </Router>
  )
}

export default RootComponent
