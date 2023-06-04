const { listContacts, getContactById } = require("./contacts");
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
        console.log(`Book with id: "${id}" not found`.red);
        return;
      }

      console.log(contactById);
      console.log("Request completed successfully".green);
      return;

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
