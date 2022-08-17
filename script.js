const counterElement = (id) => {
    const elm = document.createElement('div');
    elm.innerHTML = `
        <div class="counter-area mx-auto max-w-md mt-10 space-y-5">
        <div
          class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
          <div id="counter${id}" class="text-2xl font-semibold counter-value">0</div>
          <div class="flex space-x-3">
          <input type="number" id="value${id}" class='w-20 bg-green-400 text-white placeholder-white rounded shadow text-center' placeholder="Value"/>
            <button
              id="increment${id}"
              class="bg-indigo-400 text-white px-3 py-2 rounded shadow increment-btn"
            >
              Increment
            </button>
            <button
              id="decrement${id}"
              class="bg-red-400 text-white px-3 py-2 rounded shadow decrement-btn"
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
      `;
      const counterBody = document.querySelector(".Counter-cards");
      counterBody.appendChild(elm);
}

//initial value
let numberOfCounter = 0;

///first elements
counterElement(numberOfCounter);

//initial value for first elem
const initialState = [
    {
        value: 0,
    }
];

////reducer 
const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT': {
        if(!state[action.payload.index]) {
            return [...state,{ value: initialState[action.payload.index].value + action.payload.num }]
        }
        return state.map((item,index) => {
                if(index === action.payload.index) {
                    return {
                        ...item,
                        value: item.value + action.payload.num,
                    }
                }

                return item;
            })
        }

        case 'DECREMENT': {
            if(!state[action.payload.index]) {
                return [...state,{ value: initialState[action.payload.index].value - action.payload.num }]
            }
            return state.map((item,index) => {
                if(index === action.payload.index) {
                    return {
                        ...item,
                        value: item.value - action.payload.num,
                    }
                }

                return item;
            })
        }

        case 'CLEAR': {
            return [...initialState];
        }

        default:
            return state;
    }
}


const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    const counterEl = document.querySelectorAll('.counter-value');
    state.map((item,index) => {
        counterEl[index].innerText = item.value;
        return item;
    }) 
}

render();
store.subscribe(render);

const cards = document.querySelector('.Counter-cards');
cards.addEventListener("click", (e)=> {
    const target = e.target.id;
    let defaultValue = 1;
    const inputValue = document.getElementById(`value${target[target.length - 1]}`);
    if(inputValue.value) defaultValue = parseInt(inputValue.value);
    if(target.includes('increment')) {

        store.dispatch( {
            type: 'INCREMENT',
            payload: {
                num: defaultValue,
                index: parseInt(target[target.length - 1]),
            }
        })
    }
    else if(target.includes('decrement')) {
        store.dispatch( {
            type: 'DECREMENT',
            payload: {
                num: defaultValue,
                index: parseInt(target[target.length - 1]),
            }
        })
    }
})

const addCounter = document.querySelector('.addCounter');
const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    store.dispatch({
        type: 'CLEAR'
    })
})

addCounter.addEventListener('click', ()=> {
    initialState.push({
        value: 0,
    })
    counterElement(++numberOfCounter);
})

