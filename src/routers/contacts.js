import { Router } from 'express';
// import { getAllContacts, getContactById } from '../services/contacts.js';
import {
  createContactController,
  deleteContactsController,
  getAllContactsController,
  getContactByIdController,
  // updateContacts,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContactsController);
contactsRouter.get('/:contactId', getContactByIdController);
contactsRouter.post('/', createContactController);
// contactsRouter.patch('/', updateContacts);
contactsRouter.delete('/:contactId', deleteContactsController);

export default contactsRouter;
