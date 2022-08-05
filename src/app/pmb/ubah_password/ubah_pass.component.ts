import { Component, OnInit, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

declare var $: any;

@Component({
	selector: 'app-pmb-ubah-password',
	templateUrl: './ubah_pass.component.html'
})

export class UbahPassComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    @ViewChild('signInNgForm') signInNgForm: NgForm;
    signInForm: FormGroup;

    showAlert: boolean = false;
  
	constructor(
		private element: ElementRef,
		private _authService: AuthService,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _router: Router
    ) {
		this.nativeElement = element.nativeElement;
		this.sidebarVisible = false;
    }



 
    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        // const body = document.getElementsByTagName('body')[0];
        // body.classList.add('login-page');
        // body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        // setTimeout(function() {
        // after 1000 ms we add the class animated to the login/register card
        card.classList.remove('card-hidden');
        // }, 700);

        this.signInForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [''],
        });

    }
	sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe(
            (data) => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/pmb/dashboard';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                // this.alert = {
                //     type: 'error',
                //     message: 'EMP_LOGIN.BUTTONS.SAVE.ERROR',
                // };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
 
}
