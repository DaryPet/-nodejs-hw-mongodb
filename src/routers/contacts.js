import { Router } from 'express';
// import { getAllContacts, getContactById } from '../services/contacts.js';
import {
  createContacts,
  deleteContacts,
  getAllContacts,
  getContactById,
  updateContacts,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getAllContacts);
contactsRouter.get('/:id', getContactById);
contactsRouter.post('/', createContacts);
contactsRouter.patch('/', updateContacts);
contactsRouter.delete('/', deleteContacts);

export default contactsRouter;
