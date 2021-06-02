import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.checkLogin();
  }

  checkLogin() {
    this.api.get('bookswithauth/status').subscribe(res => {
      return;
    }, error => {
      this.router.navigate([
        '/login'
      ]);
    })
  }

}
