import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../css/navBar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase'
import BoxQuestion from "../components/BoxQuestion"
import { useSelector, useDispatch } from 'react-redux'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebase'
import _ from 'lodash'

export default function NavBar(props) {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state)

  const { setValidation, answer, setPerguntas } = props

  const [open, setOpen] =  React.useState(false);

  const criarPergunta = () => {
    setOpen(true)
    setPerguntas(null)
  }

  const resposta = () => {
    window.location.href ='http://localhost:3000/respostacliente'
  }

  const handleClose = () => {
    setOpen(false)
    setValidation(true)
  };

  const logout = () => {
    signOut(auth).then(() => {
      window.location.href ='http://localhost:3000/'

      dispatch({ type: 'SET_USER', user: null })

      localStorage.setItem('user', false)

    }).catch((error) => {
      console.error('Logout sem sucesso', error)
    });
  }

  const salvarQuestionario = async () => {

    let newQuestions = []

    reducer.questions.forEach((item) => {

      let data = reducer.answers[item]
      
      newQuestions.push({
        value: data.value,
        id: item,
        question: data.question
      })
    })

    const docRef = await addDoc(collection(db, "respostas"), {
      name: reducer.name, 
      date: new Date(),
      questions: newQuestions
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