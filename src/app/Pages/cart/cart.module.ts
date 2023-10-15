import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CartComponent }]),
    SharedModule
  ]
})
export class CartModule {}
