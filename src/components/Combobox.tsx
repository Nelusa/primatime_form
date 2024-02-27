import {ChangeEvent, forwardRef, MutableRefObject, useEffect, useRef, useState} from 'react';
import Input from "./Input.tsx";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";
import LoadingSpinner from "./LoadingSpinner.tsx";
import classNames from "../utils/classNames.ts";
import ErrorState from "./ErrorState.tsx";
import {motion} from "framer-motion";

export interface Item {
  web_pages: string[];
  country: string;
  domains: string[];
  name: string;
  alpha_two_code: string;
  state_province: string;
}

interface ComboBoxProps {
  label: string;
  id: string;
  placeholder: string;
  items: Item[];
  onSelect: (item: Item) => void;
  search: string;
  onSearch: (search: string) => void;
  register?: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
  isLoading: boolean;
  disabled?: boolean;
  fetchError?: Error | null;
}

// Step 3: ComboBox
const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(({ label, id, placeholder, items, onSelect, search, onSearch, register, error, isLoading, disabled, fetchError }: ComboBoxProps, _forwardedRef) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("below");
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustDropdownPosition = () => {
      const refCurrent = (comboboxRef as MutableRefObject<HTMLDivElement | null>)?.current;
      if (refCurrent) {
        const rect = refCurrent.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 260 && spaceAbove > spaceBelow) {
          setDropdownPosition("above");
        } else {
          setDropdownPosition("below");
        }
      }
    };

    adjustDropdownPosition();

    window.addEventListener("resize", adjustDropdownPosition);
    window.addEventListener("scroll", adjustDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", adjustDropdownPosition);
      window.removeEventListener("scroll", adjustDropdownPosition, true);
    };
  }, [isVisible]);

  const handleSelectItem = (item: Item) => {
    onSelect(item)
    setIsVisible(false);
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    setIsVisible(true);
  };

  const handleFocus = () => {
    setIsVisible(true);
    if (!search) {
      onSearch('');
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsVisible(false), 100);
  };

  const handleClearSelection = () => {
    onSelect({} as Item);
    onSearch('');
  };

  return (
    <div className="relative" ref={comboboxRef}>
      <Input
        id={id}
        label={label}
        placeholder={placeholder}
        value={search || ""}
        onSearch={handleSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        register={register}
        error={error}
        disabled={disabled}
        onClear={handleClearSelection}
        isCombobox
      />
      {isVisible && (
        <motion.ul
          initial={{ opacity: 0, y: dropdownPosition === "above" ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: dropdownPosition === "above" ? 10 : -10 }}
          transition={{ duration: 0.2 }}
          className={classNames("absolute z-10 w-full bg-white border border-gray-400 rounded-md mt-1 max-h-60 overflow-auto ",
        dropdownPosition === "above" ? "bottom-[100%]" : "top-[100%]"
       )}>
          {isLoading && <LoadingSpinner />}
          {fetchError && <ErrorState message="Chyba při načítání dat"/>}
          {items.length > 0 && items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer truncate"
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
});

export default ComboBox;