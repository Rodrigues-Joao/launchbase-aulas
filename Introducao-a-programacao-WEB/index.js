const AlunosTurmaA = [
    {
        nome: 'João',
        nota: 7
    },
    {
        nome: 'Suellen',
        nota: 10
    },
    {
        nome: 'Zézinho',
        nota: 4
    }
]
const AlunosTurmaB = [
    {
        nome: 'Pedro',
        nota: 7
    },
    {
        nome: 'José',
        nota: 10
    },
    {
        nome: 'Antonela',
        nota: 4
    },
    {
        nome: 'Maria',
        nota: 9.5
    }
]

function calculaMedia(alunos) {
    let sum = 0

    for (let aluno of alunos) {
        sum += aluno.nota
    }

    return (sum / alunos.length).toFixed(2)
}

function enviaMensagem(media, turma) {
    if (media > 5) {
        console.log(`A média da turma  ${turma} foi de ${media}. Parabens`)
    }
    else {
        console.log(`A média da turma ${turma} é menor que 5`)
    }

}

function marcaComoReprovado(aluno) {
    aluno.reprovado = false

    if (aluno.nota < 5)
        aluno.reprovado = true
}

function enviaMensagemReprovado(aluno){
    if (aluno.reprovado)
        console.log(`O aluno ${aluno.nome} está reprovado!`)
}
function alunoReprovado (alunos){
    for (let aluno of alunos){
        marcaComoReprovado(aluno)
        enviaMensagemReprovado(aluno)
    }
}
const media1 = calculaMedia(AlunosTurmaA)
const media2 = calculaMedia(AlunosTurmaB)

enviaMensagem(media1, 'TurmaA')
enviaMensagem(media2, 'TurmaB')

alunoReprovado(AlunosTurmaA)
alunoReprovado(AlunosTurmaB)



