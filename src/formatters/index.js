import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return getPlain;
    case 'json':
      return JSON.stringify;
    default:
      return getStylish;
  }
};

export default getFormatter;
