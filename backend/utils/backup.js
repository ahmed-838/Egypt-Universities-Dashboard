const { spawn } = require('child_process');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

async function createBackup() {
    return new Promise((resolve, reject) => {
        try {
            const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database';
            const backupsDir = path.join(__dirname, '../backups');
            const backupPath = path.join(backupsDir, `backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}`);

            // إنشاء مجلد backups إذا لم يكن موجوداً
            if (!fs.existsSync(backupsDir)) {
                fs.mkdirSync(backupsDir, { recursive: true });
            }

            // إنشاء مجلد النسخ الاحتياطي المحدد
            fs.mkdirSync(backupPath, { recursive: true });

            console.log('بدء النسخ الاحتياطي...');
            console.log('مسار النسخ الاحتياطي:', backupPath);
            console.log('URI قاعدة البيانات:', MONGODB_URI);

            const mongodump = spawn('mongodump', [
                '--uri', MONGODB_URI,
                '--out', backupPath
            ], { shell: true });

            mongodump.stdout.on('data', (data) => {
                console.log(`stdout: ${data.toString()}`);
            });

            mongodump.stderr.on('data', (data) => {
                console.log(`stderr: ${data.toString()}`);
            });

            mongodump.on('close', (code) => {
                if (code === 0) {
                    // ننتظر لحظة قبل التحقق من المحتويات
                    setTimeout(() => {
                        try {
                            const files = fs.readdirSync(backupPath);
                            console.log('محتويات مجلد النسخ الاحتياطي:', files);
                            
                            if (files.length === 0) {
                                reject(new Error('Backup folder created but empty'));
                            } else {
                                console.log('Backup completed successfully');
                                resolve();
                            }
                        } catch (error) {
                            console.error('Error in reading backup folder:', error);
                            reject(error);
                        }
                    }, 1000);
                } else {
                    console.error(`Backup failed with exit code: ${code}`);
                    reject(new Error(`Backup failed with exit code: ${code}`));
                }
            });

            mongodump.on('error', (error) => {
                console.error('Error in executing mongodump:', error);
                reject(error);
            });
        } catch (error) {
            console.error('Error in creating backup:', error);
            reject(error);
        }
    });
}

module.exports = { createBackup }; 