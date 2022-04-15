import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';



@Component({
  selector: 'app-payment-success-full',
  templateUrl: './payment-success-full.component.html',
  styleUrls: ['./payment-success-full.component.scss']
})
export class PaymentSuccessFullComponent implements OnInit {
  @Input() name!: string;
  id:any;
  password:any;
  state$!: Observable<object>;
  constructor(private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
   
    
  }
  
   

}
