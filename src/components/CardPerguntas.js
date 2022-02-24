import React, { useState }from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../css/card.css";
import apagar from "../images/apagar.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase'

export default function CardPerguntas(props) {
  const { pergunta, excluirPergunta } = props;
  const [save, setSave] = useState(pergunta.snap)

  const handleChange = (e) => {
    setSave(e.target.value)
    console.log('change')
  }

  const salvarPergunta = async () => {
    const salvarRef = doc(db, "perguntas", pergunta.id);
    console.log('perguntar')
    await updateDoc(salvarRef, {
      pergunta: save
    });
  }

  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        <div className="images" onClick={() => excluirPergunta(pergunta.id)} >
          <img src={apagar} alt="Deletar pergunta" />
        </div>
        <div className="text">
          <TextField
            fullWidth
            label="clique para alterar"
            id="outlined-multiline-static"
            defaultValue={pergunta.snap}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button className="botao" onClick={() => salvarPergunta()}> Salvar Alteração</Button>
      </CardActions>
    </Card>
  );
}
