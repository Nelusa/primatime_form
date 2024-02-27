import {ChangeEvent} from 'react';
import classNames from "../utils/classNames.ts";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

interface InputProps {
  placeholder?: string;
  label: string;
  id: string;
  value?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
  isCombobox?: boolean;
}

//Step 1: Input component
const Input = ({ placeholder, label, id, value, disabled, onBlur, onFocus, register, error, onSearch, onClear, isCombobox = false }: InputProps) => {

  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-medium text-gray-800" htmlFor={id}>{label}</label>
      <div className="relative flex w-full">
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        value={value || ""}
        autoComplete="off"
        onBlur={onBlur}
        disabled={disabled}
        onFocus={onFocus}
        onChange={onSearch}
        {...register}
        className={classNames("border border-gray-400 rounded-md py-2 pr-12 truncate focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 disabled:bg-gray-200 disabled:cursor-not-allowed", error && "border-2 border-red-700"  )} style={{
          width: "inherit"
      }}
      />
      {value && isCombobox && (
        <button onClick={onClear} type="button" aria-label="Clear" className="absolute right-2 top-2 bg-teal-500 text-white hover:bg-teal-400 rounded-full border border-solid border-teal-500 p-1">
          <XMarkIcon />
        </button>
      )}
      </div>
      {error && <p className="text-red-600 text-xs mt-0.5">{error.message}</p>}
    </div>
  );
};


//Note: This is a simple XMark icon used like this (not a component from Heroicons, because of the possibility to change the stroke width):
const XMarkIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3"
         stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
  )
}

export default Input;
