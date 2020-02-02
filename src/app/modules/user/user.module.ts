import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PipeModule } from '../pipe/pipe.module';
import { GroupComponent } from './components/group/group.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, GroupComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    PipeModule,
    SharedModule
  ]
})
export class UserModule { }
