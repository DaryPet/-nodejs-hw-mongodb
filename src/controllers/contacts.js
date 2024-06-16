import Contacts from '../db/Contact.js';
import { getAllContacts, getContactById } from '../services/contacts';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export async function getContactByIdController(req, res) {}
export async function createContacts(req, res) {
  const contact = await Contacts.create(req.body);
  res.send(contact);
}
export async function updateContacts(req, res) {}
export async function deleteContacts(req, res) {}
