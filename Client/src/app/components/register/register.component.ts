import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { User } from 'src/app/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  full_name!: string;
  email!: string;
  password!: string;
  re_password!: string;
  user!: User;

  constructor(private router: Router) {
    this.full_name = "";
    this.email = "";
    this.password = "";
    this.re_password = "";
    this.user = new User();
  }

  ngOnInit(): void {

  }

  register() {
    this.full_name = this.full_name.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();
    this.re_password = this.re_password.trim();

    if(this.full_name && this.email && this.password && this.re_password === this.password ) {
      this.user.full_name = this.full_name;
      this.user.email = this.email;
      this.user.password = this.password;

      axios.post("https://server-todolist.onrender.com/api/user/register", this.user).then((res) => {
        this.router.navigate(['/login']);
      }).catch(err => console.log(err))
    }
  }
}
