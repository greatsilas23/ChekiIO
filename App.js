const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const app = express()



app.use(bodyParser.urlencoded({ extended: false }))
app.post('/login', function(req, res) {
	let userName = req.body.userName
	console.log(`${userName}`)
	res.sendStatus(204)
})



app.listen(port, (err) => {
  if (err) throw err
  console.log(`listening on port ${port}`)
})

