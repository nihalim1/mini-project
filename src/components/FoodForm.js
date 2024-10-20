import React, { useState, useEffect } from 'react';
import { createFood, updateFood } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FoodList.css'; 

function FoodForm({ selectedFood, loadFoods }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState(''); // New state for details
  const [image, setImage] = useState(null);

  // Populate form fields when a food item is selected for editing
  useEffect(() => {
    if (selectedFood) {
      setName(selectedFood.name);
      setDescription(selectedFood.description);
      setDetails(selectedFood.details || '');  // Set details if available
    } else {
      setName('');
      setDescription('');
      setDetails(''); // Reset details
      setImage(null);
    }
  }, [selectedFood]);

  // Handle form submission for creating or updating a food item
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('details', details);  // Include details in form data
    if (image) formData.append('image', image);

    if (selectedFood) {
      await updateFood(selectedFood.id, formData);
    } else {
      await createFood(formData);
    }

    loadFoods(); // Reload the list of foods after submission
  };

  return (
    <div className="card p-4 mb-4">
      <h2 className="text-center mb-4">{selectedFood ? 'Edit Food' : 'Add New Food'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Food Name */}
        <div className="form-group mb-3">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Details */}
        <div className="form-group mb-3">
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            className="form-control"
            placeholder="Enter additional details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div className="form-group mb-3">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {selectedFood ? 'Update Food' : 'Add Food'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
