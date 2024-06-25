import { Router } from 'express';
import {
  createContactController,
  deleteContactsController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  contactsAddShema,
  contactsUpdateShema,
} from '../validation/contactsShema.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  validateBody(contactsAddShema),
  ctrlWrapper(createContactController),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(contactsUpdateShema),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

export default contactsRouter;
