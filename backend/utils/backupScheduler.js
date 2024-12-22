const express = require('express');
const router = express.Router();
const { createBackup } = require('../utils/backup');

router.get('/manual', async (req, res) => {
    try {
        console.log('Backup started');
        await createBackup();
        console.log('Backup completed');
        res.status(200).json({ message: 'Backup completed' });
    } catch (error) {
        console.error('Backup failed:', error);
        res.status(500).json({ message: 'Backup failed', error: error.message });
    }
});



module.exports = router;
