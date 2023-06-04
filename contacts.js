const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  dataBoofer = await fs.readFile(contactsPath);
  data = JSON.parse(dataBoofer);

  return data;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

function removeContact(contactId) {
  // ...твой код
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  const validationByName = contacts.find((contact) => contact.name === name);

  if (validationByName) {
    return null;
  }
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
