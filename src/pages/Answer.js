import Cards from "../components/Cards";
import { collection, query, onSnapshot, getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import "../css/answer.css";
import NavBar from "../components/NavBar";
import React from 'react'

function Answer() {

    const [perguntas, setPerguntas] = useState(null); 
    const [validation, setValidation] = useState(true);    

    useEffect(() => {
        if(!!validation) {
            getQuestions()
            setValidation(false)
        }
    });
    
    const getQuestions = async () => {

        let question = []

        const q = query(collection(getFirestore(), "perguntas"));

        onSnapshot(q, async (snapShot) => {
            snapShot.forEach((doc) => {

                let snap = doc.data().pergunta,
                    id = doc.id
                
                question.push({
                    snap: snap,
                    id: id
                })
            });
            setPerguntas(question)
        })
    }

    return (
        <div>
            <NavBar answer = 'answer'/>
            <div className='component'>
                <div className='cardComponent'>
                    <Cards 
                        pergunta={{campo: 'name'}}
                        disabled={false}
                        answer='answer'
                        name='name'
                    />
                </div>
                {!!perguntas && perguntas.length > 0 ? perguntas.map((item, index) => {
                    return (
                        <div key={index} className='cardComponent'>
                            <Cards
                                pergunta={item}
                                disabled={true}
                                answer='answer'
                            />
                        </div>
                    )})
                    :
                    <></>
                } 
            </div>
        </div>
    )

}

export default Answer