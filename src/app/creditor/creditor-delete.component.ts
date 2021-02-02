import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetCreditorByIdModel } from "./creditor-get-by-id.model";
import { CreditorService } from "./creditor.service";

@Component({
    templateUrl: './creditor-delete.component.html'
})
export class CreditorDeleteComponent
    implements OnInit {
    pageTitle: string = "Delete"
    creditorId: number;
    creditor: GetCreditorByIdModel;
    errorMessage: string = '';

    constructor(
        private creditorService: CreditorService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.creditorId = parseInt(this.route
            .snapshot.paramMap.get('id'));

        this.getCreditor(this.creditorId);
    }

    getCreditor(creditorId: number): void {
        this.creditorService
            .getById(creditorId)
            .subscribe({
                next: (creditor) => {
                    this.creditor = creditor
                },
                error: (err) => (this.errorMessage = err)
            });
    }

    delete(): void {
        this.creditorService
            .delete(this.creditorId)
            .subscribe({
                next: () => this.onDeleteComplete(),
                error: (err) => (this.errorMessage = err),
            });
    }

    onDeleteComplete(): void {
        this.router.navigate(['/creditor']);
    }
}