import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, MenuItem, Container, Menu} from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    appBar: {
        background: '#111'
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        color: '#F0B90B',
        fontWeight: '600',
        cursor: 'pointer'
    },
    nickname: {
        padding: '20px 7px'
    },
    inputRoot: {
        color: 'inherit',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        padding: 0,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link: {
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
            color: '#F0B90B',
        },
    }
}));

const TopNav = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to={'/orderbook'} onClick={handleMenuClose}>Order Book</Link>
            </MenuItem>
            <MenuItem>
                <Link to={'/currency'} onClick={handleMenuClose}>Currency</Link>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters={true}>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                         BINANCE EXCHANGE
                        </Typography>
                        <div className={classes.grow}/>
                        <List component="nav" className={classes.sectionDesktop} aria-label="mailbox folders">
                            <Link className={classes.link} to="/orderbook">
                                <ListItem button>
                                    <ListItemText primary="Order Book"/>
                                </ListItem>
                            </Link>
                            <Divider orientation='vertical' flexItem/>
                            <Link className={classes.link} to="/currency">
                                <ListItem button>
                                    <ListItemText primary="Currency"/>
                                </ListItem>
                            </Link>
                        </List>

                        <div onClick={handleMobileMenuOpen} className={classes.sectionMobile}>
                            <IconButton aria-label="display more actions" edge="end" color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
};


export default TopNav;
