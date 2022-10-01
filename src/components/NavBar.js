import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import '../css/navBar.css'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import BoxQuestion from "../components/BoxQuestion"
import { useSelector, useDispatch } from 'react-redux'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"
import { db } from '../firebase'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

export default function NavBar(props) {
  const dispatch = useDispatch()
  const reducer = useSelector(state => state)

  const { setValidation, answer, setPerguntas, userAnswer } = props

  const [open, setOpen] =  React.useState(false)

  const history = useNavigate()

  const criarPergunta = () => {

    console.log('setPerguntas', setPerguntas)

    setOpen(true)
    setPerguntas(null)
  }

  const resposta = () => {
    history('/respostacliente')
  }

  const handleClose = () => {
    setOpen(false)
    setValidation(true)
  }

  const logout = () => {
    signOut(auth).then(() => {
    
      dispatch({ type: 'SET_USER', user: null })

      localStorage.setItem('user', null)

      history("/")

    }).catch((error) => {
      console.error('Logout sem sucesso', error)
    })
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

    history('/feedback')
  }

  const questions = () => {
    history('/home')
  }

  return (
    <div>
      <div className="navBar">
        <BoxQuestion setValidation={setValidation}  handleClose={handleClose} open={open}/>
        <Box >
          <AppBar >
            <Toolbar>
              { answer === 'answer'
                ?
                <Button className="botao" onClick={() => salvarQuestionario()}> Salvar Questionário</Button>             
                :
                <div>
                <Button color="inherit" onClick={() => criarPergunta()}>Criar pergunta</Button> 
                <Button color="inherit" onClick={() => logout()}>logout</Button>
                {
                  userAnswer === 'userAnswer' 
                  ?
                  <Button color="inherit" onClick={() => questions()}>Alterar Perguntas</Button>
                  :
                  <Button color="inherit" onClick={() => resposta()}> Respostas dos Usuários</Button>
                }
                </div>
              }
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  )
}