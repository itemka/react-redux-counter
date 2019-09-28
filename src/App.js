import React from 'react'
import './App.css';
import Button from "./Components/Button/Button";
import ShowNumber from "./Components/ShowNumber/ShowNumber";
import InputValue from "./Components/InputValue/InputValue";
import {connect} from "react-redux";
import {inputMaxValue, inputStartValue, plusNumber, reset, set} from "./Redux/CounterReducer";

class App extends React.Component {
    render = () => {
        return (
            <div className={`generalBlock`}>
                <div className={`bloks`}>
                    <div>
                        <div className={`content`}>
                            <div className={`contentLine`}>
                                <div>Max value</div>
                                <InputValue errorColor={this.props.errorColorMax}
                                            value={this.props.maxValue}
                                            onChangeInput={this.props.inputMaxValue}/>
                            </div>
                            <div className={`contentLine`}>
                                <div>Start value</div>
                                <InputValue errorColor={this.props.errorColorStart}
                                            value={this.props.startValue}
                                            onChangeInput={this.props.inputStartValue}/>
                            </div>
                        </div>
                        <div className={`interfaceManagement`}>
                            <Button onClickButton={this.props.set}
                                    // buttonsTitle={this.props.buttonSet.buttonsTitle}
                                    // access={this.props.buttonSet.access}
                                    buttonsTitle={this.props.buttons[2].buttonsTitle}
                                    access={this.props.buttons[2].access}
                            />
                        </div>
                    </div>
                </div>
                <div className={`bloks`}>
                    <div>
                        <div className={`content`}>
                            <div>
                                <ShowNumber limit={this.props.limit} message={this.props.message}/>
                            </div>
                        </div>
                        <div className={`interfaceManagement`}>
                            <Button onClickButton={this.props.plusNumber}
                                    // buttonsTitle={this.props.buttonPlus.buttonsTitle}
                                    // access={this.props.buttonPlus.access}
                                    buttonsTitle={this.props.buttons[0].buttonsTitle}
                                    access={this.props.buttons[0].access}
                            />
                            <Button onClickButton={this.props.reset}
                                    // buttonsTitle={this.props.buttonReset.buttonsTitle}
                                    // access={this.props.buttonReset.access}
                                    buttonsTitle={this.props.buttons[1].buttonsTitle}
                                    access={this.props.buttons[1].access}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorColorMax: state.CounterReducer.limit.errorColorMax,
        errorColorStart: state.CounterReducer.limit.errorColorStart,
        maxValue: state.CounterReducer.limit.maxValue,
        startValue: state.CounterReducer.limit.startValue,
        // buttonPlus: state.CounterReducer.buttonPlus,
        // buttonReset: state.CounterReducer.buttonReset,
        // buttonSet: state.CounterReducer.buttonSet,
        limit: state.CounterReducer.limit,
        message: state.CounterReducer.message,
        buttons: state.CounterReducer.buttons,
    }
};

const ConnectedApp = connect(mapStateToProps, {inputMaxValue, inputStartValue, plusNumber, reset, set})(App);
export default ConnectedApp;