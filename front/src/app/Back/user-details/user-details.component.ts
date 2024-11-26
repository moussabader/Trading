import { Component, OnInit } from '@angular/core';
import { ComponentStateService } from 'src/app/component-state.service';
import { User } from 'src/app/Entity/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  searchTransactions="";
  searchHoldings="";
  userRole="";
  constructor(private componentStateService: ComponentStateService) {}

  selectedUser!: User;
  ngOnInit() {
    this.componentStateService.selectedUser$.subscribe(user => {
        this.selectedUser = user;
        this.selectedUser.roles.map(r => {
          this.userRole = r.name + ', ' + this.userRole
        })
        console.log(user);
              
    });
}

}
