import * as React from 'react';
import './Login.css';
import * as Ui from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component {
    constructor(props) {
        super(props);
    };


    handleAuthorClick = (author) => {
        this.setState({selectedAuthor: author});
    };

    handleAuthorClick = (author) => {
        this.setState({selectedAuthor: author});
    };
    handleSave = () => {
        // tu obsluzymy zapytanie HTTP - edycja autora
    };
    handleNew = () => {
        // tu obsluzymy zapytanie HTTP - nowy autor
    };
    handleRemove = () => {
        // tu obsluzymy zapytanie HTTP - nowy autor
    };


    style = {
        height: 250,
        width: 300,
        margin: '200px auto auto auto',
        display: 'block',
        padding: '20px 20px 20px 20px'
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.Paper zDepth={3} style={this.style}>
                        <div>
                            <Ui.TextField floatingLabelText="Username"/>
                        </div>
                        <div>
                            <Ui.TextField floatingLabelText="Password" type="password"/></div>
                        <div> <Ui.RaisedButton label="Login" primary={true} /></div>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>
        );
    }

}
export default Login;