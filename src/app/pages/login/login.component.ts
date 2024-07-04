import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loggedIn = false;
  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthenticationService) {}

  login() {
    const userName: string = this.loginForm.get("username")?.value ?? '';
    const passWord: string = this.loginForm.get("password")?.value ?? '';
    const credentials = { username: userName, password: passWord };
    this.authService.login(credentials).subscribe({
      next: () => {
        this.loggedIn = true;
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }
}
