import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-join-offer',
  templateUrl: './join-offer.component.html',
  styleUrls: ['./join-offer.component.scss']
})
export class JoinOfferComponent implements OnInit {

  rememberMe = false;
  current_user:any;
  
  exist = false;
  beforeEmail :any;

  address:any;
  addressSlice:any;
  hash:any;

  metaUser = false;

  account=false;
  notificationForm : FormGroup;
  
  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) { 
    
    this.notificationForm = this.fb.group({
      eth: new FormControl('', [Validators.required]),
    });  

  }

  ngOnInit() {  
    this.beforeEmail = sessionStorage.getItem("email");
    this.address = sessionStorage.getItem('address');
  }

  get eth() { return this.notificationForm.get('eth'); }  

}
