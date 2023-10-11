import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { IRegisterType } from 'src/app/Models/i-register-type';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {

  isLoading = false;
  apiErrorMsg = '';
  authSubscription: Subscription | null = null

  formType: IRegisterType = {
    name: 'name',
    email: 'email',
    password: 'password',
    rePassword: 'rePassword',
    phone: 'phone'
  }
  registerForm: FormGroup
  constructor(private _authService: AuthService, private _router: Router) {
    this.registerForm = new FormGroup({
      [this.formType.name]: new FormControl('', [Validators.required]),
      [this.formType.email]: new FormControl('', [Validators.required, Validators.email]),
      [this.formType.password]: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      [this.formType.rePassword]: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        // this.isPasswordMatched()
      ]),
      [this.formType.phone]: new FormControl('', [Validators.required, Validators.minLength(11)]),
    });
  }

  fromControl(type: string) {
    return this.registerForm.get(type)
  }
  // isPasswordMatched(): ValidatorFn {
  //   return ()=> {

  //     const isMatched = this.registerForm.get(this.formType.password)?.value == this.registerForm.get(this.formType.rePassword)?.value
  //     if (!isMatched) {
  //       return { passwordMisMatch: true }
  //     }
  //     return null
  //   }
  // }

  onSubmit(form: FormGroup) {
    this.apiErrorMsg = ""
    form.markAllAsTouched();
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    this.authSubscription = this._authService.register(form.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this._router.navigate(['/login'])
      }, error: (err) => {
        this.apiErrorMsg = err.error.errors?.msg || err.error.message;
        this.isLoading = false;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
