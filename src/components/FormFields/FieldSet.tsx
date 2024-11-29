import { ReactElement } from "react";

interface FieldSetProps {
  label?: string;
  children: ReactElement[];
}
export const FieldSet = ({ label, children }: FieldSetProps) => {
  return (
    <fieldset className="form-fieldset">
      {label && <legend>{label}</legend>}
      <div>{children}</div>
    </fieldset>
  );
};
