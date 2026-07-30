import { Alert } from "@mui/material"

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <Alert style={{ marginTop: 10 }} severity={message.type}>{message.text}</Alert>
}

export default Notification
