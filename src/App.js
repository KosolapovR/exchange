import React from 'react';
import './App.css';
import Layout from "./views/Layout";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: '#000',
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Layout/>
            </div>
        </ThemeProvider>
    );
}

export default App;
