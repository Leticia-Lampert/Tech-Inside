import {createStore} from 'redux';

const INITIAL_STATE = {
    answers: {},
    questions: [],
    name: ''
}


function answer(state = INITIAL_STATE, action) {
    switch (action.type){
        case 'ADD_ANSWER':
            let quest = state.questions

            if(!quest.includes(action.idQuestion)) {
                quest.push(action.idQuestion)
            }

            return Object.assign({ ...state, questions: quest, answers: Object.assign({}, {
                ...state.answers, [action.idQuestion]: {
                    value: action.value
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