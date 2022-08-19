import SelectMultiple, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueRemoveProps,
  NoticeProps,
} from 'react-select';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

import { CloseIcon, DropDownIcon } from 'assets/icons';

import styles from './MultipleSelect.module.scss';

const handleCancel = (props: any) => {
  props.clearValue();
};

const handleSelect = (props: any) => {
  //eslint-disable-next-line no-console
  console.log(props);
};

const handleSelectAll = (props: any) => {
  if (props.getValue().length === props.options.length) {
    props.clearValue();
  } else {
    props.setValue(props.options);
  }
};

const ClearIndicator = (props: ClearIndicatorProps<any, true>) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} className={styles.clear}>
      <CloseIcon />
    </div>
  );
};
const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  return (
    <div className={styles.icon} {...props}>
      <DropDownIcon />
    </div>
  );
};
const MultiValueRemove = (props: MultiValueRemoveProps<any>) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon />
    </components.MultiValueRemove>
  );
};
const Menu = (props: MenuProps<any>) => (
  <>
    <components.Menu {...props} className={styles.item__wrapper}>
      <div className={styles.option}>{props.children}</div>
    </components.Menu>
  </>
);

const MenuList = (props: MenuListProps<any>) => {
  return (
    <>
      <div className={styles.item} {...props}>
        {props.children}
      </div>
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
    <div>
      <components.Option {...props} className={styles.single_option}>
        <input type='checkbox' checked={props.isSelected} onChange={() => null} />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const NoOptionsMessage = (props: NoticeProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_noItem} {...props} />
    </div>
  );
};

const MultipleSelect = ({ label, name, options, formMethods, placeholder }: any) => {
  const handleClose = () => {
    formMethods.resetField(name);
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={formMethods.control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <SelectMultiple
              options={options}
              classNamePrefix='multipleSelect'
              isMulti
              menuIsOpen={isOpen}
              onMenuOpen={() => setIsOpen(true)}
              onMenuClose={() => handleClose()}
              hideSelectedOptions={false}
              placeholder={placeholder}
              closeMenuOnSelect={false}
              onChange={(options) => {
                onChange(options?.map((option) => option.value));
              }}
              onBlur={onBlur}
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
    </div>
  );
};

export default MultipleSelect;
