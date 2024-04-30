import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', title: 'Team Members', component: TeamComponent },
  { path: 'new', title: 'New Team Member', component: NewComponent },
  { path: 'edit/:id', title: 'Update Team Member', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
