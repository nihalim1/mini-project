import React, { useState, useEffect } from 'react';
import FoodForm from './FoodForm';
import { getFoods, deleteFood } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPanel.css'; // ใช้ไฟล์ CSS สำหรับการจัดการ layout

function AdminPanel() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const data = await getFoods();
    setFoods(data);
  };

  const handleEdit = (food) => {
    setSelectedFood(food);
  };

  const handleDelete = async (id) => {
    await deleteFood(id);
    loadFoods();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Panel</h1>

      <FoodForm selectedFood={selectedFood} loadFoods={loadFoods} />

      <div className="row">
        {foods.map((food) => (
          <div key={food.id} className="col-md-3 mb-4 d-flex align-items-stretch">
            <div className="card h-100 text-center">
              {food.image ? (
                <img
                  src={`http://localhost/backend/uploads/${food.image}?t=${new Date().getTime()}`}
                  className="card-img-top food-image"
                  alt={food.name}
                />
              ) : (
                <div className="no-image card-img-top" style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No image available
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => handleEdit(food)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(food.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
