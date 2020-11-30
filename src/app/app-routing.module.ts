import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinDetailsComponent } from './pin-details/pin-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  { path: '', component: SidebarComponent },
  { path: ':pinId', component: PinDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
