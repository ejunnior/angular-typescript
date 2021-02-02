import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fromEvent, merge, Observable, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { GenericValidator } from "../core/generic-validator";
import { EditCreditorModel } from "./creditor-edit.model";
import { GetCreditorByIdModel } from "./creditor-get-by-id.model";
import { CreditorService } from "./creditor.service";

@Component({
    templateUrl: './creditor-edit.component.html'
})

export class CreditorEditComponent
    implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef })
    formInputElements: ElementRef[];
    pageTitle: string = "Edit";
    creditor: EditCreditorModel;
    errorMessage: string = '';
    creditorId: number;
    editForm: FormGroup;
    displayMessage: { [key: string]: string } = {};
    validationMessages: { [key: string]: { [key: string]: string } };
    genericValidator: GenericValidator;

    constructor(
        private creditorService: CreditorService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.creditorId = parseInt(this.route
            .snapshot.paramMap.get('id'));

        this.buildValidationMessages();
        this.buildForm();
        this.getCreditor(this.creditorId);
    }

    buildValidationMessages(): void {
        this.validationMessages = {
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 80 characters.',
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);

    }

    getCreditor(creditorId: number): void {
        this.creditorService
            .getById(creditorId)
            .subscribe({
                next: (creditor) => {
                    this.displayCreditor(creditor);
                },
                error: (err) => (this.errorMessage = err)
            });
    }

    edit(): void {
        if (this.editForm.valid) {
            if (this.editForm.dirty) {
                this.creditor = { ...this.creditor, ...this.editForm.value };
                this.creditor.id = this.creditorId;
                this.creditorService.edit(this.creditor).subscribe({
                    next: () => this.onEditComplete(),
                    error: (err) => (this.errorMessage = err),
                });
            }
        }
    }


    buildForm(): void {
        this.editForm = this.formBuilder.group({
            name: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(80),
                ],
            ],
        });
    }

    displayCreditor(creditor: GetCreditorByIdModel): void {
        if (this.editForm) {
            this.editForm.reset();
        }

        this.editForm
            .patchValue({
                name: creditor.name
            });
    }

    onEditComplete(): void {
        this.editForm.reset();
        this.router.navigate(['/creditor']);
    }

    ngAfterViewInit(): void {
        const controlBlurs: Observable<
            any
        >[] = this.formInputElements.map((formControl: ElementRef) =>
            fromEvent(formControl.nativeElement, 'blur')
        );

        merge(this.editForm.valueChanges, ...controlBlurs)
            .pipe(debounceTime(800))
            .subscribe((value) => {
                this.displayMessage = this.genericValidator.processMessages(
                    this.editForm
                );
            });
    }

}
