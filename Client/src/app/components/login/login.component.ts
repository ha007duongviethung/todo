import { AuthService } from '../../services/auth.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  loggedIn!: boolean;
  @ViewChild('googleBtnRef')
  googleBtn?: ElementRef;
  email!: string;
  password!: string;
  _user!: User;

  constructor(private router: Router, private authService: SocialAuthService, private AuthService: AuthService) {
    this.email = "";
    this.password = "";
    this._user = new User();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login(): void {
    this.email = this.email.trim();
    this.password = this.password.trim();

    if(this.email || this.password) {
      this._user.email = this.email;
      this._user.password = this.password;
      axios.post("https://server-todolist.onrender.com/api/user/login", this._user).then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data.user?._id))
        this.router.navigate(['/home']);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  // signInWithGoogle(): void {
  //   console.log("HAHA")
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
  //   });
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }

  loginWithGoogle() {
    this.AuthService.googleSignIn();
  }
}
