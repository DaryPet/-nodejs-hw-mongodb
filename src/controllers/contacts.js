import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found student with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export async function createContactController(req, res) {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Succesfully created a contact',
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    // const updateData = req.body;
    const contact = await updateContact(contactId, req.body);

    if (!contact) {
      return next(createHttpError(404), {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Succesfully patched a contact',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactsController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
      return next(
        createHttpError(404, {
          status: 404,
          message: 'Contact not found',
          data: { message: 'Contact not found' },
        }),
      );
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
}
