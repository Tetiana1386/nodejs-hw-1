const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
    try {
        fs.readFile(contactsPath, 'utf8')
        .then((data) => console.table(JSON.parse(data)));
        } catch(error) {
        console.log(error.message);
    }
};

function getContactById(contactId) {
    try {
        fs.readFile(contactsPath)
            .then((data) => {
                const users = JSON.parse(data);
                const user = users.find(user => user.id == contactId);
                console.table(user);
            })
    } catch (error) {
        console.log(error.message);
    };
};

function removeContact(contactId) {
    try {
        fs.readFile(contactsPath)
            .then((data) => {
                const users = JSON.parse(data);
                const newUsers = users.filter(user => user.id != contactId);
                fs.writeFile(contactsPath, JSON.stringify(newUsers, null, '\t'));
                console.log('Contact removed');
        })
    } catch (error) {
        console.log(error.message);
    }

};

function addContact(name, email, phone) {
    try {
        fs.readFile(contactsPath, 'utf8')
            .then((data) => {
                const users = JSON.parse(data);
                const newUser = { id: shortid.generate(), name, email, phone };
                const newUsers = [...users, newUser];
                fs.writeFile(contactsPath, JSON.stringify(newUsers));
                console.log("Contact was successfully added");
                console.table(newUsers);
            });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { listContacts, getContactById, removeContact, addContact };