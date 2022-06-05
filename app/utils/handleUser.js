const _ = require('lodash');

const Users = [];

const addUser = (user) => {
    const { name } = user;

    const existingUserIndex = _.findIndex(Users, function (user) {
        return user.name === name;
    });

    if (existingUserIndex === -1) {
        Users.push(user);

        return {
            error: false
        };
    } else {
        return {
            error: 'A user with that name already exists.'
        };
    }
};

const removeUser = (user) => {
    const { id } = user;

    const existingUserIndex = _.findIndex(Users, function (user) {
        return user.id === id;
    });

    if (existingUserIndex !== -1) {
        Users.splice(existingUserIndex, 1);
    }
};

module.exports = {
    addUser,
    removeUser
};
