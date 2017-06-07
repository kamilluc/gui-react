import * as React from 'react';
import './Navigation.css';
import * as Ui from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleRequestClose = (event) => {
        this.setState({
            open: false,
        });
    };

    openNavigationDrawer = () => {
        this.setState({
            open: true,
        });
    };


    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.AppBar
                        title="Book Store"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.openNavigationDrawer}
                    />
                    <Ui.Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                        <Ui.MenuItem primaryText="Authors" leftIcon={<Ui.FontIcon className="material-icons">face</Ui.FontIcon>} containerElement={<Link to="/authors"/>}
                        ></Ui.MenuItem>

                        <Ui.MenuItem primaryText="Books" leftIcon={<Ui.FontIcon className="material-icons">book</Ui.FontIcon>} containerElement={<Link to="/authors"/>}
                        ></Ui.MenuItem>

                        <Ui.MenuItem primaryText="Browser" leftIcon={<Ui.FontIcon className="material-icons">pageview</Ui.FontIcon>}  containerElement={<Link to="/login"/>}></Ui.MenuItem>
                    </Ui.Drawer>
                </div>
            </MuiThemeProvider>
        );
    }

}
export default Navigation;