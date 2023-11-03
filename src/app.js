const express = require('express');
const app = express();
const axios = require('axios');

const cors = require("cors")

app.use(cors({
    origin: '*'
  }))

require('dotenv/config');

const createClient = require('@supabase/supabase-js').createClient
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN, { auth: { persistSession: false } })

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../doc/swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
	next();
})

app.get('/init', async (req, res) => {
    try {
      const response = await axios.get('https://digimon-api.vercel.app/api/digimon');
      const digimons = response.data;
      for (const digimon of digimons) {
        const { data, error } = await supabase
        .from('digimon')
        .insert([
        { name: digimon.name, img: digimon.img, level: digimon.level },
        ])
      }
      res.send({message: "Digimons salvos com sucesso!"});
    } catch (error) {
      console.log('Erro:', error);
      res.status(500).send("Erro ao salvar Digimons: " + error.message);
    }
  });

  app.get('/api/digimon', async(req,res) => {
    try {
        let { data: digimon, error } = await supabase
        .from('digimon')
        .select('*')
        if (error) {
            throw error
        }

        digimon.forEach((digimon) => {
            delete digimon.id;
            delete digimon.created_at;
        });

        res.send(digimon);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get('/api/digimon/name/:name'  , async(req,res) => {
    try {
        const { name } = req.params;        
        let { data: digimon, error } = await supabase
        .from('digimon')
        .select('*')
        .eq('name', name)
        if (error) {
            throw error
        }

        digimon.forEach((digimon) => {
            delete digimon.id;
            delete digimon.created_at;
        });

        res.send(digimon);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/digimon/level/:level', async(req,res) => {
    try {
        const { level } = req.params;        
        let { data: digimon, error } = await supabase
        .from('digimon')
        .select('*')
        .eq('level', level)
        if (error) {
            throw error
        }

        digimon.forEach((digimon) => {
            delete digimon.id;
            delete digimon.created_at;
        });

        res.send(digimon);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = app;
