import { useDispatch } from 'react-redux';

import { AppDispatch } from 'types';

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useAppDispatch;
