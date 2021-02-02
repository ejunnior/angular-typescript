import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetCreditorByIdModel } from "./creditor-get-by-id.model";
import { CreditorService } from "./creditor.service";

@Component({
    templateUrl: './creditor-detail.component.html'
})
export class CreditorDetailComponent
    implements OnInit {
    pageTitle: string = "Detail"
    creditor: GetCreditorByIdModel;
    errorMessage: string = '';
    creditorId: number;

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
                    this.creditor = creditor;
                },
                error: (err) => (this.errorMessage = err)
            });
    }

    edit(): void {
        this.router.navigate(['/creditor/edit/' + this.creditorId]);
    }
}