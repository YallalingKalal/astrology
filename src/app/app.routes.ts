import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MemberComponent } from './pages/member/member.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { PanchangComponent } from './pages/panchang/panchang.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
       { path: 'member', component: MemberComponent },
        { path: 'add-item', component: AddItemComponent },
        { path: 'panchang', component: PanchangComponent },

    ]
  }
];
