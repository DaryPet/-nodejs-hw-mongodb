import { Router } from 'express';
import {
  createContactController,
  deleteContactsController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post('/', ctrlWrapper(createContactController));
contactsRouter.patch('/:contactId', ctrlWrapper(updateContactController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

export default contactsRouter;
