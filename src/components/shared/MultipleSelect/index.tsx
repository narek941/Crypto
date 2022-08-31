import SelectMultiple, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MenuListProps,
  MenuProps,
  NoticeProps,
} from 'react-select';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

import { CloseIcon, DropDownIcon } from 'assets/icons';

import Checkbox from '../Checkbox';

import styles from './MultipleSelect.module.scss';

const MultipleSelect = ({
  label,
  name,
  options,
  formMethods,
  placeholder,
  filterName,
  callback,
  error,
  defaultValues,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    if (isOpen) {
      formMethods.resetField(name);
      setIsOpen(false);
    } else setIsOpen(false);
  };

  const handleToggle = (bool: boolean) => {
    setIsOpen(bool);
  };
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={formMethods.control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <SelectMultiple
              isMulti
              options={options}
              classNamePrefix='multipleSelect'
              defaultValue={defaultValues}
              menuIsOpen={isOpen}
              onMenuOpen={() => setIsOpen(true)}
              onMenuClose={() => handleClose()}
              hideSelectedOptions={false}
              placeholder={<div className={styles.placeholder}>{placeholder}</div>}
              closeMenuOnSelect={false}
              onChange={(options) => {
                onChange(options?.map((option) => option.value));
              }}
              onBlur={onBlur}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              customProps={{ filterName, callback, handleToggle }}
              value={options.filter((option: any) => value?.includes(option.value))}
              components={{
                ClearIndicator,
                DropdownIndicator,
                MultiValueRemove,
                Menu,
                MenuList,
                Option,
                NoOptionsMessage,
              }}
            />
          );
        }}
      />
      {error && <div className={styles['select-errorMsg']}>{error}</div>}
    </div>
  );
};

const handleCancel = (props: any) => {
  props.clearValue();
};

const handleClear = (props: any) => {
  props.clearValue();
  if (props.selectProps?.customProps?.callback) {
    props.selectProps?.customProps?.callback(props.selectProps?.customProps?.filterName, null);
  }
};

const handleSelect = ({ selectProps, getValue }: any) => {
  if (selectProps?.customProps?.callback) {
    let value = '';
    getValue().map((item: any) => {
      value = `${item.value}${value && '||' + value}`;
    });

    selectProps?.customProps?.callback(selectProps?.customProps?.filterName, value);
  }
  selectProps?.customProps?.handleToggle(false);
};

const handleSelectAll = (props: any) => {
  if (props.getValue().length === props.options.length) {
    props.clearValue();
  } else {
    props.setValue(props.options);
  }
};

const ClearIndicator = (props: ClearIndicatorProps<any, true>) => (
  <div className={styles.clear} onClick={() => handleClear(props)}>
    <CloseIcon />
  </div>
);

const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  return (
    <div className={styles.icon} {...props}>
      <DropDownIcon />
    </div>
  );
};
const MultiValueRemove = (props: any) => {
  const handleItemClick = () => {
    if (props.selectProps?.customProps?.callback) {
      let value = '';
      props.selectProps.value
        .filter((item: any) => item.value !== props.data.value)
        .map((item: any) => {
          value = `${item.value}${value && '||' + value}`;
        });

      props.selectProps?.customProps?.callback(props.selectProps?.customProps?.filterName, value);
    }
  };
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon onClick={handleItemClick} />
    </components.MultiValueRemove>
  );
};
const Menu = (props: MenuProps<any>) => (
  <components.Menu {...props} className={styles.item__wrapper}>
    <div className={styles.option}>{props.children}</div>
  </components.Menu>
);

const MenuList = (props: MenuListProps<any>) => {
  return (
    <>
      <components.MenuList className={styles.item} {...props}>
        {props.children}
      </components.MenuList>
      <div className={styles.action}>
        <div>
          <div className={styles.action__select} onClick={() => handleSelectAll(props)}>
            {props.getValue().length !== props.options.length ? 'Select All' : 'Deselect All'}
          </div>
        </div>
        <div className={styles.action__inner}>
          <div className={styles.action__cancel} onClick={() => handleCancel(props)}>
            Cancel
          </div>
          <div className={styles.action__select} role='button' onClick={() => handleSelect(props)}>
            Apply
          </div>
        </div>
      </div>
    </>
  );
};
const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div>
        <Checkbox
          checked={props.isSelected}
          onChange={() => null}
          text={props.label}
          color='secondary'
        />
      </div>
    </components.Option>
  );
};

const NoOptionsMessage = (props: NoticeProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_noItem} {...props} />
    </div>
  );
};

export default MultipleSelect;
