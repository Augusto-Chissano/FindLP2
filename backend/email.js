const express = require('express');
const app = express();
const cors = require('cors')

const mailgun = require('mailgun-js')({
    apiKey: 'db4df449-ac06b79c',
    domain: 'sandbox7208fce3370e4b60b067dba7aca4d712.mailgun.org'
});


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: 'Testando' })
})
// Rota para enviar o código de verificação para o e-mail
app.post('/enviar-codigo', (req, res) => {
    const { email } = req.body

    // Gerar um código de verificação (pode ser um número aleatório ou gerado de outra forma)
    const codigo = Math.floor(1000 + Math.random() * 9000)

    // Configurações do e-mail
    const data = {
        from: 'augustochissanojr@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Introduza o seguinte codigo ${codigo}`
    }

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao enviar o código de verificação por e-mail.' })
        } else {
            console.log(body)
            res.status(200).json({ mensagem: 'Código de verificação enviado com sucesso por e-mail.' })
        }
    })
})

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
