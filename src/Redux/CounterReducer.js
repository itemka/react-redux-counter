const PLUS_NUMBER = `PLUS_NUMBER`;
const RESET = `RESET`;

export const plusNumber = () => ({type: PLUS_NUMBER});
export const reset = () => ({type: RESET});

let accessButtons = (buttons, id, access) => {
    buttons.map(item => {
        if (item.id === 3) {
            item.access = access;
            return item;
        } else {
            item.access = !access;
            return item;
        }
    });
    return buttons;
};

const initialState = {
    counter: 0,
    buttons: [
        {id: 1, buttonsTitle: '+', access: true},
        {id: 2, buttonsTitle: 'Reset', access: true},
        {id: 3, buttonsTitle: 'Set', access: false},
    ],
    limit: {
        startValue: 0, maxValue: 5,
        errorColorStart: false, errorColorMax: false,
        errorEnd: false,
    },
    message: 0,
    messageAccess: "Enter values and press 'Set'",
    messageError: "Incorrect value!"
};

const CounterReducer = (state = initialState, action) => {
    let copyState = {...state};
    switch (action.type) {
        case PLUS_NUMBER: {
            if (copyState.counter < copyState.limit.maxValue) {
                if (copyState.counter < copyState.limit.maxValue - 1) {
                    return {
                        counter: copyState.counter + 1,
                        message: copyState.message + 1,
                        limit: {...copyState.limit, errorColorStart: false, errorColorMax: false, errorEnd: false}
                    }
                } else {
                    return {
                        counter: copyState.counter + 1,
                        message: copyState.message + 1,
                        limit: {...copyState.limit, errorEnd: true}
                    }
                }
            } else {
                return {
                    limit: {...copyState.limit, errorEnd: true}
                }
            }
        }
        case RESET: {
            return {
                counter: copyState.limit.startValue,
                message: copyState.limit.startValue,
                limit: {...copyState.limit, errorEnd: false},
            }
        }

        default:
            return {state}
    }
};

export default CounterReducer;
