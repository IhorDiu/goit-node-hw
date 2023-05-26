// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
// console.log('first_____________', __dirname)

// const contactsPath = path.resolve(
//   "models",
//   "contacts.json"
// );
const contactsPath = path.join(
  __dirname,
  "contacts.json"
);

const updateContacts = async (contacts) => {
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
};

const listContacts = async () => {
  const contacts = await fs.readFile(
    contactsPath
  );
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (item) => item.id === contactId
  );
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === contactId
  );
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === id
  );
  if (index === -1) {
    return null;
  }
  console.log(id);
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};