import React from 'react';
import Container from "@material-ui/core/Container";
import TopNav from "../components/TopNav";
import {Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import OrderBookPage from "./orderBookPage/OrderBookPage";
import CurrencyPage from "./currencyPage/CurrencyPage";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        position: 'relative',
    },
    content: {
        marginTop: '2rem',
        width: '100%',
        maxWidth: 920
    }
});

function Layout() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopNav/>
            <Container
                maxWidth='lg'>
                <Grid container justify="center">
                    <Grid item className={classes.content}>
                    <Switch>
                        <Route exact path={'/currency'}><CurrencyPage/></Route>
                        <Route exact path={'/orderbook'}><OrderBookPage/></Route>
                        <Route path={'/'}><OrderBookPage/></Route>
                    </Switch>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Layout;
