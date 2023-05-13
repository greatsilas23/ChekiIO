/*Date created: 27th 

  Date modified: 27th 
*/
const url = require('url')
const http = require('http')


const fs = require('fs')








 







http.createServer((req, res) => {
  





  fs.readFile("." + url.parse(req.url, true).pathname, (err, data) => {
  if(err){
     console.log(err)
     

     res.write('File not found')

     return res.end()

  }
   
  res.writeHead(204, {'Content-Type':'text/html'})
  res.end()






  return res.end(data)
 })


}).listen(4000, () => console.log('listening on port 4000')) 
