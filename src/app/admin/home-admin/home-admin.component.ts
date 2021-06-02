import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkLogin;
  }

  mode:string='side';

  checkLogin() {
    this.api.get('bookswithauth/status').subscribe(res => {
      return;
    }, error => {
      this.router.navigate([
        '/login'
      ]);
    })
  }

  logOut() {
    let conf = confirm('Yakin ingin keluar ?');

    if(conf) {
      localStorage.removeItem('authToken');
      this.router.navigate([
        '/home'
      ]);
    }
  }

}