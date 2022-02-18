import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../css/navBar.css'
import { Auth, signOut } from "firebase/auth";


export default function NavBar() {

  const criarPergunta = () => {
    console.log("teste")
  }

  const logout = () => {
    // console.log("testar")
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  return (
    <div className="navBar">
      <Box >
        <AppBar >
          <Toolbar>
            <Button color="inherit" onClick={() => criarPergunta()}>Criar pergunta</Button>
            <Button color="inherit" onClick={() => logout()}>logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}