import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core-module";
import { CreditorCreateComponent } from "./creditor-create.component";
import { CreditorDeleteComponent } from "./creditor-delete.component";
import { CreditorDetailComponent } from "./creditor-detail.component";
import { CreditorEditComponent } from "./creditor-edit.component";
import { CreditorListComponent } from "./creditor-list.component";
import { CreditorRoutingModule } from "./creditor-routing.module";
import { CreditorData } from "./creditor-data";
import {InMemoryWebApiModule} from "angular-in-memory-web-api"

@NgModule({
    imports:[
        CoreModule,
        CreditorRoutingModule,
        InMemoryWebApiModule.forRoot(CreditorData)
    ],
    declarations:[
        CreditorListComponent,
        CreditorCreateComponent,
        CreditorDeleteComponent,
        CreditorEditComponent,
        CreditorDetailComponent
    ]
})

export class CreditorModule { }