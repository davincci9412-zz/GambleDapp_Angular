import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rememberMe = false;
  current_user:any;
  
  exist = false;
  beforeEmail :any;


  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) {
    if (sessionStorage.getItem('address') || sessionStorage.getItem('_id') || localStorage.getItem('rememberCurrentUser') ) {      
    } else {
      this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})  
    }    

  }

  ngOnInit() {     
    

  }

  offerClick(): void {
    this.router.navigateByUrl("/offer/accept-offer")  
  }

  settleClick(): void {
    this.router.navigateByUrl("/offer/settled-offer")  
  }

  joinClick(): void {
    this.router.navigateByUrl("/offer/join-offer")  
  }

  myClick(): void {
    this.router.navigateByUrl("/offer/offers")  
  }

  marketClick(): void {
    this.router.navigateByUrl("/offer/market")  
  }





}
