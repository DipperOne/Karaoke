<<<<<<< HEAD
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
=======
const axios      = require('axios');
const express    = require('express');
const bodyParser = require('body-parser');

const app  = express();
>>>>>>> main
const port = 3333;

// Define o diretório de arquivos estáticos (por exemplo, HTML, CSS, imagens)
app.use(express.static('karaoke'));
app.use(bodyParser.json());

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile('karaoke/app/view/index.html', { root: __dirname });
});

// Rota para processar a pesquisa do YouTube
app.post('/search-youtube', async (req, res) => {
    try {
        const apiKey = 'AIzaSyA49PbjihWjIr2D1EwkuhhLyLn7qQgSWps';
        const searchQuery = `karaoke ${req.body.searchQuery}`;

        // Parâmetros da pesquisa usando os dados do formulário
        const params = {
            part: 'snippet',
            q: searchQuery,
            key: apiKey,
        };

        // Faz a solicitação para a API do YouTube
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });

        // Retorna os 3 resultados mais relevantes para o cliente
        if (response.data.items && response.data.items.length > 0) {
            const relevantResults = response.data.items.slice(0, 20); // Obtém os 3 primeiros resultados
            res.json(relevantResults);
        } else {
            res.json([]);
        }

    } catch (error) {
        console.error('Erro ao acessar a API do YouTube:', error.message);
        res.status(500).send('Erro ao acessar a API do YouTube');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
