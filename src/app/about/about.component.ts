import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidationService } from '../custom-validation.service';


@Component({
  selector: 'app-about',
  template:  `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
  styleUrls: ['./about.component.scss']

 

})
export class AboutComponent implements OnInit {
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void {
    
  }
  get errorMessage() {
    
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return CustomValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
