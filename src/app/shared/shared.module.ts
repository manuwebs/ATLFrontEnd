import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [TableComponent, ButtonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent, ButtonComponent
  ]
})
export class SharedModule { }
