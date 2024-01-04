import React, { FC, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { ClickAwayListener } from '@mui/material';
import { DropdownIcon } from 'components/icons/DropdownIcon';
import s from './CustomSelect.module.css';

interface ICustomSelectOption {
  title: string;
  value: any;
}

interface CustomSelectProps {
  placeholder?: string;
  options?: ICustomSelectOption[] | null;
  selectedOptions?: ICustomSelectOption[] | null;
  onSelect: (val: ICustomSelectOption[]) => void;
  multiselect?: boolean;
  hasError?: boolean;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  options,
  selectedOptions,
  placeholder = '',
  onSelect,
  multiselect,
  hasError,
}) => {
  const [isOpened, setOpened] = useState(false);

  const selectedText = useMemo(() => {
    if (!selectedOptions?.length) {
      return placeholder;
    }

    return selectedOptions.map(({ title }) => title).join(', ');
  }, [selectedOptions, placeholder]);

  const onOptionClick = useCallback(
    (option: ICustomSelectOption) => {
      if (!multiselect) setOpened(false);

      if (!selectedOptions?.length || !multiselect) {
        onSelect([option]);

        return;
      }

      const existingIndex = selectedOptions.findIndex(({ value }) => {
        return value === option.value;
      });

      if (existingIndex === -1) {
        onSelect([...selectedOptions, option]);

        return;
      }

      onSelect([
        ...selectedOptions.slice(0, existingIndex),
        ...selectedOptions.slice(existingIndex + 1),
      ]);
    },
    [onSelect, selectedOptions, multiselect],
  );

  const selectedOptionClass = useMemo(() => {
    return cn(s.selectedOption, {
      [s.placeholder]: !selectedOptions?.length,
      [s.withError]: !!hasError,
    });
  }, [selectedOptions?.length]);

  const optionsWrapperClass = useMemo(() => {
    return cn(s.optionsWrapper, {
      [s.opened]: isOpened,
    });
  }, [isOpened]);

  const singleOptionClass = useCallback(
    (option: ICustomSelectOption) => {
      return cn(s.singleOption, {
        [s.selected]: !!selectedOptions?.find(
          ({ value }) => value === option.value,
        ),
      });
    },
    [selectedOptions],
  );

  const dropdownIconClass = useMemo(() => {
    return cn(s.dropdownIcon, {
      [s.rotated]: isOpened,
    });
  }, [isOpened]);

  return (
    <ClickAwayListener onClickAway={() => setOpened(false)}>
      <div className={s.root}>
        <div
          className={selectedOptionClass}
          onClick={() => setOpened(val => !val)}>
          {selectedText}
          <div className={dropdownIconClass}>
            <DropdownIcon color="rgba(14, 94, 15, 0.5)" />
          </div>
        </div>
        <div className={optionsWrapperClass}>
          {(options || []).map((option: ICustomSelectOption) => (
            <div
              key={option.title}
              className={singleOptionClass(option)}
              onClick={() => onOptionClick(option)}>
              {option.title}
            </div>
          ))}
        </div>
      </div>
    </ClickAwayListener>
  );
};
