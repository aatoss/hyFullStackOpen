const Contact = ({ contact, onDelete }) => {
    return (
        <div style={{ display: 'flex' }}>
            <p>{`${contact.name}: ${contact.number}`}</p>
            <button style={{ margin: '10px' }} onClick={() => onDelete(contact.id)}>
                delete
            </button>
        </div>
    )
}

export default Contact