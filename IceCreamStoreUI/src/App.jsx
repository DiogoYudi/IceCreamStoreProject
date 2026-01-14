import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Sale from "./components/Sale"
import Stock from "./components/Stock"

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
        </Routes>
      </BrowserRouter>
      
    </>
    /*<div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<EmployeeList />} />
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
    */
  )
}

export default App