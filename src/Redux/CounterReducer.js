const PLUS_NUMBER = `PLUS_NUMBER`;
const RESET = `RESET`;
const SET = `SET`;
const INPUT_MAX_VALUE = `INPUT_MAX_VALUE`;
const INPUT_START_VALUE = `INPUT_START_VALUE`;

export const plusNumber = () => ({type: PLUS_NUMBER});
export const reset = () => ({type: RESET});
export const set = () => ({type: SET});
export const inputMaxValue = event => ({type: INPUT_MAX_VALUE, event: event});
export const inputStartValue = event => ({type: INPUT_START_VALUE, event: event});

let accessButtons = (buttons, id, access) => {
    let b = buttons.map(item => {
        if (item.id === 3) {
            item.access = access;
            return item;
        } else {
            item.access = !access;
            return item;
        }
    });
    return b;
};

const initialState = {
    counter: 0,
    buttonPlus: {id: 1, buttonsTitle: '+', access: true},
    buttonReset: {id: 2, buttonsTitle: 'Reset', access: true},
    buttonSet: {id: 3, buttonsTitle: 'Set', access: false},
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
    switch (action.type) {
        case PLUS_NUMBER: {
            if (state.counter < state.limit.maxValue) {
                if (state.counter < state.limit.maxValue - 1) {
                    return {
                        ...state,
                        button: state.buttons.map(item=>({...item})),
                        // buttonPlus: {...state.buttonPlus},
                        // buttonReset: {...state.buttonReset},
                        // buttonSet: {...state.buttonSet},
                        counter: state.counter + 1,
                        message: state.message + 1,
                        limit: {...state.limit, errorColorStart: false, errorColorMax: false, errorEnd: false}
                    }
                } else {
                    return {
                        ...state,
                        button: state.buttons.map(item=>({...item})),
                        // buttonPlus: {...state.buttonPlus},
                        // buttonReset: {...state.buttonReset},
                        // buttonSet: {...state.buttonSet},
                        counter: state.counter + 1,
                        message: state.message + 1,
                        limit: {...state.limit, errorEnd: true}
                    }
                }
            } else {
                return {
                    ...state,
                    button: state.buttons.map(item=>({...item})),
                    // buttonPlus: {...state.buttonPlus},
                    // buttonReset: {...state.buttonReset},
                    // buttonSet: {...state.buttonSet},
                    limit: {...state.limit, errorEnd: true}
                }
            }
        }
        case RESET: {
            return {
                ...state,
                button: state.buttons.map(item=>({...item})),
                // buttonPlus: {...state.buttonPlus},
                // buttonReset: {...state.buttonReset},
                // buttonSet: {...state.buttonSet},
                counter: state.limit.startValue,
                message: state.limit.startValue,
                limit: {...state.limit, errorEnd: false},
            }
        }
        case SET: {
            if (state.limit.maxValue > state.limit.startValue && state.limit.startValue >= 0) {
                return {
                    ...state,
                    counter: state.limit.startValue,
                    message: state.limit.startValue,
                    buttons: accessButtons(state.buttons, 3, false),
                    // buttonPlus: {...state.buttonPlus, access: true},
                    // buttonReset: {...state.buttonReset, access: true},
                    // buttonSet: {...state.buttonSet, access: false},
                    limit: {...state.limit, errorEnd: false}
                }
            }
        }
        case INPUT_MAX_VALUE: {
            if (action.event > state.limit.startValue) {
                return {
                    ...state,
                    buttons: accessButtons(state.buttons, 3, true),
                    // buttonPlus: {...state.buttonPlus, access: false},
                    // buttonReset: {...state.buttonReset, access: false},
                    // buttonSet: {...state.buttonSet, access: true},
                    limit: {...state.limit, maxValue: action.event, errorColorMax: false, errorEnd: false},
                    message: state.messageAccess,
                }
            } else {
                return {
                    ...state,
                    buttons: accessButtons(state.buttons, 3, true),
                    // buttonPlus: {...state.buttonPlus, access: false},
                    // buttonReset: {...state.buttonReset, access: false},
                    // buttonSet: {...state.buttonSet, access: true},
                    limit: {...state.limit, maxValue: action.event, errorColorMax: true, errorEnd: false},
                    message: state.messageError,
                }
            }
        }
        case INPUT_START_VALUE: {
            if ((action.event >= 0) && (action.event < state.limit.maxValue)) {
                return {
                    ...state,
                    buttons: accessButtons(state.buttons, 3, true),
                    // buttonPlus: {...state.buttonPlus, access: false},
                    // buttonReset: {...state.buttonReset, access: false},
                    // buttonSet: {...state.buttonSet, access: true},
                    limit: {...state.limit, startValue: action.event, errorColorStart: false, errorEnd: false},
                    message: state.messageAccess,
                }
            } else if ((action.event < 0) || (action.event >= state.limit.maxValue)) {
                return {
                    ...state,
                    buttons: accessButtons(state.buttons, 3, true),
                    // buttonPlus: {...state.buttonPlus, access: false},
                    // buttonReset: {...state.buttonReset, access: false},
                    // buttonSet: {...state.buttonSet, access: true},
                    limit: {...state.limit, startValue: action.event, errorColorStart: true, errorEnd: false},
                    message: state.messageError,
                }
            }
        }
        default: {
            return state;
        }
    }
};

export default CounterReducer;
