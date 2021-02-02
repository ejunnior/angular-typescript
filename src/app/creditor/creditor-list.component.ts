import { Component, OnInit } from "@angular/core";
import { CreditorService } from "./creditor.service";
import { GetCreditorModel } from "./creditor-get.model";

@Component({
    templateUrl: './creditor-list.component.html'
})
export class CreditorListComponent implements OnInit {
    pageTitle: string = "Creditor"
    creditors: GetCreditorModel[];

    constructor(
        private creditorService: CreditorService) {

    }

    ngOnInit(): void {
        this.creditorService.get ().subscribe({
            next: (creditors) => { 
                this.creditors = creditors
            }
        });
    }
}