import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastersService {

  constructor(private toastr: ToastrService) { }
  showSuccess(msg: string) {
    this.toastr.success(msg, 'Success');
  }
  showFailure() {
    this.toastr.error('Failed', 'Error!' );
  }
}
