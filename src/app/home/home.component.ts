import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: any = [];

  loading: boolean | undefined;

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public router: Router
  ) { }
  

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.loading = true;
    this.api.get('books').subscribe(resp => {
      this.books = resp;
      this.loading = false;
    }, error => {
      this.loading = false;
      alert('Silahkan reload halaman');
    })
  }

}
