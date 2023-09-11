import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UpdateItemComponent } from './update-item/update-item.component';
import { SharedModule } from '../shared/shared.module';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { ControlTableComponent } from './control-table/control-table.component';

const routers: Routes = [
  { path: '', redirectTo: 'manage-menu', pathMatch: 'full' },
  { path: 'manage-menu', component: ManageMenuComponent },
  { path: 'add-admin', component: AddAdminComponent },
  { path: 'all-cashers', component: DeleteAdminComponent },
  { path: 'control-tables', component: ControlTableComponent },
]

@NgModule({
  declarations: [
    ManageMenuComponent,
    UpdateItemComponent,
    AddAdminComponent,
    DeleteAdminComponent,
    ControlTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SharedModule,
    RouterModule.forChild(routers)
  ]
})
export class AdminModule { }
