import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" style={{ color: "inherit" }}>
                    Blog App
        </Typography>
        <Box>
          {user && (
            <Typography variant="body1" component="span" style={{ marginRight: 10 }}>
              {user.name} logged in
            </Typography>
          )}
          <Button color="inherit" component={Link} to="/">
                        Blogs
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
                            Add new blog
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} to="/login">
                            Login
            </Button>
          )}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
                            Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>)
}

export default Navigation