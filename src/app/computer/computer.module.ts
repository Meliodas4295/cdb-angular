import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerEditComponent } from './computer-edit/computer-edit.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ComputerListComponent, ComputerCreateComponent, ComputerEditComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ComputerListComponent
  ],
  providers: [
    DatePipe,
  ],
  entryComponents: [
    ComputerCreateComponent,
  ]
})
export class ComputerModule { }
