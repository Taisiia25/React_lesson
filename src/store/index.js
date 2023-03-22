import { createStore } from 'redux';

const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INC': 
            return {counter: state.counter + 1}
        case 'DEC': 
                return {counter: state.counter -1}
        default:
             return state;
    }    
}

const store  = createStore(reducer);

store.subscribe(() => {
    console.log(store.getState())
})

// console.log('Before inc: ', store.getState().counter); // 0

store.dispatch({type: 'INC'});

// console.log('After inc ', store.getState().counter); // 1

store.dispatch({type: 'DEC'});

// console.log('After dec ', store.getState().counter); // 0

export default store;