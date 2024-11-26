import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Entity/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { RegistrationRequest } from 'src/app/Entity/registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform!: FormGroup;
  registerReq: RegistrationRequest = new RegistrationRequest;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    const formcontrols = {
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.required]),

    };
    this.registerform = this.fb.group(formcontrols, {validators: this.passwordMatchValidator()});
  }
  get fullname() {
    return this.registerform.get('fullname');
  }
  get email() {
    return this.registerform.get('email');
  }

  get password() {
    return this.registerform.get('password');
  }
  get confirmPassword() {
    return this.registerform.get('confirmPassword');
  }
  get acceptTerms() {
    return this.registerform.get('acceptTerms');
  }
  get phonenumber() {
    return this.registerform.get('phonenumber');
  }

  register() {
    this.registerReq.username = this.fullname?.value;
    this.registerReq.email = this.email?.value;
    this.registerReq.password = this.password?.value;
    this.registerReq.phonenumber = this.phonenumber?.value;
    
    this.authService.registerUser(this.registerReq).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.router.navigate(['/activate-account']);

  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      // Check if passwords match
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

}
