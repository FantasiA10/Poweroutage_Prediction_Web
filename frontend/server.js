const http = require('http');
const fs = require('fs')
const port = process.env.PORT || 5000;;
const serverHandler = require('./frontend/server_handle')
const server = http.createServer(serverHandler);
server.listen(port,()=>{
  console.log('Server has started on port:',port)
})
