import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { UserService, AuthenticationService } from "../_services";

@Component({
  templateUrl: "register.component.html",
  styleUrls: ["../login/login.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private usersService: UserService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // is the form is invalid then kill the request
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.usersService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('thisisdata', data)
          this.router.navigate(["/login"], {
            queryParams: { registered: true }
          });
        },
        error => {
          if(error.message === undefined) {
            console.log('hellosss');
          }
          this.error = error;
          console.log('asaa',this.error);
          this.loading = false;
        }
      );
  }
}
