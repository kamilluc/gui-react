import * as React from 'react';
import './Author.css';
import * as Ui from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from "./Auth";
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';


class Author extends React.Component {
    instance = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedAuthor: {
                id: '',
                name: ''
            },
            authors: [],
            open: false,
        };
        this.instance = axios.create({
            baseURL: 'http://restapp.dev/app_dev.php/author',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });
    }

    handleAuthorClick = (author) => {
        this.setState({selectedAuthor: author});
    };
    //
    // handleAuthorClick = (author) => {
    //     this.setState({selectedAuthor: author});
    // };
    // handleSave = () => {
    //     // tu obsluzymy zapytanie HTTP - edycja autora
    // };
    // handleNew = () => {
    //     // tu obsluzymy zapytanie HTTP - nowy autor
    // };
    // handleRemove = () => {
    //     // tu obsluzymy zapytanie HTTP - nowy autor
    // };

    onAuthorNameChange = (event) => {
        let author = this.state.selectedAuthor;
        author.name = event.target.value;
        this.setState({
            selectedAuthor: author
        });
    };
    handleSave = () => {
        if (this.state.selectedAuthor.name == '') {
            this.setState({
                open: true,
            });
        }
        else {
            let id = this.state.selectedAuthor.id;
            //this.instance.post(id + '/update', {
            this.instance.post('/update/' + id, {
                name: this.state.selectedAuthor.name
            }).then(response => {
                this.refreshAuthorsList();
            })
        }
    };
    handleNew = () => {
        if (this.state.selectedAuthor.name == '') {
            this.setState({
                open: true,
            });
        }
        else {
            this.instance.put('/create', {
                name: this.state.selectedAuthor.name
            }).then(response => {
                this.refreshAuthorsList();
            })
        }
    };

    handleRemove = () => {
        let id = this.state.selectedAuthor.id;
        this.instance.delete(id).then(response => {
            this.refreshAuthorsList();
            // Wyczysc formularz
            this.setState({selectedAuthor : {
                id: '',
                name: ''
            }})
        })
    };

    refreshAuthorsList = function() {
        this.instance.get('/')
            .then(response => {
                let authors = response.data;
                this.setState({
                    authors
                });
            })
            .catch(error => {
                if (error.response.status == 401)
                    this.props.history.push('/login');
            });
    };

    handleRequestClose = () => {
         this.setState({
             open: false,
         });
     };

    componentDidMount = () => {
        if(!Auth.isUserAuthenticated())
            this.props.history.push('/login');
        else {
            this.refreshAuthorsList();
        }
    };

    AuthorForm = (props) => {
        let nameInput = <Ui.TextField floatingLabelText="Name" value={this.state.selectedAuthor.name}
                                      onChange={this.onAuthorNameChange}/>;
        return (
            <form>
                <div>
                    {nameInput}
                </div>
                <div>
                    <Ui.FlatButton label="New" secondary={true} onClick={this.handleNew}
                                   icon={<Ui.FontIcon className="material-icons">create</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedAuthor.id} label="Save" primary={true}
                                   onClick={this.handleSave}
                                   icon={<Ui.FontIcon className="material-icons">save</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedAuthor.id} label="Remove"
                                   secondary={true}
                                   onClick={this.handleRemove}
                                   icon={<Ui.FontIcon className="material-icons">delete</Ui.FontIcon>}/>
                </div>
            </form>
        )
    };
    // <Ui.ListItem primaryText={author.name} onClick={() => this.handleAuthorClick(author)}/>
    AuthorList = (props) => {
        const authors = props.authors;
        const listItems = authors.map((author) => <Ui.ListItem key={author.id} primaryText={author.name} onClick={() => {
            return this.handleAuthorClick(author);
        }}/>);
        return (
            <Ui.List>{listItems} </Ui.List>
        );
    };

    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <h3>Authors</h3>
                    <Ui.Paper zDepth={1} className="left-column">
                        <this.AuthorList authors={this.state.authors}/>
                    </Ui.Paper>
                    <Ui.Paper zDepth={1} className="right-column">
                        <this.AuthorForm/>
                    </Ui.Paper>
                    <Snackbar open={this.state.open} message="Error! Empty name." autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }


}
export default Author;