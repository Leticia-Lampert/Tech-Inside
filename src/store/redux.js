import {createStore} from 'redux';

const INITIAL_STATE = {
    answers: {},
    questions: [],
    name: '',
    rows: [{
        name: 'leticia',
        date: '12/04/2022',
        
    }],
    user: null
}

const setRow = (state, action) => {
    
    let newRows = state.rows,
        newDate = `${action.date.getDate()}/${action.date.getMonth() + 1}/${action.date.getYear()}`

    newRows.push({
        name: action.name,
        date: newDate,
        answers: action.answers
    })

    return Object.assign({...state}, {
        rows: newRows
    })
}

const setUser = (state, action) => {
    console.log("action", action)
    return Object.assign({ ...state}, {
        user: action.user
    })
}

function answer(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'SET_USER':
            return setUser(state, action)
        case 'ADD_ROW':
            return setRow(state, action)
        case 'ADD_ANSWER':
            let quest = state.questions

            if(!quest.includes(action.idQuestion)) {
                quest.push(action.idQuestion)
            }

            return Object.assign({ ...state, questions: quest, answers: Object.assign({}, {
                ...state.answers, [action.idQuestion]: {
                    value: action.value,
                    question: action.question
                }
            })});
        case 'GET_NAME':
            return Object.assign({ ...state, name: action.name });
        default:
            return state;
    }
}

const store = createStore(answer);

export default store;