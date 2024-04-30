import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { McoversComponent } from './mcovers.component';




const routes: Routes = [ 
  { path: '', title: 'Health Covers', component: McoversComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)]
})
export class McoversRoutingModule { }
