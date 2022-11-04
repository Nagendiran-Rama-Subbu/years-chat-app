import { Grid, TextField, styled} from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MessageLeft, MessageRight } from "./Message";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import SendIcon from '@mui/icons-material/Send';
import _ from "underscore";
// import MenuIcon from '@mui/icons-material/Menu';
import { socket } from "../helpers/socket";

export default function Login(props) {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [editMessage, setEditMessage] = useState('');
    const [messageId, setMessageId] = useState(null);
    const [editEnabled, setEditEnabled] = useState(false);
    const [currentMessageObj, setCurrentMessageObj] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setUserName(localStorage.getItem('user_name'));
        socket.on('newMessage', (data) => {
            // const messages = messageList.map(msg => msg.id !== data.id ? data : msg)
            setMessageList(oldMessages => [...oldMessages, data])
        })

        socket.on('editedMessage', (data) => {
            // const messages = messageList.map(msg => msg.id !== data.id ? data : msg)
            setMessageList(oldMessages => [...oldMessages.filter(msg => msg.id !== data.id), data])
        })

        socket.on('deletedMessage', (data) => {
            // const messages = messageList.map(msg => msg.id !== data.id ? data : msg)
            setMessageList(oldMessages => [...oldMessages.filter(msg => msg.id !== data.id)])
        })

        return () => {
            socket.off('newMessage');
            socket.off('editedMessage');
            socket.off('deletedMessage');
          };
    }, [])

    const handleEditMessage = (msg) => {
        // console.log(`msg -> ${JSON.stringify(msg)}`)
        if(msg !== null){
            setCurrentMessageObj(msg);
            setEditMessage(msg.message);
            setMessage(msg.message)
            setMessageId(msg.id);
            setEditEnabled(true);
        }else{
            setCurrentMessageObj({});
            setEditMessage('');
            setMessageId(null);
            setEditEnabled(false);
            setMessage('');
        }
    }

    const handleDeleteMessage = (msg) => {
        if(msg !== null){
            socket.emit("removeMessage", msg);
        }

        setCurrentMessageObj({});
        setEditMessage('');
        setMessageId(null);
        setEditEnabled(false);
        setMessage('');
    }

    const sendMessage = async () => {
        // let userName = await localStorage.getItem('user_name');
        let messageObj = {};
        messageObj.user = userName;
        messageObj.message = message;
        if(editEnabled === false){
            messageObj.edited = false;
            socket.emit("chatMessage", messageObj);
        }else{
            messageObj = {...currentMessageObj, ...messageObj}
            messageObj.edited = true;
            socket.emit("updateMessage", messageObj);
            setCurrentMessageObj({});
            setEditMessage('');
            setMessageId(null);
            setEditEnabled(false);
        }

        setMessage('')
    }

    const handleLogOut = () => {
        navigate('/')
    }
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar  position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fff", fontSize: 18, fontWeight: 'bold' }}>
                            YearsChat, <span style={{ fontSize: 12, fontWeight: 'none' }}>logged in as {userName}</span>
                        </Typography>
                        <Button sx={{ textTransform: 'none', color: "#fff", fontSize: 18, fontWeight: 'bold' }} onClick={() => handleLogOut()}>Log out</Button>
                    </Toolbar>
                </AppBar>
                <Offset />
                <Grid container justifyContent={'center'} alignItems='center' >
                    <Grid item xs={10} sx={{margin:'10px 0px 150px 0px' }}>
                        {/* <Grid container>
                            <Grid item xs={12}>
                                <Typography>Lorem ipsum</Typography>
                            </Grid>
                            <Grid item xs={12}><Typography>Lorem ipsum</Typography></Grid>

                        </Grid> */}
                        {
                            messageList.length > 0 && 
                            _.sortBy(messageList, 'timestamp').map((currentMessage, index) => 
                               currentMessage.user === userName 
                               ? <MessageLeft
                                    key={index}
                                    message={currentMessage.message}
                                    timestamp={currentMessage.timestamp}
                                    // photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                    displayName={currentMessage.user}
                                    avatarDisp={true}
                                    editMessage={(msg) => handleEditMessage(msg)}
                                    editMessageId={(msgId) => setMessageId(msgId)}
                                    deleteMessage={(msg) => handleDeleteMessage(msg)}
                                    currentMessageId={messageId}
                                    messageObj={currentMessage}
                                />
                                :<MessageRight
                                    key={index}
                                    message={currentMessage.message}
                                    timestamp={currentMessage.timestamp}
                                    // photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                    displayName={currentMessage.user}
                                    avatarDisp={true}
                                    editMessage={(msg) => handleEditMessage(msg)}
                                    editMessageId={(msgId) => setMessageId(msgId)}
                                    deleteMessage={(msg) => handleDeleteMessage(msg)}
                                    currentMessageId={messageId}
                                    messageObj={currentMessage}
                                />
                                
                            )
                        }
                    </Grid>
                </Grid>
                <Offset />

                <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, padding: "10px 30px", bgcolor: '#fff'  }}>
                    
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  }}
                    >
                        <InputBase
                            multiline
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Type a message"
                            inputProps={{ 'aria-label': 'Type a message' }}
                            value={message}
                            onChange={(event)=> setMessage(event.target.value)}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => sendMessage()}>
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </AppBar>
            </Box>
        </>
    )
}