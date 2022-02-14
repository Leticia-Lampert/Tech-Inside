import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../css/card.css";
import apagar from "../images/apagar.svg";

export default function CardPerguntas(props) {
  const { pergunta } = props;

  const excluirPergunta = () => {
    console.log("teste")
  }

  const salvarPergunta = () => {
    console.log("testando")
  }

  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent>
        <div className="images" onClick={() => excluirPergunta()} >
          <img src={apagar} alt="Deletar pergunta" />
        </div>
        <div className="text">
          <TextField
            fullWidth
            label="clique para alterar"
            id="outlined-multiline-static"
            defaultValue={pergunta}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button className="botao" onClick={() => salvarPergunta()}> Salvar </Button>
      </CardActions>
    </Card>
  );
}
