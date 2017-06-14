import * as React from 'react';
import './Book.css';
import * as Ui from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from "./Auth";
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';


class Book extends React.Component {
    instance = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedBook: {
                id: '',
                title: ''
            },
            books: [],
            open: false,
        };
        this.instance = axios.create({
            baseURL: 'http://restapp.dev/book',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });
    }

    handleBookClick = (book) => {
        this.setState({selectedBook: book});
    };

    onBookTitleChange = (event) => {
        let book = this.state.selectedBook;
        book.title = event.target.value;
        this.setState({
            selectedBook: book
        });
    };
    handleSave = () => {
        if (this.state.selectedBook.title == '') {
            this.setState({
                open: true,
            });
        }
        else {
            let id = this.state.selectedBook.id;
            this.instance.post('/update/' + id, {
                title: this.state.selectedBook.title
            }).then(response => {
                this.refreshBooksList();
            })
        }
    };
    handleNew = () => {
        if (this.state.selectedBook.title == '') {
            this.setState({
                open: true,
            });
        }
        else {
            this.instance.put('/create', {
                title: this.state.selectedBook.title
            }).then(response => {
                this.refreshBooksList();
            })
        }
    };

    handleRemove = () => {
        let id = this.state.selectedBook.id;
        this.instance.delete(id).then(response => {
            this.refreshBooksList();
            // Wyczysc formularz
            this.setState({selectedBook : {
                id: '',
                title: ''
            }})
        })
    };

    refreshBooksList = function() {
        this.instance.get('/')
            .then(response => {
                let books = response.data;
                this.setState({
                    books
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
            this.refreshBooksList();
        }
    };

    BookForm = (props) => {
        let titleInput = <Ui.TextField floatingLabelText="Title" value={this.state.selectedBook.title}
                                      onChange={this.onBookTitleChange}/>;
        return (
            <form>
                <div>
                    {titleInput}
                </div>
                <div>
                    <Ui.FlatButton label="New" secondary={true} onClick={this.handleNew}
                                   icon={<Ui.FontIcon className="material-icons">create</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedBook.id} label="Save" primary={true}
                                   onClick={this.handleSave}
                                   icon={<Ui.FontIcon className="material-icons">save</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedBook.id} label="Remove"
                                   secondary={true}
                                   onClick={this.handleRemove}
                                   icon={<Ui.FontIcon className="material-icons">delete</Ui.FontIcon>}/>
                </div>
            </form>
        )
    };

    BookList = (props) => {
        const books = props.books;
        const listItems = books.map((book) => <Ui.ListItem key={book.id} primaryText={book.title} onClick={() => {
            return this.handleBookClick(book);
        }}/>);
        return (
            <Ui.List>{listItems} </Ui.List>
        );
    };

    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <h3>Books</h3>
                    <Ui.Paper zDepth={1} className="left-column">
                        <this.BookList books={this.state.books}/>
                    </Ui.Paper>
                    <Ui.Paper zDepth={1} className="right-column">
                        <this.BookForm/>
                    </Ui.Paper>
                    <Snackbar open={this.state.open} message="Error! Empty title." autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }


}
export default Book;