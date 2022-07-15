import * as Yup from 'yup';
import { useState } from 'react';
import { SchemaLike } from 'yup/lib/types';

const useIsFieldValid = (schema: SchemaLike, fieldName: string, fieldValue: string): boolean => {
  const [isValid, setIsValid] = useState(false);

  Yup.reach(schema, fieldName)
    .validate(fieldValue)
    .then((): void => setIsValid(true))
    .catch((): void => setIsValid(false));

  return isValid;
};

export default useIsFieldValid;
