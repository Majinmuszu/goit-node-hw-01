const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
require("colors");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function invokeAction({ action }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      rl.question("Podaj id kontaktu, który chcesz wyświetlić: ".green, (id) => {
        getContactById(id);
        rl.close();
      });
      break;
    case "add":
      rl.question("Podaj imię: ".green, (name) => {
        rl.question("Podaj email: ".green, (email) => {
          rl.question("Podaj numer telefonu: ".green, (phone) => {
            addContact(name, email, phone);
            rl.close();
          });
        });
      });
      break;
    case "remove":
      rl.question("Podaj id kontaktu, który chcesz usunąć: ".green, (id) => {
        removeContact(id);
        rl.close();
      });
      break;
    default:
      console.warn("\x1B[31m Unknown action type!".red);
  }
}

invokeAction(argv);
