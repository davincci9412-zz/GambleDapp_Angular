import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/services';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms'

@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class PasswordSettingComponent implements OnInit {
  userForm : FormGroup;
  is_confirm_alert = false;
  _id :any
  rememberMe:any
  user:any;

  constructor(private router: Router, private route: ActivatedRoute ,private authService: AuthService, private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
    });  

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
        this.router.navigateByUrl("/home")
        //this.router.onSameUrlNavigation = 'reload'    
      } 
    }
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    
    return password && control.value !== password.value  ? {   passwordMatch: true,  }  : null;
  }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');  
  }
    
  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  onSubmit(): void {
    var { password } = this.userForm.getRawValue();

    this.authService.setting(password, this._id).subscribe((user) => { 
      if (user == undefined || user==null) {             
        this.is_confirm_alert = true
      } else {   
        this.router.navigateByUrl('/auth/login')
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
}
