const admin = require('./adminRouter');
const user = require('./userRouter');
const adminGenerateUsers = require('./adminGenerateUsers');
const adminSerchUserById = require('./adminSerchUserById');
const adminDelUserById = require('./adminDelUserById');
const adminUpdateUserById = require('./adminUpdateUserById');
const getLoginPage = require('./getLoginPage');
const login = require('./login');
const addPost = require ('./addPost');
const getIndexPage = require ('./getIndexPage');
const getRegisterPage = require ('./getRegisterPage');
const register = require ('./register');
const createPost = require ('./createPost');
const logout = require ('./logout');


module.exports = {
    admin,
    user,
    adminGenerateUsers,
    adminSerchUserById,
    adminDelUserById,
    adminUpdateUserById,
    login,
    addPost,
    getLoginPage,
    getIndexPage,
    getRegisterPage,
    register,
    createPost,
    logout
};