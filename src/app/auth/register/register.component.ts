import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  loading: boolean | undefined;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.api.auth('register', this.user.email, this.user.password).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      alert('Register Berhasil !');
      this.router.navigate(['login']);
    }, error => {
      this.loading = false;
      console.log(error);
      alert('Silahkan coba lagi !');
    });
  }

}
