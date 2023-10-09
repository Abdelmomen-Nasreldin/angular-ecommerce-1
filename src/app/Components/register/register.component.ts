import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
  FormControlName,
  MinLengthValidator,
} from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
  });
  constructor(private _auth: AuthService) {}

  fromControl(type: string) {
    return this.registerForm.get(type);
  }

  submit(form: FormGroup) {
    form.markAllAsTouched();
    if (form.invalid) {
      return;
    }
    this._auth.register(form.value).subscribe((res) => console.log(res));
  }
}
