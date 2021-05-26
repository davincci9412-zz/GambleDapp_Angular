import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { Metamask } from '@app/shared/services/metamask/metamask.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  address:any;
  addressSlice:any;
  hash:any;
  roles:any;
  metaUser = false;
  duplicationWallet:any;

  constructor(private router: Router, private authService: AuthService, private Metamask: Metamask) {  
    if ( sessionStorage.getItem('address') == "undefined" || sessionStorage.getItem('address') == null ){   

    } else {
      this.address = sessionStorage.getItem('address');
      this.addressSlice = this.address.slice(0,6) + '...'+this.address.slice(36,42)
      this.metaUser = true;
    }
    this.roles = sessionStorage.getItem("roles")=="1" ? true:false;
  }

  ngOnInit(): void {
  
  }

  adminClick():void{
    this.router.navigateByUrl("/admin/admin-settles")
  }

  dashboardClick():void{
    this.router.navigateByUrl("/")
  }

  accountClick(): void {
    this.router.navigateByUrl("/account")
    //this.router.navigate(["/home"]).then(() => { window.location.reload();})
  }

  offersClick(): void {
    this.router.navigateByUrl("/offer/offers")  
  }

  marketClick(): void {
    this.router.navigateByUrl("/offer/market")
  }

  logoutClick(): void {
    this.authService.signOut();    
    this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})
  }

  async metamask(){
    await this.Metamask.connectETH();
  }

}