const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const bucketPath = 'flotillas';

fs.readFile('gcpstorage.json', 'utf8', (err) => {
  if (err) {
    fs.writeFile('gcpstorage.json', process.env.GCS_KEYFILE, 'utf8', (error) => {
      if (error) console.log(err);
    });
  }
});

const googleStorage = new multerGoogleStorage.storageEngine({
  autoRetry: true,
  keyFilename: 'gcpstorage.json',
  projectId: process.env.GCLOUD_PROJECT,
  bucket: process.env.GCS_BUCKET,
  filename: (req, filename, cb) => {
    console.log(filename.mimetype);
    const folder = bucketPath;
    const extension = filename.mimetype.split('/')[1];
    // // const extension = filename?.split('.').pop();
    cb(null, `${folder}/${uuidv4()}.${extension}`);
  },
});

const imageStorage = multer({
  storage: googleStorage,
});


module.exports = {
  imageStorage,
}