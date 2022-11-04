const myCache = require('../inMemory');
const _ = require('underscore')

exports.login = async (req, res, next) => {
    try {
        let { name } = req.body;

        let obj = { name: name, joined_at: new Date(), messages: [] };
   
        let allChats = myCache.get('Chats');
        let allMembers = myCache.get('Members');
        let allMessages = myCache.get("Messages");

        // console.log("allMembers" + allMembers)
        if(allMembers !== undefined){
            let fetchUser = allMembers ? allMembers.find((item)=> item.name === name) : undefined;
            if (fetchUser === undefined) {
                let data = [ ...allMembers, {name: name, id: _.uniqueId('member_')} ];
                myCache.set('Members', data, 31536000);
                return res.status(200).json({
                    status: 'success',
                    payload: obj,
                    message: "New User connected"
                });       
            } else {
                return res.status(200).json({
                    status: 'success',
                    payload: fetchUser,
                    message: "User already connected"
                });            
            }
        }else {
            let data = [{name: name, id: _.uniqueId('member_')}];
            myCache.set('Members', data, 31536000);
            return res.status(200).json({
                status: 'success',
                payload: data,
                message: "created"
            });            
        }
      
    } catch (error) {
        console.log("error => " + error)
        res.status(500).json({
            status: 'failed',
            payload: null
        })
    }
}

exports.fetchMembers = async (req, res, next) => {
    try {
        let allMembers = myCache.get('Members');
        let io = req.app.get("io");
        io.emit('showMessage', 'received');
        res.status(200).json({
            status: 'success',
            payload: allMembers,
            message: "Members fetched successfully"
        }); 
    } catch (error) {
        console.log("error => " + error)
        res.status(500).json({
            status: 'failed',
            payload: null
        })
    }
}