import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '7px', transform: 'scale(0.8)'}}
  >
  </Box>
);

export default function CardPerguntas() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
         <img src={"..images/editar.svg"} alt="" />
         <img src={"..images/delete.svg"} alt=""/>
          <TextField
          id="outlined-multiline-static"
          label="insira uma mensagem"
          multiline
          rows={4}
          defaultValue=""
        />        
      </CardContent>
      <CardActions>
        <Button size="small">Salvar</Button>
      </CardActions>
    </Card>
  );
}
