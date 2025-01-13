import { TextInput } from "react-native";
import { FC } from "react";
import clsx from "clsx";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: string;
}

const Input: FC<InputProps> = ({ placeholder, value, onChangeText, style }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    className={clsx("py-3 px-4 border rounded", style)}
  />
);

export default Input;