const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();

      console.table(contacts);
      console.log("Request completed successfully".green);
      return;

    case "get":
      const contactById = await getContactById(id);

      if (contactById === null) {
        console.log(`Contact with id: "${id}" not found!!!`.red);
        return;
      }

      console.table(contactById);
      console.log(`Contact with id: "${id}" found`.green);
      return;

    case "add":
      const newContact = await addContact(name, email, phone);

      if (newContact === null) {
        console.log(`Contact with name: "${name}" already have.`.red);
        return;
      }

      console.table(newContact);
      console.log("Contact added successfully".green);
      return;

    case "remove":
      const removeContactById = await removeContact(id);

      if (removeContactById === null) {
        console.log(`Contact with id: "${id}" not found.`.red);
        return;
      }

      console.table(removeContactById);
      console.log("Contact remove successfully".green);
      return;

    default:
      console.warn(" Unknown action type!".red);
  }
};

invokeAction(argv);
