const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

router.get('/', async (req, res) => {
    try {
        const { type, degreeType, tuitionMin, tuitionMax, search } = req.query;
        
        let query = {};
        
        if (type) {
            query.type = type;
        }
        
        if (degreeType) {
            query.degreeType = degreeType;
        }
        
        if (tuitionMin || tuitionMax) {
            query.tuition = {};
            if (tuitionMin) query.tuition.$gte = Number(tuitionMin);
            if (tuitionMax) query.tuition.$lte = Number(tuitionMax);
        }
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { university_name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { departments: { $elemMatch: { $regex: search, $options: 'i' } } }            ];
        }

        const faculties = await Faculty.find(query);
        res.json({ faculties });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params._id);
        res.json({ faculty });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const result = await Faculty.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).send({ message: 'University not found' });
        }
        
        res.status(200).send({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting university', error });
    }
});


router.put('/:_id', async (req, res) => {
        const { _id } = req.params;
        const { name, university_name, imageUrl, description, location, type,
            degreeType, tuition, departments, established,
            rating, website, contactEmail, studentCount,
            facultyCount } = req.body;
        
        const faculty = await Faculty.findByIdAndUpdate(_id, { name,
            university_name, imageUrl, description, location, type,
            degreeType, tuition, departments, established,
            rating, website, contactEmail, studentCount,
            facultyCount }, { new: true });
        res.json({ faculty });
});

router.post('/', async (req, res) => {
    const { name, university_name, imageUrl, description,
        location, type, degreeType, tuition,
        departments, established, rating, website,
         contactEmail, studentCount, facultyCount } = req.body;

    const faculty = new Faculty({ name, university_name, imageUrl,
         description, location, type, degreeType,
          tuition, departments, established, rating,
           website, contactEmail, studentCount, facultyCount });

    await faculty.save();
    res.json({ faculty });
});

router.get('/:_id', async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params._id);
        if (!faculty) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(faculty);
    } catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
