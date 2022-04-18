import {createStore} from 'redux';

const INITIAL_STATE = {
    answers: {},
    questions: [],
    name: '',
    rows: [],
    user: null
}

const setRow = (state, action) => {

    return Object.assign({...state}, {rows: action.form})
}

const setUser = (state, action) => {
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