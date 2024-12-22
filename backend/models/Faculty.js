const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  university_name: { type: String, required: true },
  description: { type: String, required: true }, 
  location: { type: String, required: true }, 
  type: { type: String, required: true }, 
  degreeType: { type: String, required: true }, 
  tuition: { type: Number, required: true }, 
  imageUrl: { type: String }, 
  departments: { type: [String], required: true }, 
  established: { type: Number, required: true }, 
  rating: { type: Number }, 
  website: { type: String }, 
  contactEmail: { type: String }, 
  studentCount: { type: Number }, 
  facultyCount: { type: Number }, 
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;