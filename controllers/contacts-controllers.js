const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");



const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  // console.log('req.params', req.params)
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
    // const error = new Error(
    //   `Contacts with id - ${contactId} not found`
    // );
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //   message: `Contacts with id - ${contactId} not found`,
    // });
  }
  res.json(result);
};

const addContact = async (req, res) => {
  
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};