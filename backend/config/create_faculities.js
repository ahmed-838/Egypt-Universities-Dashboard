const Faculty = require('../models/Faculty');

async function createFaculties() {
  try {
    // Create first faculty
    const techFaculty = new Faculty({
      name: 'Tech faculty',
      university_name: 'Cairo University', 
      description: 'A leading institution in technology education',
      location: 'Silicon Valley, CA',
      type: 'Mainstream',
      degreeType: 'Single',
      tuition: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      departments: ['Computer Science', 'Engineering', 'Mathematics'],
      established: 1985,
      rating: 4.5,
      website: 'https://techuniversity.edu',
      contactEmail: 'info@techuniversity.edu', 
      studentCount: 15000,
      facultyCount: 500
    });

    await techFaculty.save();
    console.log('Tech faculty created successfully');

    // Create second faculty
    const artsFaculty = new Faculty({
      name: 'Liberal Arts faculty',
      university_name: 'Alexandria University',
      description: 'Fostering creativity and critical thinking',
      location: 'Alexandria, Egypt', 
      type: 'Credit',
      degreeType: 'Dual',
      tuition: 35000,
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      departments: ['Arts', 'Literature', 'Philosophy'],
      established: 1890,
      rating: 4.8,
      website: 'https://liberalarts.edu',
      contactEmail: 'info@liberalarts.edu',
      studentCount: 8000,
      facultyCount: 300
    });

    await artsFaculty.save();
    console.log('Arts faculty created successfully');

  } catch (error) {
    console.error('Error creating faculties:', error);
  }
}

// Export the function
module.exports = createFaculties;
