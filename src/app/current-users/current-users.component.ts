import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { CurrentusersService } from '../services/currentusers.service';

interface User

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css']
})
export class CurrentUsersComponent implements OnInit {
  users = [];
  constructor(private CurrentUsersService: CurrentusersService) { }


  ngOnInit() {
    console.log('hitting the userHistory API Call service method BEFORE THE METHOD...this is the data!', this.users)
    this.CurrentUsersService.getUsers().subscribe(user=>{
      this.users.push(user.data)
      console.log('hitting the userHIstory API Call service method...this is the data!', this.users.data)
      // this.messages.push(message)
    })
  }

}
