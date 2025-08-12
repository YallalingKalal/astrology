import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MemberComponent } from './pages/member/member.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { PanchangComponent } from './pages/panchang/panchang.component';
import { EventComponent } from './pages/event/event.component';
import { ChatComponent } from './pages/chat/chat.component';
import { KundaliComponent } from './pages/kundali/kundali.component';
import { OnlineAbhishekComponent } from './pages/online-abhishek/online-abhishek.component';
import { VRVideoComponent } from './pages/vr-video/vr-video.component';
import { AbhishekComponent } from './pages/abhishek/abhishek.component';
import { UserMgmtComponent } from './pages/user-mgmt/user-mgmt.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'userregistration', component: AbhishekComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'member', component: MemberComponent },
      { path: 'add-item', component: AddItemComponent },
      { path: 'panchang', component: PanchangComponent },
      { path: 'event', component: EventComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'kundali', component: KundaliComponent },
      { path: 'online-abhishek', component: OnlineAbhishekComponent },
      { path: 'VR-Video', component: VRVideoComponent },
      { path: 'user-management', component: UserMgmtComponent },

    ],
  },
];
