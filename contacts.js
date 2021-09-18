const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) throw error;

        console.table(JSON.parse(data));
    });
};

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) throw error;

        const users = JSON.parse(data);
        const user = users.find(user => user.id == contactId);
        console.table(user);
    });
};

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) throw error;

        const users = JSON.parse(data);
        const newUsers = users.filter((user) => user.id !== contactId);

        if (newUsers.length === users.length) {
            console.log(
                `Contact with such id "${contactId}" not found!`
            );
            return;
        };

        fs.writeFile(contactsPath, JSON.stringify(newUsers), (error) => {
            if (error) throw error;
        });

        console.log(
            `Contact with such id "${contactId}" deleted! New list of contacts: `
        );
        console.table(newUsers);
    });
};

function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) throw error;

        const users = JSON.parse(data);

        if (
            users.find(user => user.name.toLowerCase() === name.toLowerCase(),
            )
        )
            return console.warn('This name already exists!');
        
        if (
            users.find(user => user.email === email,
            )
        )
            return console.warn('This email already exists!');
        
        if (
            users.find(user => user.phone === phone,
            )
        )
            return console.warn('This phone already exists!');
        
        const newUser = { id: shortid.generate(), name, email, phone };
        const newUsers = [...users, newUser];

        fs.writeFile(contactsPath, JSON.stringify(newUsers), (error) => {
            if (error) throw error;
        });

        console.log("Contact was added successfully");
        console.table(newUsers);
    });
};

module.exports = { listContacts, getContactById, removeContact, addContact };