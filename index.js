const {program} = require("commander");
const contactsList = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse();

const options = program.opts();

const invokeAction = async ({
  action,
  id,
  name,
  email,
  phone,
}) => {
  switch (action) {
    case "list":
      const allContacts =
        await contactsList.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContact =
        await contactsList.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact =
        await contactsList.addContact({
          name,
          email,
          phone,
        });
      return console.log(newContact);

    case "remove":
      const delContact =
        await contactsList.removeContact(id);
      return console.log(delContact);

    default:
      console.warn(
        "\x1B[31m Unknown action type!"
      );
  }
};

invokeAction(options);
// invokeAction ({action: "list"})
// invokeAction({ action: "get", id: "dffghj" });
// invokeAction({ action: "add", name: "Maks Shepard", email: "maks.shepard@mail.com", phone: "(050) 555-55555" });
// invokeAction({action: "remove", id: "uXquaLwYYALwH-9OuW",});
