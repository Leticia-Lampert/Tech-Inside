import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase'

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
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
                    <TableCell>Pergunta</TableCell>
                    <TableCell>Resposta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!row && row.answer.map((answerRow) => (
                    <TableRow key={answerRow.question}>
                      <TableCell component="th" scope="row">
                        {answerRow.question}
                      </TableCell>
                      <TableCell>{answerRow.answer}</TableCell>
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

// const rows = [
//   createData("Leticia", getDate()),
//   createData("Guilherme", getDate()),
// ]

export default function CollapsibleTable() {

  const [rows, setRows] = useState([
    {
      name: 'Guilherme',
      date: '07/04/2022',
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
    },
    {
      name: 'Leticia',
      date: '07/04/2022',
      answer: [
        {
          question: "Qual a nota da classe?",
          answer: 6,
        },
        {
          question: "tá ai?",
          answer: 0,
        },
      ],
    }
  ])

  const getAllQuestions = async () => {

    const getQuestions = await getDocs(collection(db, "perguntas"))

    let questions = []

    getQuestions.forEach((doc) => {
      questions.push({
        questionId: doc.id,
        question: doc.data().pergunta
      })
      console.log(`${doc.id} => ${doc.data().pergunta}`);
    })

    console.log('questions', questions)
    return questions
  } 

  useEffect(async () => {
    // let newRows = rows

    getAllQuestions()
    // newRows.push(createData('Gustavo', getDate()))

    // const getAnswers = await getDocs(collection(db, "respostas"));
    // getAnswers.forEach(async (doc) => {
    //   const getForm = await getDocs(collection(db, "respostas", doc.id, 'perguntas'));
    //   getForm.forEach((snap) => {
        
    //     console.log(`${snap.id} => ${snap.data().value}`);
    //   })
    //   console.log(`${doc.id} => ${doc.data().name}`);
    // })

    // setRows(newRows)
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
              <div>
                <TableCell align="right">Data</TableCell>
              </div>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log('teste', rows)} */}
            {!!rows && rows.map((row) => {
              return <Row key={row.name} row={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
