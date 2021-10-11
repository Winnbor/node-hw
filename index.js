const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("LIST");
      listContacts();
      break;

    case "get":
      console.log("GET");
      getContactById(Number(id));
      break;

    case "add":
      console.log("ADD");
      addContact(name, email, phone);
      break;

    case "remove":
      console.log("REMOVE");
      removeContact(Number(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
