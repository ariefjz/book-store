import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  loading: boolean | undefined;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.api.auth('login', this.user.email, this.user.password).subscribe(resp => {
      localStorage.setItem('authToken',JSON.stringify(resp));
      this.loading = false;
      alert('Login Berhasil !');
      this.router.navigate(['admin']);
    }, error => {
      this.loading = false;
      console.log(error);
      alert('Silahkan coba lagi !');
    });
  }
}
