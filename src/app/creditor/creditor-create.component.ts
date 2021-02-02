import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { GenericValidator } from "../core/generic-validator";
import { debounceTime } from 'rxjs/operators';
import { Observable, merge, fromEvent } from 'rxjs';
import { Router } from "@angular/router";
import { CreateCreditorModel } from "./creditor-create.model";
import { CreditorService } from "./creditor.service";

@Component({
    templateUrl: './creditor-create.component.html'
})

export class CreditorCreateComponent
    implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef })        
    formInputElements: ElementRef[];    
    pageTitle: string = "Creditor";
    createForm: FormGroup;
    creditor: CreateCreditorModel;
    errorMessage: string = '';
    displayMessage: { [key: string]: string } = {};
    validationMessages: { [key: string]: { [key: string]: string } };
    genericValidator: GenericValidator;

    constructor(
        private creditorService: CreditorService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.buildValidationMessages();
        this.buildForm();
    }

    buildForm(): void {
        this.createForm = this.formBuilder.group({
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

    create(): void {
        if (this.createForm.valid) {
            if (this.createForm.dirty) {
                this.creditor = { ...this.creditor, ...this.createForm.value };
                this.creditorService
                    .create(this.creditor).subscribe({
                        next: () => this.onCreateComplete(),
                        error: (err) => (this.errorMessage = err)

                    });
            }
        }
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

    onCreateComplete(): void {
        this.createForm.reset();
        this.router.navigate(['/creditor']);
    }

    ngAfterViewInit(): void {
        const controlBlurs: Observable<
            any
        >[] = this.formInputElements.map((formControl: ElementRef) =>
            fromEvent(formControl.nativeElement, 'blur')
        );

        merge(this.createForm.valueChanges, ...controlBlurs)
            .pipe(debounceTime(800))
            .subscribe((value) => {
                this.displayMessage = this.genericValidator.processMessages(
                    this.createForm
                );
            });
    }
}
