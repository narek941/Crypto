import { useAppSelector } from 'hooks';
import { authSelectors } from 'store/authSlice';
import { RoleType } from 'types/api';

const AccessWrapper = ({ children }: any) => {
  const role = useAppSelector(authSelectors.selectRole);

  return <>{role === RoleType.ADMIN ? <>{children}</> : <></>}</>;
};

export default AccessWrapper;
