const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const route = require('./routes')
const port = portNormalize(process.env.PORT || "4000");

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(route)
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})


server.listen(port, () => {
    console.log(`server is running in port ${port}`)
})



function portNormalize(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}