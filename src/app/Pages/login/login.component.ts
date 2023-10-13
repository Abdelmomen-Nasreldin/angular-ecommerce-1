import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { ILoginType } from 'src/app/Models/i-login-type';
import { Product } from 'src/app/Models/product';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { CartService } from 'src/app/Services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  isLoading = false;
  apiErrorMsg = '';

  loginForm: FormGroup;
  authSubscription: Subscription| null = null

  formType: ILoginType = {
    email: "email",
    password: "password"
  }
  constructor(private _authService: AuthService, private _cartService : CartService, private _router: Router, private fb: FormBuilder) {


    this.loginForm = new FormGroup({
      [this.formType.email]: new FormControl(null, [Validators.required, Validators.email]),
      [this.formType.password]: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
    let isAuthenticated = this._authService.isAuthenticated.getValue()
    if (isAuthenticated) {
      this._router.navigate(['/'])
    }
  }

  fromControl(type: string) {
    return this.loginForm.get(type)
  }

  onSubmit(form: FormGroup) {
    this.apiErrorMsg = ""
    form.markAllAsTouched();
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    this.authSubscription = this._authService.login(form.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this._cartService.getLoggedUserCart().pipe(
          map((products: any) => {
            return products.map((product: any) => product.product)
          })
        ).subscribe()
        this._router.navigate(['/'])
      }, error: (err) => {
        this.apiErrorMsg = err.error.message;
        this.isLoading = false;
      }
    })
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
