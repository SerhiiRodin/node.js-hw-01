const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { string } = require("yargs");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  dataBoofer = await fs.readFile(contactsPath);
  data = JSON.parse(dataBoofer);

  return data;
};

const getContactById = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

async function removeContact(id) {
  const contactId = String(id);
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  // делаем деструктуризацию, чтоб получить не массив с объектом, а просто объект.
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  const index = contacts.findIndex((contact) => contact.name === name);

  if (index !== -1) {
    return null;
  }
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
