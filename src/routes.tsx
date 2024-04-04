import { Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Categories from './pages/Categories'
import Product from './pages/Product'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/product/:id" element={<Product />} />
    {/* assim eu seto o parâmetro para criar  uma rota dinâmica */}
  </Routes>
)

export default Rotas
