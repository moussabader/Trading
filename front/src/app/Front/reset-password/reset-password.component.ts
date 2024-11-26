import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  isCodeValid = false;
  isCodeSent = false;
  codeNotValid = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    const formcontrols = {
      phone: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]),

    };
    this.resetForm = this.fb.group(formcontrols);
  }

  get phone() {
    return this.resetForm.get('phone');
  }

  get code() {
    return this.resetForm.get('code');
  }
  get password() {
    return this.resetForm.get('password');
  }

  sendCode() {
    this.authService.sendResetSms(this.phone?.value).subscribe({
      next: (response) => {
        this.isCodeSent = true;        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verifyCode() {
    this.authService.verifyResetCode(this.code?.value).subscribe({
      next: (response) => {
        console.log(response);
        this.isCodeValid = response
        this.codeNotValid = !response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.phone?.value, this.password?.value).subscribe({
      next: (response) => {
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
