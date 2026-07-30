const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('initial db has one user', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'testi', name: 'Testi Käyttäjä', passwordHash })
    await user.save()
  })

  test('successfully create a new user', async () => {
    const usersAtStart = await User.find({})

    const testUser = {
      username: 'oikea',
      name: 'Oikea Käyttäjä',
      password: 'salasana1'
    }

    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert.ok(usernames.includes(testUser.username))
  })

  test('fails to create a new user with too short password', async () => {
    const testUser = {
      username: 'Oikea',
      name: 'Oikea Käyttäjä',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(testUser)
      .expect(400)

    assert.ok(result.body.error.includes('password must be at least 3 characters long'))
  })

  test('fails to create a new user with duplicate username', async () => {
    const testUser = {
      username: 'testi',
      name: 'Testi Käyttäjä',
      password: 'salasana'
    }

    const result = await api
      .post('/api/users')
      .send(testUser)
      .expect(400)

    assert.ok(result.body.error.includes('expected `username` to be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})