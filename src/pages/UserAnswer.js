import * as React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../css/userAnswer.css";

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
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                Resposta
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Pergunta:</TableCell>
                    <TableCell>Resposta:</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!row.answers && row.answers.map((answerRow) => (
                    <TableRow key={answerRow.question}>
                      <TableCell component="th" scope="row">
                        {answerRow.question}
                      </TableCell>
                      <TableCell>{answerRow.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UserAnswer() {
  
  const rows = useSelector(state => state.rows)
  const dispatch = useDispatch()

  const getAllAnswer = async () => {

    const getAnswers = await getDocs(collection(db, "respostas"))

    getAnswers.forEach((snap) => {
      let doc = snap.data()

      console.log('doc', doc)

      let answers = []

      doc.questions.forEach((item) => {
        answers.push({
          question: item.question,
          value: item.value
        })
      })

      console.log('answers', answers)

      let date = new Date(doc.date.seconds * 1000),
        newDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getYear()}`

      console.log('date', date)
      console.log('newDate', newDate)

      dispatch({ type: 'ADD_ROW', name: doc.name, answers: answers, date: newDate })
    })
  }

  useEffect(() => {

    getAllAnswer()

  }, [])

  const getDate = () => {
    let date = new Date()
    let newDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getYear()}`
  
    return newDate
  }

  const createData = (name, date) => {
    return {
      name: name,
      date: date,
      answer: [
        {
          question: "Qual sua nota?",
          answer: 3,
        },
        {
          question: "Qual a nota dele?",
          answer: 10,
        },
      ],
    }
  }

  return (
    <div className="usersAnswers">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Respostas dos Usuários:</TableCell> 
              <TableCell style={{ paddingRight: '10px'}} align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log('rowss', rows)}
            {!!rows && rows.map((row) => {
              console.log('row', row)
              return <Row key={row.name} row={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
