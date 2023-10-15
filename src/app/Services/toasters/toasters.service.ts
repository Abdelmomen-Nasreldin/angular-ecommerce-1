import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastersService {

  constructor(private toastr: ToastrService) { }
  showSuccess() {
    this.toastr.success('Added to Cart!', 'Success');
  }
  showFailure() {
    this.toastr.error('Not Added!', 'Error!' );
  }
}
