const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} if (process.argv.length === 3) {

  const password = process.argv[2]

  const url = `mongodb+srv://saarinenaatos_db_user:${password}@cluster0.hxyvoaz.mongodb.net/numberApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)
  mongoose.connect(url, { family: 4 })

  const numberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      minlength: [3, 'Name must be at least 3 characters long']
    },
    number: {
      type: String,
      required: [true, 'Number is required'],
      minlength: [8, 'Number must be at least 8 characters long']
    }
  })

  const Number = mongoose.model('Number', numberSchema)

  Number.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(number => {
      console.log(`${number.name} ${number.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {

  const password = process.argv[2]

  const url = `mongodb+srv://saarinenaatos_db_user:${password}@cluster0.hxyvoaz.mongodb.net/numberApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)
  mongoose.connect(url, { family: 4 })


  const numberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      minlength: [3, 'Name must be at least 3 characters long']
    },
    number: {
      type: String,
      required: [true, 'Number is required'],
      minlength: [8, 'Number must be at least 8 characters long']
    }
  })

  const Number = mongoose.model('Number', numberSchema)

  const number = new Number({
    name: process.argv[3],
    number: process.argv[4]
  })

  number.save().then(result => {
    console.log(`added ${number.name} number ${number.number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('wrong amount of arguments')
  process.exit(1)
}
