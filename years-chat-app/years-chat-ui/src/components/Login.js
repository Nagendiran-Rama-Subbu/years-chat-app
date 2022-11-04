import { Grid, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import { API_END_POINT } from '../helpers/constant';
import API from '../api';
import { socket } from "../helpers/socket";

export default function Login(props) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const navigate = useNavigate();

    const handleInput = (event) => {
        setName(event.target.value);
        setNameError(false)
    }

    const handleLogIn = () => {
        let isError = false;
        if (name === null || name === '' || name === undefined) {
            setNameError(true);
            isError = true
        }
        if (!isError) {
            let data = {};
            // const socket = io(`${API_END_POINT}`);
            data.name = name;
            socket.on("connect", () => {
                console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            }); 
            API.post('login', data).then(async(response) => {
                if(response.status === 'success') {
                    await localStorage.setItem('user_name', name )
                    socket.emit('userdata', {name: name, socket_id: socket.id})
                    
                    navigate('/chat');
                } else {
                    alert('Network Error')
                }
            })
        }
    }

    return (
        <Grid container sx={{ height: '100vh' }} justifyContent='center' alignItems='center'>
            <Grid item xs={10} sm={4}>
                <Grid container justifyContent='center' alignItems='center' sx={{ textAlign: 'center' }} spacing={6}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: 18 }}>Welcome to YearsChat!</Typography>
                        <Typography sx={{ fontSize: 18 }}>Please enter your name below and click "Log in"</Typography>
                    </Grid>
                    <Grid item xs={10} sm={8}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    variant="outlined"
                                    placeholder="Name"
                                    fullWidth
                                    value={name}
                                    onChange={(event) => handleInput(event)}
                                    helperText={nameError ? 'Please enter your name' : ''}
                                    error={nameError}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogIn()}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth
                                    onClick={() => handleLogIn()}
                                    variant="contained" sx={{ textTransform: 'none', color: "#fff", fontSize: 18, backgroundColor:'#ffa513' }}
                                >Log in</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}