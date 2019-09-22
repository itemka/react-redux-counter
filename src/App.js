import React from 'react'
import './App.css';
import Button from "./Components/Button/Button";
import ShowNumber from "./Components/ShowNumber/ShowNumber";
import InputValue from "./Components/InputValue/InputValue";
import {connect} from "react-redux";
import {plusNumber, reset} from "./Redux/CounterReducer";

class App extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
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


    onClickPlusNumber = () => {
        if (this.state.counter < this.state.limit.maxValue) {

            if (this.state.counter < this.state.limit.maxValue - 1) {
                this.setState({
                    counter: this.state.counter + 1,
                    message: this.state.counter + 1,
                    limit: {...this.state.limit, errorColorStart: false, errorColorMax: false, errorEnd: false}
                });
            } else {
                this.setState({
                    counter: this.state.counter + 1,
                    message: this.state.counter + 1,
                    limit: {...this.state.limit, errorEnd: true}
                })
            }

        } else {
            this.setState({
                limit: {...this.state.limit, errorEnd: true}
            })
        }
    };

    onClickReset = () => {
        this.setState({
            counter: this.state.limit.startValue,
            message: this.state.limit.startValue,
            limit: {...this.state.limit, errorEnd: false}
        })
    };

    accessButtons = (id, access) => {
        let copyButtons = this.state.buttons.map(item => {
            if (item.id === 3) {
                item.access = access;
                return item;
            } else {
                item.access = !access;
                return item;
            }
        });
        return copyButtons;
    };

    onClickSet = () => {
        if (this.state.limit.maxValue > this.state.limit.startValue && this.state.limit.startValue >= 0) {
            this.setState({
                counter: this.state.limit.startValue,
                message: this.state.limit.startValue,
                buttons: this.accessButtons(3, false),
                limit: {...this.state.limit, errorEnd: false}
            });
        }
    };

    onChangeInputMaxValue = (event) => {
        if (event > this.state.limit.startValue) {
            this.setState({
                buttons: this.accessButtons(3, true),
                limit: {...this.state.limit, maxValue: event, errorColorMax: false, errorEnd: false},
                message: this.state.messageAccess,
            });
        } else {
            this.setState({
                buttons: this.accessButtons(3, true),
                limit: {...this.state.limit, maxValue: event, errorColorMax: true, errorEnd: false},
                message: this.state.messageError,
            });
        }
    };

    onChangeInputStartValue = (event) => {
        if ((event >= 0) && (event < this.state.limit.maxValue)) {
            this.setState({
                buttons: this.accessButtons(3, true),
                limit: {...this.state.limit, startValue: event, errorColorStart: false, errorEnd: false},
                message: this.state.messageAccess,
            });
        } else if ((event < 0) || (event >= this.state.limit.maxValue)) {
            this.setState({
                buttons: this.accessButtons(3, true),
                limit: {...this.state.limit, startValue: event, errorColorStart: true, errorEnd: false},
                message: this.state.messageError,
            });
        }
    };


    render = () => {
        return (
            <div className={`generalBlock`}>
                <div className={`bloks`}>
                    <div>
                        <div className={`content`}>
                            <div className={`contentLine`}>
                                <div>Max value</div>
                                <InputValue errorColor={this.state.limit.errorColorMax}
                                            value={this.state.limit.maxValue}
                                            onChangeInput={this.onChangeInputMaxValue.bind(this.state)}/>
                            </div>
                            <div className={`contentLine`}>
                                <div>Start value</div>
                                <InputValue errorColor={this.state.limit.errorColorStart}
                                            value={this.state.limit.startValue}
                                            onChangeInput={this.onChangeInputStartValue.bind(this.state)}/>
                            </div>
                        </div>
                        <div className={`interfaceManagement`}>
                            <Button onClickButton={this.onClickSet.bind(this.state)}
                                    buttonsTitle={this.state.buttons[2].buttonsTitle}
                                    access={this.state.buttons[2].access}/>
                        </div>
                    </div>
                </div>
                <div className={`bloks`}>
                    <div>
                        <div className={`content`}>
                            <div>
                                <ShowNumber limit={this.state.limit} message={this.state.message}/>
                            </div>
                        </div>
                        <div className={`interfaceManagement`}>
                            <Button onClickButton={this.props.onClickPlusNumber}
                                    buttonsTitle={this.state.buttons[0].buttonsTitle}
                                    access={this.state.buttons[0].access}/>
                            <Button onClickButton={this.props.onClickReset}
                                    buttonsTitle={this.state.buttons[1].buttonsTitle}
                                    access={this.state.buttons[1].access}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {
        onClickPlusNumber: ()=>dispatch(plusNumber()),
        onClickReset: ()=>dispatch(reset()),
    }
};
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;