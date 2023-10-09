import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  constructor(private _AuthService: AuthService, private router: Router) {}
  isLoading = false;
  apiErrorMsg = '';
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  fromControl(type: string) {
    return this.registerForm.get(type);
  }

  submit(form: FormGroup) {
    this.isLoading = true;
    this.apiErrorMsg = '';
    form.markAllAsTouched();
    if (form.invalid) {
      this.isLoading = false;
      return;
    }
    this._AuthService.login(form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this._AuthService.saveToken(res.token)
        this.isLoading = false;
        if (res.message == 'success') {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log(err.error.message);
        this.apiErrorMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(){
// this._AuthService.unsubscribe()
  }
}
