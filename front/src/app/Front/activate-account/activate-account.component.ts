import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/Entity/loginResponse';
import { Role_User } from 'src/app/Entity/role-user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationform!: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }


    ngOnInit(): void {
        const formcontrols = {
          code: new FormControl('', [Validators.required]),

        };
        this.activationform = this.fb.group(formcontrols);
    }

    get code() {
        return this.activationform.get('code');
    }


    onSubmit() {
        this.authService.activateUserAccount(this.code?.value).subscribe({
            next: (response) => {
                console.log(response);
                this.router.navigate(['/login']);
               
            },
            error: (error) => {
                console.error('activation failed', error);

            }
        });
    }

}
