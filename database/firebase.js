const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = process.env.FIREBASE_CONFIG
const firebaseConfig = {
  ...JSON.parse(config)
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://test-upload-7676a.appspot.com");
const db = getFirestore(app);

module.exports = {
  storage,
  db
}