/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import "./AppInput.css";
import { InputError, InputValidatorConstructor } from "../../utils/form-validator";

interface AppInputProps {
  required?: boolean;
  onChange?(value: string): void;
  placeholder?: string;
  label?: string;
  validator: InputValidatorConstructor;
  value?: string;
  minLength?: number;
  onError?(error: InputError | undefined): void;
  type?: "text" | "number";
}

export function AppInput(props: AppInputProps): React.ReactElement {
  const [hasTyped, setHasTyped] = useState(false);

  const inputValidator = useMemo(function () {
    return new props.validator({ label: props.label ?? "", minLength: props.minLength ?? 5 });
  }, []);

  const error = useMemo(
    function () {
      if (!hasTyped) return undefined;
      return inputValidator.validate(props.value || "");
    },
    [props.value, hasTyped]
  );

  return (
    <div className="app-input-wrapper">
      {props.label && <div className="app-input-label">{props.label}</div>}

      <input
        placeholder={props.placeholder}
        onChange={(event) => {
          props.onChange?.(event.target.value);
        }}
        className={`app-input-element${error ? " app-input-element-error" : ""}`}
        type={props.type}
        required={props.required}
        value={props.value}
        onKeyDown={function () {
          if (!hasTyped) {
            setHasTyped(true);
          }
        }}
      />

      <p className="app-input-error">{error?.message}</p>
    </div>
  );
}
