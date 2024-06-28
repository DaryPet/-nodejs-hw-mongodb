import { typeList } from '../constants/contact-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') {
    return;
  }

  if (!['true', 'false'].includes(value)) {
    return;
  }

  const parsedValue = Boolean(value);
  return parsedValue;
};

const parseContactFilterParams = ({ type, isFavorite }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parsedFavorite = parseBoolean(isFavorite);

  return {
    type: parsedType,
    isFavorite: parsedFavorite,
  };
};

export default parseContactFilterParams;
