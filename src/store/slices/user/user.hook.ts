import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchUserProfileThunk } from '@/store/slices/user/user.thunk';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  return () => dispatch(fetchUserProfileThunk());
};