import * as React from 'react';
import './Author.css';
import * as Ui from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAuthor: null,
            authors: [{
                id: "1",
                name: "Henryk Sienkiewicz"
            }, {
                id: "2",
                name: "Adam Mickiewicz"
            }, {
                id: "3",
                name: "Stefan Żeromski"
            }
            ]
        };
    }

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


    AuthorForm = (props) => {
        let nameInput = null;
        if(this.state.selectedAuthor != null){
            nameInput = <Ui.TextField floatingLabelText="Name"
                                      value={this.state.selectedAuthor.name}/>;
        } else {
            nameInput = <Ui.TextField floatingLabelText="Name"/>;
        }
        return (
            <form >
                <div>
                    {nameInput}
                </div>
                <div>
                    <Ui.FlatButton label="New" secondary={true} onClick={this.handleNew}
                                   icon={<Ui.FontIcon className="material-icons">create</Ui.FontIcon>} />

                    <Ui.FlatButton disabled={!this.state.selectedAuthor} label="Save"
                                   primary={true} onClick={this.handleSave} icon={<Ui.FontIcon className="material-icons">save</Ui.FontIcon>}/>

                    <Ui.FlatButton disabled={!this.state.selectedAuthor} label="Remove"
                                   secondary={true} onClick={this.handleRemove} icon={<Ui.FontIcon className="material-icons">delete</Ui.FontIcon>}/>
                </div>
            </form>
        )
    };

    AuthorList = (props) => {
        const authors = props.authors;
        const listItems = authors.map((author) =>
            <Ui.ListItem primaryText={author.name} onClick={() => this.handleAuthorClick(author)}/>
        );
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
                </div>
            </MuiThemeProvider>
        )
    }


}
export default Author;