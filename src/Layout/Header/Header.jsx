import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1,marginBottom:"100px"}}>
      <AppBar position="static" sx={{backgroundColor:"black" }}>
        <Toolbar>
          <IconButton
            size="extralarge"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,fontWeight:"20" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Video Player
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
