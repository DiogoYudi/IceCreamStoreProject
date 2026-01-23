import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Sale from "./components/Sale"
import Stock from "./components/Stock"
import Product from "./components/Product"

function App(){
  return(
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route index element={<Sale />} />
          <Route path="/" element={<Sale />}/>
          <Route path="Stock" element={<Stock />} />
          <Route path="Product" element={<Product />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App