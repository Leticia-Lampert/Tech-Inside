import Cards from "../components/Cards"
import "../css/home.css"
import { doc, deleteDoc, collection, query, onSnapshot, getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar"

function Home() {

    const [perguntas, setPerguntas] = useState(null); 
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        
        if(!!validation) {
            ajustQuestion()
            setValidation(false)
        }
    }, [validation]);

    const ajustQuestion = (() => {
        setPerguntas(null)
        getQuestions()
    })

    const excluirPergunta = async (id) => {
        await deleteDoc(doc(getFirestore(), "perguntas", id));
        setValidation(true)
        setPerguntas(null)
    }

    const getQuestions = () => {

        let question = []

        const q = query(collection(getFirestore(), "perguntas"));

        onSnapshot(q, (snapShot) => {
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
    
    return(  
        <div >
            <NavBar setValidation={setValidation} setPerguntas={setPerguntas} />
            <div className="component"> 
                {!!perguntas && perguntas.length > 0 ? perguntas.map((item, index) => {
                    return (
                        <div key={index} className='cardComponent'>
                            <Cards pergunta={item} excluirPergunta={excluirPergunta} />
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