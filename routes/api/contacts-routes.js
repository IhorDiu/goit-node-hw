const express = require("express");

const contactsController = require("../../controllers/contacts");

const { isValidId, validateFavorite } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const { validateBody } = require("../../utils");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete("/:contactId", isValidId, contactsController.removeContact);
module.exports = router;
