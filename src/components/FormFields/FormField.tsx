import { Children, ReactElement } from "react";

interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  children: ReactElement;
}

export const FormField = ({ label, htmlFor, error, children }: FieldProps) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="form-field">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      {children}
      {error && (
        <div role={"alert"} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

function getChildId(children: ReactElement) {
  const child = Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
}
