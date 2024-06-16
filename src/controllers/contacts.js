import Contacts from '../db/Contact.js';
import { getAllContacts } from '../services/contacts.js';
// import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// export const getContactByIdController = async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       throw createHttpError(404, 'Contact not found');
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found student with id ${contactId}!`,
//       data: contact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export async function createContacts(req, res) {
  try {
    const contact = await Contacts.create(req.body);
    res.send(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

// export async function updateContacts(req, res) {}
// export async function deleteContacts(req, res) {}
