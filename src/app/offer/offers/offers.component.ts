import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { OfferService } from '@app/shared/services/offer/offer.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  rememberMe = false;
  current_user:any;
  
  exist = false;
  beforeEmail :any;
  address:any;

  offersForm : FormGroup;

  constructor(private router: Router, private offerService: OfferService, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) {
    this.offersForm = this.fb.group({
      min: new FormControl(''),
      max: new FormControl(''),
      status: new FormControl('')
    });
  }

  ngOnInit() {     
    this.beforeEmail = sessionStorage.getItem('email');
    this.address = sessionStorage.getItem('address')
    /*
    this.offerService.userProfile(this.beforeEmail, this.address).subscribe((offer: { minAmount: any; maxAmount: any; status: any; } | null | undefined) => { 
      if (offer == undefined || offer == null ) {
            
      } else {        
        this.generalForm.patchValue({minAmount: offer.minAmount});
        this.generalForm.patchValue({maxAmount:offer.maxAmount});
        this.generalForm.patchValue({status: offer.status});
      }
    }) 
    */
  }

  offerClick(): void {
    this.router.navigateByUrl("/offer/accept-offer")  
  }

  joinClick(): void {
    this.router.navigateByUrl("/offer/join-offer")  
  }

  onGeneralSubmit(): void{
    var { max, min, status } = this.offersForm.getRawValue();


  }

}
