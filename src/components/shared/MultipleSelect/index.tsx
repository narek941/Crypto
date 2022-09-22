import SelectMultiple, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MenuProps,
  NoticeProps,
} from 'react-select';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CloseIcon, DropDownIcon } from 'assets/icons';
import { IOptionList } from 'types';

import Checkbox from '../Checkbox';

import styles from './MultipleSelect.module.scss';
import { IMultipleSelect } from './types';

const MultipleSelect = ({
  name,
  label,
  error,
  tooltip,
  callback,
  filterName,
  placeholder,
  formMethods,
  options = [],
  withAction = false,
  defaultValues,
}: IMultipleSelect) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortedOption = options.sort((a: IOptionList, b: IOptionList) => {
    return a.label.localeCompare(b.label);
  });

  const handleClose = (value: any) => {
    if (isOpen) {
      handleSelect(value);
    } else setIsOpen(false);
  };

  const handleSelect = (props: any) => {
    if (callback && filterName) {
      let value = '';
      sortedOption
        .filter((option: any) => props?.includes(option.value))
        .map((item: any) => {
          value = `${item.value}${value && '||' + value}`;
        });

      callback(filterName, value);
    }
    setIsOpen(false);
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
              options={sortedOption}
              classNamePrefix='multipleSelect'
              defaultValue={defaultValues}
              menuIsOpen={isOpen}
              onMenuOpen={() => setIsOpen(true)}
              onMenuClose={() => handleClose(value)}
              hideSelectedOptions={false}
              placeholder={<div className={styles.placeholder}>{placeholder}</div>}
              closeMenuOnSelect={false}
              onChange={(sortedOption) => {
                onChange(sortedOption?.map((option) => option.value));
              }}
              onBlur={onBlur}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              customProps={{ filterName, callback, handleToggle, tooltip, withAction }}
              value={sortedOption.filter((option: any) => value?.includes(option.value))}
              components={{
                ClearIndicator,
                DropdownIndicator,
                MultiValueRemove,
                Menu,
                MenuList,
                Option,
                NoOptionsMessage,
                SelectContainer,
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

const handleClear = (props: any, e: any) => {
  e.stopPropagation();
  e.preventDefault();

  if (props.selectProps?.customProps?.callback) {
    props.selectProps?.customProps?.callback(props.selectProps?.customProps?.filterName, null);
  }
  // eslint-disable-next-line no-console
  console.log(props, e, e.isPropagationStopped, 'aa');
  props.clearValue();
};

const handleSelectForAction = ({ selectProps, getValue }: any) => {
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
  <div className={styles.clear} onClick={(e) => handleClear(props, e)}>
    <CloseIcon />
  </div>
);

const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => (
  <div className={styles.icon} {...props}>
    <DropDownIcon />
  </div>
);

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

const MenuList = (props: any) => {
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
        {props.selectProps?.customProps?.withAction && (
          <div className={styles.action__inner}>
            <div className={styles.action__cancel} onClick={() => handleCancel(props)}>
              Cancel
            </div>
            <div
              className={styles.action__select}
              role='button'
              onClick={() => handleSelectForAction(props)}
            >
              Apply
            </div>
          </div>
        )}
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

const SelectContainer = ({ children, ...props }: any) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      followCursor={true}
      placement='bottom'
      title={t(props.selectProps?.customProps?.tooltip)}
    >
      <div>
        <components.SelectContainer {...props}>{children}</components.SelectContainer>
      </div>
    </Tooltip>
  );
};

export default MultipleSelect;
