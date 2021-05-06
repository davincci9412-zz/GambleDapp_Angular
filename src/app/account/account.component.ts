import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  rememberMe = false;
  current_user:any;

  fail=false;
  success=false;
  
  exist = false;
  beforeEmail :any;

  address:any;
  addressSlice:any;
  hash:any;

  metaUser = false;

  notification = false;
  notificationForm : FormGroup;
  notificationUpdate = false;

  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask, private fb: FormBuilder) { 
    if (sessionStorage.getItem('address')){
      this.address = sessionStorage.getItem('address');
      this.addressSlice = this.address.slice(0,8) + '...'+this.address.slice(32,42)
      //this.hash = sessionStorage.getItem('hash');
      this.metaUser = true;
    } 

    this.notificationForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      item: new FormControl(''),
      bid: new FormControl(''),
      price: new FormControl(''),
      auction: new FormControl(''),
      outbid: new FormControl(''),
      referral: new FormControl(''),
      asset: new FormControl(''),
      purchase: new FormControl(''),
      newsletter: new FormControl(''),
      ethvalue: new FormControl('', [Validators.required]),
      exchange: new FormControl('')
    });  

  }

  ngOnInit() {  
    
    this.beforeEmail = sessionStorage.getItem('email');
    this.address = sessionStorage.getItem('address');

    this.authService.userProfile(this.beforeEmail, this.address).subscribe((user) => { 
      if (user == undefined || user == null ) {
            
      } else {
        
        this.notificationForm.patchValue({email: user.email});
        this.notificationForm.patchValue({bio:user.bio});
        this.notificationForm.patchValue({username: user.username});

        this.notificationForm.patchValue({item: user.item});
        this.notificationForm.patchValue({bid:user.bid});
        this.notificationForm.patchValue({price: user.price});
        this.notificationForm.patchValue({auction: user.auction});
        this.notificationForm.patchValue({outbid:user.outbid});
        this.notificationForm.patchValue({referral: user.referral});
        this.notificationForm.patchValue({asset: user.asset});
        this.notificationForm.patchValue({purchase:user.purchase});
        this.notificationForm.patchValue({newsletter: user.newsletter});
        this.notificationForm.patchValue({ethvalue: user.ethvalue});
        this.notificationForm.patchValue({exchange: user.exchange});
      }
    }) 

  }

  get username() { return this.notificationForm.get('username'); }
  get email() { return this.notificationForm.get('email'); }  
  get ethvalue() { return this.notificationForm.get('ethvalue'); }  
  get exchange() { return this.notificationForm.get('exchange'); }  
  
  onNotificationSubmit(): void {
    var { email, bio, username, item, bid, price, auction, outbid, referral, asset, purchase, newsletter, ethvalue, exchange } = this.notificationForm.getRawValue()
    item? item=1:item="";
    bid? bid=1:bid="";
    price? price=1:price="";
    auction? auction=1:auction="";
    outbid? outbid=1:outbid="";
    referral? referral=1:referral="";
    asset? asset=1:asset="";
    purchase? purchase=1:purchase="";
    newsletter? newsletter=1:newsletter="";  
    //exchange = ethvalue * 2775;
    
    this.authService.metaUserProfile(this.beforeEmail, this.address,email,bio,username,item,bid,price,auction,outbid,referral,asset,purchase,newsletter,ethvalue,exchange ).subscribe((user) => { 
      if (user == undefined || user ==null ) {
        this.fail=true;        
      } else {
        this.success = true;
        //this.router.navigate(["/home"]).then(() => { window.location.reload();})
      }
    })


  }

  async metamask(){
    sessionStorage.getItem('address')?this.router.navigate(["/setting"]).then(() => { window.location.reload();}) : await this.Metamask.connectETH();
    //await this.Metamask.connectETH();

  }

}
