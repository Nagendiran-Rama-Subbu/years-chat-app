import { Grid, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function User(props) {
    const [member, setMember] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // setUserName(localStorage.getItem('user_name'))
    }, [navigate]);

    const handleLogOut = () => {
        navigate('/')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff", fontSize: 18, fontWeight: 'bold' }}>
                        YearsChat, <span style={{ fontSize: 12, fontWeight: 'none' }}>logged in as {userName}</span>
                    </Typography>
                    
                    <Button sx={{ textTransform: 'none', color: "#fff", fontSize: 18, fontWeight: 'bold' }} onClick={() => handleLogOut()}>Log out</Button>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent={'center'} alignItems='center' >
                
            </Grid>
        </Box>
    )
}