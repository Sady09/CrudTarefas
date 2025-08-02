import express from 'express';

const app = express()
const url = "http://localhost:3333/"
const port = 3333

app.get('/', (req, res) => {
  res.send("Olá mundo")
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);

})