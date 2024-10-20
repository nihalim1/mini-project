import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import FoodList from './components/FoodList';
import FoodDetail from './components/FoodDetail'; // เพิ่มหน้าแสดงรายละเอียด
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          {/* ใช้ NavLink เพื่อให้การเปลี่ยนเส้นทางทำงาน */}
          <NavLink to="/admin">
            <button className="btn btn-outline-success" type="button">admin</button>
          </NavLink>
          <NavLink to="/food">
            <button className="btn btn-sm btn-outline-secondary" type="button">หน้าแรก</button>
          </NavLink>
        </form>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/food" element={<FoodList />} />
        <Route path="/food/:id" element={<FoodDetail />} /> {/* เพิ่ม Route สำหรับหน้ารายละเอียด */}
      </Routes>
    </Router>
  );
}

export default App;
