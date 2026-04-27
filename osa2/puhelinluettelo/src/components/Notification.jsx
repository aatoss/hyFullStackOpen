const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    if (error) {
        return (
            <div style={{ border: '5px solid red', padding: '10px', margin: '10px', backgroundColor: 'lightcoral', color: 'darkred', fontSize: '20px' }}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={{ border: '5px solid green', padding: '10px', margin: '10px', backgroundColor: 'lightgreen', color: 'green', fontSize: '20px' }}>
                {message}
            </div>
        )
    }
}

export default Notification