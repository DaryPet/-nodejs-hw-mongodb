import Contact from '../db/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  const totalContacts = await Contact.countDocuments();
  // return contacts;
  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    total: totalContacts,
    perPage,
    page,
  });

  return {
    contacts,
    totalContacts,
    page,
    perPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    // new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    data: result.value,
    isNew,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
