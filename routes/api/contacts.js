const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().error(new Error('missing required name field')),
  email: Joi.string()
    .min(3)
    .required()
    .email()
    .error(new Error('missing required email field')),
  phone: Joi.string()
    .length(14)
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .required()
    .error(new Error('missing required phone field. supports the following formats: (###) ###-#### '))
    ,
});

router.get("/", async (req, res, next) => {
  try {
    const result =
      await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ message: "Server error" });
  }
});

router.get(
  "/:contactId",
  async (req, res, next) => {
    try {
      // console.log('req.params', req.params)
      const { contactId } = req.params;
      const result =
        await contactsService.getContactById(
          contactId
        );
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
    } catch (error) {
      next(error);
      // const {
      //   status = 500,
      //   message = "Server error",
      // } = error;

      // res.status(status).json({ message });
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = contactAddSchema.validate(
      req.body
    );
    if (error) {
      throw HttpError(400, error.message);
    }
    const result =
      await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result =
        await contactsService.removeContact(
          contactId
        );
      console.log(result);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res
        .status(200)
        .json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { error } = contactAddSchema.validate(
        req.body
      );
      if (error) {
        throw HttpError(400, error.message);
      }
      console.log(req.params);
      const { contactId } = req.params;
      const result =
        await contactsService.updateContact(
          contactId,
          req.body
        );
      if (!result) {
        throw HttpError(
          404,
          `Not found`
        );
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
