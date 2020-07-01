import express from 'express'

const app = express()

app.listen(3333, () => {
  console.log('🧩 - Server Started - listen on port 3333')
})

app.use(express.json())

app.post('/', (req, res) => {
  const {name, email} = req.body

  const user = {
    name,
    email
  }
  return res.json(user)
})