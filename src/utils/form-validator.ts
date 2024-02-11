export enum InputErrorMessageTemplate {
  Required = "Field {label} is required",
  MinRequiredNameLength = "Must be more than {length}",
  MinRequiredUsernameLength = "Username must be greater than {length} characters",
  MustHaveSpecialCharacters = "Your username {username} must have at least one special character {characters}",
}

export interface InputValidatorConstructor {
  new (inputProps: { label: string; minLength: number }): InputValidator;
}

export interface InputValidator {
  validate(value: string): InputError | undefined;
}

export class InputError {
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

function hasMinLength(value: string, length = 10): boolean {
  return value.length >= length;
}

function isEmpty(value: string): boolean {
  return value.trim().length === 0;
}

function hasSpecialCharacters(value: string): boolean {
  return /\W/gi.test(value);
}

function buildInputErrorMessage(template: InputErrorMessageTemplate, value: string) {
  if (!template.includes("{")) throw new Error("");
  const [start, , end] = template.split(/[{}]/gi);
  return `${start}${value}${end}`;
}

export class NameInputValidator implements InputValidator {
  private inputProps: { label: string; minLength: number };

  constructor(inputProps: { label: string; minLength: number }) {
    this.inputProps = inputProps;
  }

  validate(value: string): InputError | undefined {
    if (isEmpty(value)) {
      return new InputError(buildInputErrorMessage(InputErrorMessageTemplate.Required, String(this.inputProps.label)));
    }

    if (!hasMinLength(value, this.inputProps.minLength)) {
      return new InputError(
        buildInputErrorMessage(InputErrorMessageTemplate.MinRequiredNameLength, String(this.inputProps.minLength))
      );
    }

    return undefined;
  }
}

export class LastnameInputValidator implements InputValidator {
  private inputProps: { label: string; minLength: number };

  constructor(inputProps: { label: string; minLength: number }) {
    this.inputProps = inputProps;
  }

  validate(value: string): InputError | undefined {
    if (isEmpty(value)) {
      return new InputError(buildInputErrorMessage(InputErrorMessageTemplate.Required, String(this.inputProps.label)));
    }

    if (!hasMinLength(value, this.inputProps.minLength)) {
      return new InputError(
        buildInputErrorMessage(InputErrorMessageTemplate.MinRequiredNameLength, String(this.inputProps.minLength))
      );
    }

    return undefined;
  }
}

export class NicknameInputValidator implements InputValidator {
  private inputProps: { label: string; minLength: number };

  constructor(inputProps: { label: string; minLength: number }) {
    this.inputProps = inputProps;
  }

  validate(value: string): InputError | undefined {
    if (isEmpty(value)) {
      return new InputError(buildInputErrorMessage(InputErrorMessageTemplate.Required, this.inputProps.label));
    }

    if (!hasMinLength(value, this.inputProps.minLength)) {
      return new InputError(
        buildInputErrorMessage(InputErrorMessageTemplate.MinRequiredUsernameLength, String(this.inputProps.minLength))
      );
    }

    if (!hasSpecialCharacters(value)) {
      return new InputError(buildInputErrorMessage(InputErrorMessageTemplate.MustHaveSpecialCharacters, "-_<>"));
    }

    return undefined;
  }
}
