"use client";
import React, { ReactNode, useState } from "react";
import { TextInput, TextInputProps } from "@mantine/core";

interface SimpleTextInputProps extends Omit<TextInputProps, "ref"> {
  name: string;
  label?: string;
  variant?: "filled" | "unstyled";
  rightSection?: ReactNode;
  inputClassName?: string;
  onInputChange?: (value: string) => void;
}

const SimpleTextInput = ({
  name,
  label,
  rightSection,
  onInputChange,
  variant,
  ...rest
}: SimpleTextInputProps) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      name={name}
      value={value}
      label={label}
      rightSection={rightSection}
      variant={variant}
      onChange={(e) => {
        const val = e.target.value;
        setValue(val);
        onInputChange?.(val);
      }}
      classNames={{
        input:
          "!h-[44px] border focus:!border-grayscale-600 !mt-1.5 !text-base !font-overused-grotesk !font-medium ",
      }}
      {...rest}
    />
  );
};

export default SimpleTextInput;
