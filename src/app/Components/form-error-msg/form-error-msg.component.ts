import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.scss']
})
export class FormErrorMsgComponent {
  @Input() fromControlType : string = '';
  registerForm!: FormGroup;
  fromControl(type : string){
    return this.registerForm.get(type);
   }
}
