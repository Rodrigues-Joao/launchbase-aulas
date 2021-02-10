module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate()))
            age = age - 1

        return age
    },
    graduation: function(graduation) {

        switch (graduation) {
            case "EMC":
                return "Ensino Médio Completo"
                break
            case "ESC":
                return "Ensino Superior Completo"
                break
            case "MeD":
                return "Mestrado e Doutorado"
                break
        }
    },
    date: function(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)


        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            bithDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    grade: function(school_year) {
        switch (school_year) {
            case "5EF":
                return "5º Ano do fundamental"
                break
            case "6EF":
                return "6º Ano do fundamental"
                break
            case "7EF":
                return "7º Ano do fundamental"
                break
            case "8EF":
                return "8º Ano do fundamental"
                break
            case "9EF":
                return "9º Ano do fundamental"
                break
            case "1EM":
                return "1º Ano do ensino médio"
                break
            case "2EM":
                return "2º Ano do ensino médio"
                break
            case "3EM":
                return "3º Ano do ensino médio"
                break
        }
    }
}