import React from 'react';
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDoorOpen, faKey, faQrcode } from '@fortawesome/free-solid-svg-icons';

export const sidebarItems = (
    <div>
        <NavLink to = "/" >
            <ListItem button>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faHome}/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItem>
        </NavLink>

        <NavLink to = "/access" >
            <ListItem button>
                <ListItemIcon>
                <FontAwesomeIcon icon={faDoorOpen}/>
                </ListItemIcon>
                <ListItemText primary="Manage Access"/>
            </ListItem>
        </NavLink>

        <NavLink to = "/keys">
            <ListItem button>
                <ListItemIcon>
                <FontAwesomeIcon icon={faKey}/>
                </ListItemIcon>
                <ListItemText primary="Manage Keys"/>
            </ListItem>
        </NavLink>

        <NavLink to = "/OTP">
            <ListItem button>
                <ListItemIcon>
                <FontAwesomeIcon icon={faQrcode}/>
                </ListItemIcon>
                <ListItemText primary="Manage QR Codes"/>
            </ListItem>
        </NavLink>
        
        
    </div>
)