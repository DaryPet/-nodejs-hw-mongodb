import { Router } from 'express';
import {
  createContactController,
  deleteContactsController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContactsController);
contactsRouter.get('/:contactId', getContactByIdController);
contactsRouter.post('/', createContactController);
contactsRouter.patch('/:contactId', updateContactController);
contactsRouter.delete('/:contactId', deleteContactsController);

export default contactsRouter;
