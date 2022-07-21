export interface IAddUNewUserForm {
  name: string;
  email: string;
  password: string;
  accountType: string;
}
export interface IAddNewUserProps {
  state?: {
    id?: number;
  };
}
