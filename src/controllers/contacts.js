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
};

export async function createContactController(req, res) {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Succesfully created a contact',
    data: contact,
  });
}

export async function updateContactController(req, res, next) {
  const { contactId } = req.params;
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
}

export async function deleteContactsController(req, res, next) {
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
}
