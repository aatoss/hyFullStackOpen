import Contact from './Contact'

const ContactList = ({ contacts, filter, onDelete }) => {

    return contacts.map(contact => {
        if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
            return (
                <Contact key={contact.name} contact={contact} onDelete={onDelete} />
            )
        }
    })
}

export default ContactList