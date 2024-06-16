import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from '../utils/env.js';
// import { getAllContacts, getContactById } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello friend',
    });
  });

  app.use('/contacts', contactsRouter);
  // app.get('/contacts', async (req, res) => {
  //   try {
  //     const contacts = await getAllContacts();
  //     if (contacts.length === 0) {
  //       res.status(404).json({
  //         status: 404,
  //         message: 'No contacts found',
  //       });
  //       return;
  //     }
  //     res.status(200).json({
  //       status: 200,
  //       data: contacts,
  //       message: 'Successfully found contacts!',
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 500,
  //       message: error.message,
  //     });
  //   }
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   try {
  //     const contact = await getContactById(contactId);
  //     if (!contact) {
  //       res.status(404).json({
  //         status: 404,
  //         message: 'Contact not found',
  //       });
  //       return;
  //     }
  //     res.status(200).json({
  //       status: 200,
  //       data: contact,
  //       message: `Successfully found contact with id ${contactId}!`,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 500,
  //       message: error.message,
  //     });
  //   }
  // });

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     status: 404,
  //     message: 'Not found',
  //   });
  //   next();
  // });

  app.use('*', notFoundHandler);
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     status: 500,
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  //   next();
  // });
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
};
