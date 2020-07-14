import React from 'react';
import TradeTable from "../../components/TradeTable";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        margin: 10
    },
});
function OrderBookPage(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid container justify={"center"}>
                <Grid className={classes.table} item xs={12} sm={5}>
                    <TradeTable/>
                </Grid>
                <Grid className={classes.table} item xs={12} sm={5}>
                    <TradeTable/>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrderBookPage;
