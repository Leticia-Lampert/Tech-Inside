import React from 'react';
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import '../css/feedback.css'

export default function Feedback(props) {

  return (
    <div className='feedback'>
        <div style={{ 
            display: "flex",
            justifyContent: "center", 
            alignItens: "center",
            padding: "40px",
            backgroundColor: "#fff",
            color: "rgba(0, 0, 0, 0.87)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            borderRadius: "4px",
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            overflow: "hidden"
        }}>
            Obrigado(a) pelo Feedback!
      </div>
    </div>
  );
}
