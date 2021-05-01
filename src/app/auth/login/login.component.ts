import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { TransferService } from '@app/services/transfer.service';
import { FormGroup, FormControl, Validators, FormBuilder,} from '@angular/forms';

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent {
  userForm : FormGroup;
  fail = false;
  rememberMe=false;
  user:any;

  chainID: any;
  address: any;

  constructor(private router: Router, private authService: AuthService, private transferService: TransferService, private fb: FormBuilder, ) {
    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('')
    }); 
  }  

  ngOnInit(): void {     

    this.rememberMe = localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;
    if (sessionStorage.getItem('_id')){
      this.router.navigateByUrl("/home")	 
    } else if(this.rememberMe == true) {
      if (localStorage.getItem('currentUser') !==null ) {
        this.user = localStorage.getItem('currentUser');
        this.user = JSON.parse( this.user );       
        sessionStorage.setItem('_id', this.user._id)
        sessionStorage.setItem('fullname', this.user.fullname)
        sessionStorage.setItem('email', this.user.email)
        sessionStorage.setItem('roles', this.user.roles)
        //this.router.navigateByUrl("/home")
        this.router.navigate(["/home"]).then(() => { window.location.reload();})
      } 
    }
  }
  
  get email() { return this.userForm.get('email'); }  
  get password() { return this.userForm.get('password'); }
  get remember() { return this.userForm.get('remember'); }

  onSubmit(): void {
    var { email, password, remember } = this.userForm.getRawValue();

    this.authService.login(email, password).subscribe((user) => { 
      if (user == undefined || user ==null ) {
        this.fail=true;        
      } else {
        if (remember){
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('rememberCurrentUser', 'true');
        } else {
          localStorage.setItem('currentUser', '');
          localStorage.setItem('rememberCurrentUser', 'false');  
        }          
        sessionStorage.setItem('_id', user._id)
        sessionStorage.setItem('fullname', user.fullname)
        sessionStorage.setItem('email', user.email)
        sessionStorage.setItem('roles', user.roles)
        sessionStorage.setItem('user', JSON.stringify(user))          
        //this.router.navigateByUrl('/home')
        this.router.navigate(["/home"]).then(() => { window.location.reload();})
      }
    })
/*
    if (this.form_login.invalid) {
      return;
    }

    this.authService.login(this.email!, this.password!).subscribe(() => {
      this.router.navigateByUrl('/');
    });
*/
  }

  async metamask(){
    sessionStorage.getItem('address')? this.router.navigate(["/setting"]).then(() => { window.location.reload();}): await this.transferService.connectETH();
  }

}
