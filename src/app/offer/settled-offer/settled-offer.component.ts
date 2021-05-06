import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-settled-offer',
  templateUrl: './settled-offer.component.html',
  styleUrls: ['./settled-offer.component.scss']
})
export class SettledOfferComponent implements OnInit {
  
  exist = false;
  beforeEmail :any;

  address:any;
  hash:any;

  account=false;
  notificationForm : FormGroup;
  
  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) { 
    
    this.notificationForm = this.fb.group({
      desc: new FormControl('', [Validators.required]),
    });  

  }

  ngOnInit() {  
    this.beforeEmail = sessionStorage.getItem("email");
    this.address = sessionStorage.getItem('address');
  }

  get desc() { return this.notificationForm.get('desc'); }  

}
