import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    clickMeMethod = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="Click Me!" onClick={this.clickMeMethod}/>
                    <Snackbar
                        open={this.state.open}
                        message="Brawo!"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
