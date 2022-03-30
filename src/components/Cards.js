import React, { useState }from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../css/card.css";
import apagar from "../images/apagar.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import Slider from '@mui/material/Slider';

export default function Cards(props) {
  const {
    pergunta,
    excluirPergunta,
    disabled,
    answer,
    name
  } = props;
  const [save, setSave] = useState(pergunta.snap)

  const handleChange = (e) => {
    setSave(e.target.value)
  }

  const salvarPergunta = async () => {
    const salvarRef = doc(db, "perguntas", pergunta.id);
    console.log('perguntar')
    await updateDoc(salvarRef, {
      pergunta: save
    });
  }

  const slider = (e) => {
    setSave(e.target.value)
  }

  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        {
          answer == 'answer' 
          ?
            <div/>
          :
            <div className="images" onClick={() => excluirPergunta(pergunta.id)} >
              <img src={apagar} alt="Deletar pergunta" />
            </div>
        }
        <div className="text">
          <TextField
            disabled={!!disabled ? true : false}
            fullWidth
            label={!!name ? 'Digite seu nome' : !!answer ? '' : "clique para alterar"}
            id="outlined-multiline-static"
            defaultValue={pergunta.snap}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </CardContent>
      <CardActions>
        {
          name == 'name'
          ?
          <div />
          :
          answer == 'answer' 
          ?
          <div className='slider'>
            <Slider
              defaultValue={5}
              aria-label="Default"
              valueLabelDisplay="auto" 
              onChange={(e) => slider(e)}
              marks
              min={0}
              max={10}/>
            </div>
          :
          <Button className="botao" onClick={() => salvarPergunta()}> Salvar Alteração</Button>
        }
      </CardActions>
    </Card>
  );
}
