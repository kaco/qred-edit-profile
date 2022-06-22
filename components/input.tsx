import { Field } from "react-final-form";

interface InputProps {
  label: string;
  name: string;
  validate: (value: any) => any;
}

export const Input = ({ label, name, validate }: InputProps) => (
  <Field
    name={name}
    component="input"
    type="text"
    placeholder={label}
    validate={validate}
  >
    {({ input, meta }) => (
      <div className="input">
        <label>{label}</label>
        <input {...input} type="text" placeholder={label} />
        {meta.error && meta.touched && (
          <div className="error">{meta.error}</div>
        )}
      </div>
    )}
  </Field>
);
