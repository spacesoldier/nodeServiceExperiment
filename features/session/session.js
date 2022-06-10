'use strict'

function newSession(msg){

    let ourMessage = msg.payload;

    msg.payload = 'heeeeeeeeeeeeeeeeeey!!!';

    return msg;

}

function validateSession(){

}

function deleteSession(){

}

module.exports = {
    newSession,
    validateSession,
    deleteSession
}
