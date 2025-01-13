import { Text, TouchableOpacity } from "react-native";
import { FC } from "react";
import clsx from "clsx";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: string;
}

const Button: FC<ButtonProps> = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} className={clsx("py-3 px-5 rounded", style)}>
    <Text className="text-center text-white">{title}</Text>
  </TouchableOpacity>
);

export default Button;