enum InputErrorMessage {
  Required = "Field is required",
  MinRequiredNameLength = "Must be more than 1",
  MinRequiredUsernameLength = "Username musth be greater than 4 characters",
  MustHaveSpecialCharacters = 'Input must have at least one special character'
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

export class NameInputValidator implements InputValidator {
  validate(value: string): InputError | undefined {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      return new InputError(InputErrorMessage.Required);
    }

    if (trimmedValue.length < 2) {
      return new InputError(InputErrorMessage.MinRequiredNameLength);
    }

    return undefined;
  }
}

export class LastnameInputValidator implements InputValidator {
  validate(value: string): InputError | undefined {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      return new InputError(InputErrorMessage.Required);
    }

    if (trimmedValue.length < 2) {
      return new InputError(InputErrorMessage.MinRequiredNameLength);
    }

    return undefined;
  }
}

export class NicknameInputValidator implements InputValidator {
  validate(value: string): InputError | undefined {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      return new InputError(InputErrorMessage.Required);
    }

    if (value.length < 5) {
      return new InputError(InputErrorMessage.MinRequiredUsernameLength);
    }

    if (!/\W/gi.test(trimmedValue)) {
      return new InputError(InputErrorMessage.MustHaveSpecialCharacters);
    }

    return undefined;
  }
}
