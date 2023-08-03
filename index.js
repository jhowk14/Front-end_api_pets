const consign = require('consign')
const express = require('express')
const axios = require('axios');
const app = express()
var porta = '3000'
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configura o Express p/ usar o EJS om View engine

app.set('view engine', 'ejs')

// Define diretorio para arquivos estaticos (css, imagens, js(front-end))

app.use(express.static('public'))
app.get('/', async (req, res) => {
    try {
      // Faça a requisição para a API desejada usando o axios
      const response = await axios.get('http://localhost:3200/consultar/pets');
  
      // Os dados da API estarão no corpo da resposta
      const dados = response.data;
  
      // Retorne os dados para o cliente
      res.render('index', {dados: dados})
    } catch (error) {
      // Em caso de erro, retorne uma resposta de erro
      console.error('Erro na requisição à API:', error.message);
    }
  });
consign()
    .include('./controllers/rotas')
    .into(app)

app.get(`/:nome?/:especie?`, async (req, res)=>{
    let {nome, especie} = req.params
    res.render('index', {nome, especie})
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`));