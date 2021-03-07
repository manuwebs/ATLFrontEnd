import { SharedModule } from '../../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactHomeComponent } from './pages/contact-home/contact-home.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContactHomeComponent, ContactFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
