const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false
})
server.get('/', (req, res) => {
    const about = {
        photo_url: "https://avatars0.githubusercontent.com/u/67028648?s=400&u=b5cd6f10514d7ddb94347a4eebd7a4e4e7ecc59f&v=4",
        name: "João Victor",
        role: "Aluno - Rocketseat",
        description: 'Programador iniciante full-stack, focado em aprender ao máximo com a <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/vicjoao" },
            { name: "Instagram", url: "https://www.instagram.com/joao51vi/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/jo%C3%A3o-victor-rodrigues-a29a81135/" }
        ]
    }
    return res.render('about', { about })

})
server.get('/classes', (req, res) => {
    return res.render('classes', { items: videos })

})

server.listen(3000, () => {
    console.log('server is running')
})