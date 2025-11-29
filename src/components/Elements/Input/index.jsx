import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = forwardRef((props, ref) => {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    readOnly,
    classname,
  } = props;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={disabled || readOnly ? undefined : onChange}
        readOnly={readOnly}
        disabled={disabled}
        classname={classname}
        ref={ref}
      />
    </div>
  );
});

export default InputForm;
