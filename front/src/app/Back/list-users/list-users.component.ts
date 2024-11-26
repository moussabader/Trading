import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStateService } from 'src/app/component-state.service';
import { Role_User } from 'src/app/Entity/role-user';
import { User } from 'src/app/Entity/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  search="";
  users: User[] = [];
  selectedUser!: User ;

  constructor(private userService: UserService, private componentStateService: ComponentStateService) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getUsers()
      .subscribe(
        response => {
          this.users = response.filter(user => user.roles.some(role => role.name === Role_User.ROLE_USER));
        });
  }

  detailsUser(user: User) {
    this.componentStateService.selectUser(user);
    this.componentStateService.changeComponent('user-details');
  }
  changeStatus() {
    const updatedUser = new User();
    updatedUser.enabled = !this.selectedUser.enabled;
    updatedUser.id = this.selectedUser.id;
    updatedUser.fullname = this.selectedUser.fullname;
    updatedUser.password = this.selectedUser.password;
    console.log(updatedUser);
    
    this.userService.changeStatus(updatedUser.id, updatedUser.enabled)
      .subscribe();
    window.location.reload();
  }
}
