import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout'
import Home from '../pages/home'
import About from '../pages/about'
import Contact from '../pages/contact'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
