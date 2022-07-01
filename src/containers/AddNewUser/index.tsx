import AddUserForm from 'components/views/AddUserForm';

import styles from './AddNewUser.module.scss';

const AddNewUSer: React.FC = () => {
  return (
    <div className={styles.container}>
      <AddUserForm />
    </div>
  );
};

export default AddNewUSer;
