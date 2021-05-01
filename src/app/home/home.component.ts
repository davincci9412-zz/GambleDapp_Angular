import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rememberMe = false;
  current_user:any;

  constructor(private router: Router) {
    this.rememberMe = localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;
    if (!sessionStorage.getItem('_id')){
      if (!sessionStorage.getItem('address')) this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})
    } else if (this.rememberMe == true) {
        this.current_user = localStorage.getItem('currentUser')
        this.current_user = JSON.parse(this.current_user)
      if (!sessionStorage.getItem('address')){
        this.router.navigate(["/auth/login"]).then(() => { window.location.reload();})  
      }
    } 
  }

  ngOnInit() {
  }

}
