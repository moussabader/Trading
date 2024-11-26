import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Entity/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateForm!: FormGroup;
  connectedUser: User = new User();
  connectedUserData: User = new User();
  invalidPassword!: boolean;
  constructor(private userService: UserService, private router: Router, private authService: AuthService,) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.connectedUserData = JSON.parse(userData);
      this.connectedUser.id = this.connectedUserData.id;
      this.connectedUser.fullname = this.connectedUserData.fullname;
      this.connectedUser.password = this.connectedUserData.password;
      this.connectedUser.email = this.connectedUserData.email;
      
    } else {
      console.log('No user data found in localStorage.');
    }

    this.updateForm = new FormGroup({
      'userData': new FormGroup({
        'fullname': new FormControl(this.connectedUser.fullname, [Validators.required]),
        'email': new FormControl(this.connectedUser.email, [Validators.email, Validators.required]),
        'password': new FormControl(null, [Validators.required]),
        'newPassword': new FormControl(null)
      }),
    });
  }

  onSubmit() {
    if (this.updateForm.get('userData.password')?.value) {

      this.userService.VerifyPassword(this.connectedUser.id,
        this.updateForm.get('userData.password')?.value)
        .subscribe({
          next: (res) => {
            if (res) {
              this.invalidPassword = false;
            } else {
              this.invalidPassword = true;
            }
          },
          error: (err) => {
            console.log('error while verifying password', err);
          },
          complete: () => {
            if (this.invalidPassword) {
              console.log('incorrect password');

            } else {
              this.connectedUser.fullname = this.updateForm.get('userData.fullname')?.value;
            this.connectedUser.password = this.updateForm.get('userData.newPassword')?.value
              ? this.updateForm.get('userData.newPassword')?.value
              : this.updateForm.get('userData.password')?.value;

            //send update request
            this.userService.modifyUser(this.connectedUser).subscribe({
              next: (res) => {
                console.log('updated', res);
                this.authService.storeUserData(res);
                window.location.reload();

              },
              error: (err) => {
                console.log('error in update', err);
              },
            });
            }
            
          }
        });

      

    }

  }
}
