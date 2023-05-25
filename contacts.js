// const fs = require("fs/promises");
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

const contactsPath = path.resolve(
  "db",
  "contacts.json"
);

const updateContacts = async (contacts) => {
  try {
    return await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
  } catch (error) {
    console.log(error.message);
  }
};

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(
      contactsPath
    );
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(
      (item) => item.id === contactId
    );
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
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
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
  }
  catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
