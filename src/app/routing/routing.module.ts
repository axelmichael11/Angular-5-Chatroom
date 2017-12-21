import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


//page navigation...
import { ChatEntryComponent } from '../chat-entry/chat-entry.component';
import { AppComponent} from '../app.component';
import { ChatroomComponent } from '../chatroom/chatroom.component'

const routes : Routes = [

      {path: 'login', component: ChatEntryComponent},
      {path: 'chatroom/:nick', component: ChatroomComponent }
    ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
