import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from '@core/validators';
import {
  validateNotExists,
  validateNotTakenByOthers,
} from '../validators/user.validator';

export class AuthenticationForms {
  allUsersArray!: IUser[];

  public static LoginForm(): FormGroup {
    return new FormBuilder().group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
  }

  public static SignUpForm(allUsers: IUser[]): FormGroup {
    return new FormBuilder().group({
      id: [''],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotExists(allUsers).bind(this),
      ],
      first_name: [''],
      last_name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$',
          ),
        ],
        validateNotExists(allUsers).bind(this),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}',
          ),
          patternValidator(/\d/, { hasNumber: true }),
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          patternValidator(/[a-z]/, { hasSmallCase: true }),
        ],
      ],
    });
  }
}
