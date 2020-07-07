const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})
server.get('/', (req, res) => {
    return res.render('about')

})
server.get('/classes', (req, res) => {
    return res.render('classes')

})

server.listen(3000, () => {
    console.log('server is running')
})