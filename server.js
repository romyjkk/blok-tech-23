const {engine} = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000

app.use('/public', express.static('public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('*', (req,res) => {
  res.send('404 Page Not Found', 404);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})