const path = require("path");
const fs = require("fs/promises");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  dataBoofer = await fs.readFile(contactsPath);
  data = JSON.parse(dataBoofer);

  return data;
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = { listContacts, getContactById };
