import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../css/boxQuestion.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'

export default function BoxQuestion(props) {
  const [question, setQuestion] = useState()
  const { open, handleClose, setValidation } = props

  const handleChange = (e) => {
    setQuestion(e.target.value)
  }

  const salvar = async () => {
    const docRef = await addDoc(collection(db, "perguntas"), {
      pergunta: question
    });
    handleClose()
    setValidation(true)
    console.log('teste')
 }

  return (
    <div className='box'>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar pergunta</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Insira uma pergunta"
            type="pergunta"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => salvar()}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
