import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import ContactList from './components/ContactList'



const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)

  const addNumber = (e) => {
    e.preventDefault()
    if (contacts.some(contact => contact.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = contacts.find(c => c.name.toLowerCase() === newName.toLowerCase())
        numberService.update(contact.id, { ...contact, number: newNumber })
          .then(response => {
            setNotification(`Updated ${newName}'s number`)
            setErrorState(false)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setContacts(contacts.map(c => c.id === contact.id ? response : c))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setErrorState(true)
            setNotification(error.response.data.error)
            setTimeout(() => {
              setNotification(null)
              setErrorState(false)
            }, 5000)
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      numberService.create({ name: newName, number: newNumber })
        .then(response => {
          setContacts(contacts.concat(response))
          setNotification(`Added ${newName}`)
          setErrorState(false)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setErrorState(true)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
            setErrorState(false)
          }, 5000)
        })
    }
  }

  const deleteNumber = (id) => {
    if (window.confirm('Are you sure you want to delete this number?')) {
      numberService.deleteNumber(id)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id))
          setNotification('Number deleted successfully')
          setErrorState(false)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          setErrorState(true)
          setNotification(
            `Information for ${contacts.find(c => c.id === id)?.name} has already been removed from server`
          )
          numberService.getAll()
            .then(response => setContacts(response))
          setTimeout(() => {
            setNotification(null)
            setErrorState(false)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    numberService.getAll()
      .then(response => setContacts(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={errorState} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <AddForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} onClick={addNumber} />
      <h2>Numbers</h2>
      <ContactList contacts={contacts} filter={filter} onDelete={deleteNumber} />
    </div>
  )
}

export default App