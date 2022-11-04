import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import moment from "moment";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { deepOrange } from "@mui/material/colors";
// import Avatar from "@mui/material/Avatar";

const MessageRow = styled('div')({
    display: "flex",
})

const DisplayName = styled('div')({
    marginLeft: "20px"
})

const DisplayNameRight = styled('div')({
    marginLeft: "20px",
    float: 'right'
})

const MessageBlue = styled('div')({
    position: "relative",
    marginLeft: "20px",
    marginRight: "30px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#1983fe",
    width: "65%",
    // minWidth: "300px",
    color: '#fff',
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #1983fe",
    borderRadius: "10px",
    "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #1983fe",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
    },
    "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #1983fe",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
    }
})

const MessageContent = styled('div')({
    marginLeft: "5px",

    // paddingTop: '10px',
    // paddingBottom: '15px',
    // minWidth: "200px"
})


const MessageTimeStampRight = styled('div')({
    position: "absolute",
    fontSize: ".85em",
    fontWeight: "300",
    marginTop: "10px",
    bottom: "-3px",
    right: "5px",
    // paddingTop: '10px',
    paddingBottom: '10px'
})

const MessageGrey = styled('div')({
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#888888",
    width: "65%",
    // minWidth: "300px",
    color: '#fff',
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #888888",
    borderRadius: "10px",
    "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #888888",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px"
    },
    "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #888888",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px"
    }
})

const MessageRowRight = styled('div')({
    display: "flex",
    justifyContent: "flex-end",
    // flexDirection: "column"
},
)


export const MessageLeft = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const displayName = props.displayName ? props.displayName : "User";
    const messageId = props.currentMessageId ? props.currentMessageId : 0;
    const [clicked, setClicked] = useState(false);
    const messageObj = props.messageObj ? props.messageObj : {};
    const handleClick = (msg) => {
        if (clicked === false) {
            setClicked(!clicked);
            // props.editMessageId(messageId);
            props.editMessage(msg);
        } else {
            setClicked(!clicked)
            // props.editMessageId(null);
            props.editMessage(null)
        }
    }

    const handleEditClick = (msg) => {
        props.editMessage(msg);
    }

    const handleDeleteClick = (msg) => {
        props.deleteMessage(msg);
    }

    return (
        <>
            <MessageRow>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <DisplayName>{displayName},{messageObj.edited === true && 'Edited at '} {
                        !!messageObj.editedTimestamp 
                        ? moment(messageObj.editedTimestamp).format('hh:mm a')
                        : moment(timestamp).format('hh:mm a')
                    } </DisplayName>
                    <MessageBlue>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MessageContent onClick={() => handleClick(messageObj)}>
                                {message}
                            </MessageContent>
                            {
                                messageId === messageObj.id &&
                                <IconButton size="small" color="secondary" sx={{ paddingRight: '3px' }} aria-label="directions" onClick={() => handleEditClick(messageObj)}>
                                    <EditIcon />
                                </IconButton>
                            }
                            {
                                messageId === messageObj.id &&
                                <IconButton size="small" color="secondary" sx={{ paddingRight: '3px' }} aria-label="directions" onClick={() => handleDeleteClick(messageObj)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </div>
                        {/* <MessageContent onClick={() => handleClick(messageObj)}>
                            <span style={{ marginRight: 5 }}>{message}</span>
                            {
                                messageId === messageObj.id &&
                                <IconButton color="secondary" sx={{ paddingLeft: '3px' }} aria-label="directions" onClick={() => alert('edit')}>
                                    <EditIcon />
                                </IconButton>
                            }
                            {
                                messageId === messageObj.id &&
                                <IconButton color="secondary" aria-label="directions" onClick={() => alert('edit')}>
                                    <DeleteIcon />
                                </IconButton>
                            }

                        </MessageContent> */}
                        {/* <MessageTimeStampRight>{timestamp}</MessageTimeStampRight> */}
                    </MessageBlue>
                </div>
            </MessageRow>
        </>
    );
};

export const MessageRight = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const displayName = props.displayName ? props.displayName : "User";
    const messageObj = props.messageObj ? props.messageObj : {};
    const messageId = props.currentMessageId ? props.currentMessageId : 0;
    const [clicked, setClicked] = useState(false);

    const handleClick = (msg) => {
        if (clicked === false) {
            setClicked(!clicked);
            // props.editMessageId(messageId);
            props.editMessage(msg);
        } else {
            setClicked(!clicked)
            // props.editMessageId(null);
            props.editMessage(null)
        }
    }

    return (
        <MessageRowRight>
            <div style={{ display: "flex", flexDirection: 'column' }}>
                <DisplayNameRight>{displayName},{messageObj.edited === true && 'Edited at '} {
                        !!messageObj.editedTimestamp 
                        ? moment(messageObj.editedTimestamp).format('hh:mm a')
                        : moment(timestamp).format('hh:mm a')
                    }</DisplayNameRight>
                <MessageGrey>
                    <MessageContent>
                        {message}
                    </MessageContent>
                    {/* <MessageContent onClick={() => handleClick(messageObj)}>
                        {
                            messageId === messageObj.id &&
                            <IconButton color="secondary" sx={{ paddingRight: '3px' }} aria-label="directions" onClick={() => alert('edit')}>
                                <EditIcon />
                            </IconButton>
                        }
                        {
                            messageId === messageObj.id &&
                            <IconButton color="secondary" sx={{ paddingRight: '3px' }} aria-label="directions" onClick={() => alert('edit')}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        <span style={{ marginLeft: 5 }}>{message}</span>

                    </MessageContent> */}
                    {/* <MessageTimeStampRight>{timestamp}</MessageTimeStampRight> */}
                </MessageGrey>
            </div>
        </MessageRowRight>
    );
};
