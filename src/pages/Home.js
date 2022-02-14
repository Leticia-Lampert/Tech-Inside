import CardPerguntas from "../components/CardPerguntas"
import "../css/home.css"

function Home() {

    const data = [
        {
            pergunta: 'Qual é a sua pergunta?'
        },
        {
            pergunta: 'Não sei, e a sua? '
        },
        {
            pergunta: 'Qual é a sua pergunta?'
        },
        {
            pergunta: 'Não sei, e a sua? '
        },
        {
            pergunta: 'Qual é a sua pergunta?'
        },
        {
            pergunta: 'Não sei, e a sua? '
        }
    ]

    return(
            <div className="component"> 
                {!!data ? data.map((item, index) => {
                    return (
                        <div key={index} className='cardComponent'>
                            <CardPerguntas pergunta={item.pergunta} />
                        </div>
                    ) 
                })
                :
                <></>
                } 
            </div> 
            
    )
}

export default Home