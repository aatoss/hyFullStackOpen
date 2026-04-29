const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let data = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
    }
]

// Get all persons
app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(data))
})

// Get single person with ID
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find(p => p.id === id)
    if (person) {
        response.end(JSON.stringify(person))
    } else {
        response.status(404).end()
    }
})

// Add new person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'Name or number missing' })
    }

    if (data.find(p => p.name === body.name)) {
        return response.status(400).json({ error: 'Name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: (Math.floor(Math.random() * 1000000)).toString()
    }

    data = data.concat(person)

    response.json(person)
})

// Delete person with ID
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find(p => p.id === id)
    if (person) {
        data = data.filter(p => p.id !== id)
        response.status(204).end()
    } else {
        response.status(204).end()
    }
})

app.get('/info', (request, response) => {
    response.end(`<p>Phonebook has info for ${data.length} people</p><p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})