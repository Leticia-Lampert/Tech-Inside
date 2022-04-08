import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../css/navBar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase'
import BoxQuestion from "../components/BoxQuestion"
import { useSelector } from 'react-redux'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebase'
import _ from 'lodash'

export default function NavBar(props) {
  const reducer = useSelector(state => state)

  const { setValidation, answer, setPerguntas } = props

  const [open, setOpen] =  React.useState(false);

  const criarPergunta = () => {
    setOpen(true)
    setPerguntas(null)
  }

  const resposta = () => {
    console.log("teste")
    window.location.href ='http://localhost:3000/useranswer'
  }

  const handleClose = () => {
    setOpen(false)
    setValidation(true)
  };

  const logout = () => {
    signOut(auth).then(() => {
      console.log('Logout com sucesso')
      window.location.href ='http://localhost:3000/autenticacao'
    }).catch((error) => {
      console.error('Logout sem sucesso', error)
    });
  }

  const salvarQuestionario = async () => {

    console.log("reducer", reducer)

    const docRef = await addDoc(collection(db, "respostas"), {
      name: reducer.name
    })

    reducer.questions.forEach(async (item) => {
      console.log('item', item)
      const docRefQuestion = await setDoc(doc(db, "respostas", docRef.id, "perguntas", item), {
        value: reducer.answers[item].value
      })
    })
  }

  return (
    <div>
      <div className="navBar">
        <BoxQuestion setValidation={setValidation}  handleClose={handleClose} open={open}/>
        <Box >
          <AppBar >
            <Toolbar>
              { answer == 'answer'
                ?
                <Button className="botao" onClick={() => salvarQuestionario()}> Salvar Questionário</Button>             
                :
                <div>
                <Button color="inherit" onClick={() => criarPergunta()}>Criar pergunta</Button> 
                <Button color="inherit" onClick={() => logout()}>logout</Button>
                <Button color="inherit" onClick={() => resposta()}> Resposta do Usuário</Button>
                </div>
              }
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  );
}