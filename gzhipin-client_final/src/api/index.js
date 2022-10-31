/*
A module containing n functions requested by the interface

return value is promise
 */

import ajax from './ajax'

// interface of register
export const reqRegister = (user) => ajax('/register', user, 'POST')
// interface of login
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// interface of update user
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// get user information
export const reqUser = () => ajax('/user')

// get user list
export const reqUserList = (type) => ajax('/userlist', {type})

// Gets chat messages lists of the current user
export const reqChatMsgList = () => ajax('/msglist')

// Modifies a message as read
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')