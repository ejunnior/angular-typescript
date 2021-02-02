import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreditorListComponent } from './creditor-list.component';
import { CreditorCreateComponent } from './creditor-create.component';
import { CreditorDeleteComponent } from './creditor-delete.component';
import { CreditorDetailComponent } from './creditor-detail.component';
import { CreditorEditComponent } from './creditor-edit.component';

const routes: Routes = [
    {
        path: 'creditor',
        component: CreditorListComponent,
    },
    {
        path: 'creditor/create',
        component: CreditorCreateComponent,
    },
    {
        path: 'creditor/delete/:id',
        component: CreditorDeleteComponent
      },
      {
        path: 'creditor/detail/:id',
        component: CreditorDetailComponent
      },
      {
        path: 'creditor/edit/:id',
        component: CreditorEditComponent
      },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreditorRoutingModule { }
