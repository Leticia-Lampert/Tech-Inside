import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../css/navBar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase'

export default function NavBar() {

  const criarPergunta = () => {
    console.log("teste")
  }

  const logout = () => {
    signOut(auth).then(() => {
      console.log('Logout com sucesso')
      window.location.href ='http://localhost:3000/autenticacao'
    }).catch((error) => {
      console.error('Logout sem sucesso', error)
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