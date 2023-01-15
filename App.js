const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const app = express()
let users = new Array()
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
	let userName = req.body.userName
	let userPass = req.body.userPass
	users.push({ userName, userPass})
	console.log(`Username: ${userName}, Userpass: ${userPass}`)
	res.sendStatus(204)
})
app.listen(port, (err) => {
  if (err) throw err
  console.log(`listening on port ${port}`)
})

