import CardPerguntas from "../components/CardPerguntas"
import "../css/home.css"
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase"
import NavBar from "../components/NavBar"

function Home() {

    const [perguntas, setPerguntas] = useState(null);
   
    const pergunta = ['qual a sua pergunta?']
    
    // const [validation, setValidation] = useState(true);    

    // useEffect(() => {
    //     if(!!validation ) {
    //         setValidation(false)
    //         getQuestions()
    //     }
    // });

    // const getQuestions = async () => {

    //     let question = []

    //     const querySnapshot = await getDocs(collection(db, "perguntas"));
        
    //     await querySnapshot.forEach((doc) => {
    //         question.push(doc.data().pergunta)
    //     });
    //     // console.log('perguntas =', perguntas)
    //     setPerguntas(question)
    // }
    
    return(  
            <div >
                <NavBar />
            <div className="component"> 
               {!!perguntas && perguntas.length > 0 ? perguntas.map((item, index) => {
                    return (
                        <div key={index} className='cardComponent'>
                            <CardPerguntas pergunta={item} />
                        </div>
                 ) 
                })
                :
                <></>
                } 
            </div> 
            </div>
    )
}

export default Home