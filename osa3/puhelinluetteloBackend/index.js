require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Number = require('./models/number')


const app = express()
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)


// Get all persons
app.get('/api/persons', (request, response) => {
    Number.find({}).then(result => {
        response.json(result)
    })
})

// Get single person with ID
app.get('/api/persons/:id', (request, response, next) => {
    Number.findById(request.params.id)
        .then(number => {
            if (number) {
                response.json(number)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// Add new person
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const number = new Number({
        name: body.name,
        number: body.number
    })

    number.save().then(result => {
        response.json(result)
    }).catch(error => next(error))

})

// Update existing persons phone number with ID
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const number = {
        name: body.name,
        number: body.number
    }

    Number.findById(request.params.id).then(newNumber => {
        if (!newNumber) {
            return response.status(404).end()
        }
        newNumber.number = body.number
        return newNumber.save().then(updatedNumber => {
            response.json(updatedNumber)
        })
        .catch(error => next(error))
    })
})

// Delete person with ID
app.delete('/api/persons/:id', (request, response, next) => {
    Number.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Number.find({}).then(result => {
        response.end(`<p>Phonebook has info for ${result.length} people</p><p>${new Date()}</p>`)
    })
})

const errorHandler = (error, request, response, next) => {
    console.log('Error handler called')
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})