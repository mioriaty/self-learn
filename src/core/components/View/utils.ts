import COLUMN_FORMAT from './constants';
import { Columns } from './types';

export const getColumnsClassName = (columns: Columns) => {
  return COLUMN_FORMAT.map((colFormat, index) => {
    if (!columns[index] || columns[index] === 0) {
      return '';
    }
    return `ui-col-${colFormat}-${columns[index]}`;
  }).join(' ');
};
