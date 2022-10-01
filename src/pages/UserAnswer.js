import * as React from "react"
import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useSelector, useDispatch } from 'react-redux'
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom'

import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import "../css/userAnswer.css"

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Pergunta:</TableCell>
                    <TableCell>Resposta:</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!row.answers && row.answers.map((answerRow) => {
                    return(
                      <TableRow key={answerRow.question}>
                        <TableCell component="th" scope="row">
                          {answerRow.question}
                        </TableCell>
                        <TableCell>{answerRow.value}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function UserAnswer() {
  
  const [perguntas, setPerguntas] = React.useState(null)
  const [validation, setValidation] = React.useState(true)
  
  const rows = useSelector(state => state.rows)
  const dispatch = useDispatch()

  const history = useNavigate()

  const getAllAnswer = async () => {

    getAnswers().then((form) => {

        dispatch({ type: 'ADD_ROW', form })
    })
  }

  const getAnswers = async () => {
    const getAnswers = await getDocs(collection(getFirestore(), "respostas"))

    let form = []

    getAnswers.forEach(async (snap) => {
      let doc = snap.data()

      let answers = []

      doc.questions.forEach((item) => {
        answers.push({
          question: item.question,
          value: item.value
        })
      })

      form.push({
        type: 'ADD_ROW',
        name: doc.name,
        answers: answers
      })
    })

    return Promise.resolve(form)
  }

  useEffect(() => {
    const user = localStorage.getItem("user")

    if(user === true) {
      history('/')
    } 

    getAllAnswer()

  }, [])

  return (
    <div>
      <NavBar userAnswer='userAnswer' setValidation={setValidation} setPerguntas={setPerguntas}/>
      <div className="usersAnswers">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Respostas dos Usuários:</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows && rows.map((row) => {
                return <Row key={row.name} row={row} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
