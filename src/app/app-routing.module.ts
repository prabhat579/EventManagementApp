import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventFormComponent } from './components/event-form/event-form.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'create', component: EventFormComponent },
  { path: 'edit/:id', component: EventFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
