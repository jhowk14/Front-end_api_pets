const consign = require('consign')
const express = require('express')
const app = express()
var porta = '3000'
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configura o Express p/ usar o EJS om View engine

app.set('view engine', 'ejs')

// Define diretorio para arquivos estaticos (css, imagens, js(front-end))

app.use(express.static('public'))

consign()
    .include('./controllers/rotas')
    .into(app)

app.get(`/:nome?/:especie?`, async (req, res)=>{
    let {nome, especie} = req.params
    res.render('index', {nome, especie})
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`));