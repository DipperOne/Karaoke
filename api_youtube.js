const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req, res) => {
    const apiKey = 'AIzaSyA49PbjihWjIr2D1EwkuhhLyLn7qQgSWps';
    const searchTerm = req.query.term || 'Karaoke poeira ivete sangalo';

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${apiKey}`)
        .then(response => {
            const videoId = response.data.items[0].id.videoId;
            res.send({ videoId });
        })
        .catch(error => {
            res.status(500).send({ error: 'Erro ao buscar o vídeo no YouTube' });
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
