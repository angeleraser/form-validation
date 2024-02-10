import React, { useMemo, useState } from "react";
import "./AppInput.css";
import { InputError, InputValidator } from "../../utils/form-validator";

interface AppInputProps {
  type?: "text" | "number";
  required?: boolean;
  onChange?(value: string): void;
  placeholder?: string;
  label?: string;
  validator: InputValidator;
  value?: string;
  onError?(error: InputError | undefined): void;
}

export function AppInput(props: AppInputProps): React.ReactElement {
  const [hasTyped, setHasTyped] = useState(false);

  const error = useMemo(
    function () {
      if (!hasTyped) return undefined;
      return props.validator.validate(props.value || "");
    },
    [props.validator, props.value, hasTyped]
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
