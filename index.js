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

      console.log(contacts);
      console.log("Request completed successfully".green);
      return;

    case "get":
      const contactById = await getContactById(id);

      if (contactById === null) {
        console.log(`Contact with id: "${id}" not found!!!`.red);
        return;
      }

      console.log(contactById);
      console.log(`Contact with id: "${id}" found`.green);
      return;

    case "add":
      const newContact = await addContact(name, email, phone);

      if (newContact === null) {
        console.log(`Contact with name: "${name}" already have.`.red);
        return;
      }

      console.log(newContact);
      console.log("Contact added successfully".green);
      return;

    case "remove":
      // ... id
      const removeContactById = await removeContact(id);
      console.log(removeContactById);
      console.log("Contact remove successfully".green);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
