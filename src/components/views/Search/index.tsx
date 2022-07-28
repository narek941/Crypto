import { useForm } from 'react-hook-form';

import { SearchIcon } from 'assets/icons';

import styles from './Search.module.scss';

const Search = ({ onClick, placeholder = 'search' }: any) => {
  const { register, handleSubmit } = useForm() as any;

  return (
    <form className={styles.search} onSubmit={handleSubmit(onClick)}>
      <div className={styles.search__icon}>
        <SearchIcon type='submit' role='button' />
      </div>
      <div>
        <input {...register('search')} className={styles.search__input} placeholder={placeholder} />
      </div>
    </form>
  );
};
export default Search;
