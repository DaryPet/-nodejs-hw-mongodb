import { Router } from 'express';
// import { getAllContacts, getContactById } from '../services/contacts.js';
import {
  createContacts,
  deleteContacts,
  getAllContactsController,
  getContactByIdController,
  updateContacts,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContactsController);
contactsRouter.get('/:id', getContactByIdController);
contactsRouter.post('/', createContacts);
contactsRouter.patch('/', updateContacts);
contactsRouter.delete('/', deleteContacts);

export default contactsRouter;
