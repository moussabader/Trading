import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from './Entity/user';
import { Portfolio } from './Entity/portfolio';
import { Role_User } from './Entity/role-user';

@Injectable({
  providedIn: 'root'
})
export class ComponentStateService {
  user: User = new User();
  private currentComponentSource = new BehaviorSubject<string>('dash');
    currentComponent$ = this.currentComponentSource.asObservable();

  private selectedUser = new BehaviorSubject<User>(this.user);
  selectedUser$ = this.selectedUser.asObservable();

    changeComponent(component: string) {
        this.currentComponentSource.next(component);
        
    }

    selectUser(user: User) {
      this.selectedUser.next(user);
    }
}
