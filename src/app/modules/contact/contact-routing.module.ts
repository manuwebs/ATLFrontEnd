import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { ContactHomeComponent } from './pages/contact-home/contact-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts'
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ContactHomeComponent
      },
      {
        path: 'add',
        component: ContactFormComponent
      },
      {
        path: 'edit/:id',
        component: ContactFormComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
