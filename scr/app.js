const express = require('express');
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');

app.use(cors())

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBMWi8DJd33F6i46UGzeIusRpWz0zS8Qb0",
  authDomain: "globalfinanceira-93893.firebaseapp.com",
  projectId: "globalfinanceira-93893",
  storageBucket: "globalfinanceira-93893.appspot.com",
  messagingSenderId: "610832737149",
  appId: "1:610832737149:web:a7ca0ed992c2bc139ae214",
  measurementId: "G-61JC5THY4S"
};

// Initialize Firebase
const initfirebase = initializeApp(firebaseConfig);
const db = getFirestore(initfirebase);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
	next();
})

app.get('/api/digimon'), async(req,res) => {

    try {
        const digimonCollection  = collection(db, 'digimon');
        const digimonDocs  = await getDocs(digimonCollection );
        res.status(200).json(digimonDocs );
    } catch (error) {
        res.status(500).send(error.message);
    }
}

app.get('/api/digimon/name/:name'), async(req,res) => {

}

app.get('/api/digimon/level/:level'), async(req,res) => {

}

module.exports = app;
