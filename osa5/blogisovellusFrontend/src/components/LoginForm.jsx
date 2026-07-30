import { Box, Typography, TextField, Button } from "@mui/material";

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
      <Typography variant="h3" style={{ marginBottom: 10 }} >Login</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: 10 }}>
                    Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;