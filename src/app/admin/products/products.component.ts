import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  loadingDelete: any = {};
  books: any = [];

  loading: boolean | undefined;

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.checkLogin();
    this.getBooks();
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

  productDetail(data : any, idx : any) {
    let dialog = this.dialog.open(DetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
        if(idx == -1) this.books.push(res);      
        else this.books[idx] = data; 
      }
    })
  }

  deleteProduct(id: any, idx: any) {
    var _confirm = confirm("Yakin menghapus data " + id + " ?");
    if(_confirm) {
      this.loadingDelete[idx] = true;
      this.api.delete('books/' + id).subscribe(result => {
        this.books.splice(idx, 1);
        this.loadingDelete[idx] = false;
      }, error =>{ 
        this.loadingDelete[idx] = false;
        alert('Tidak dapat menghapus data');
        });
      }
  }

  uploadFile(data: any) {
    let dialog=this.dialog.open(FileUploaderComponent, {
      width:'400px',
      data:data
     });
     dialog.afterClosed().subscribe(res=>{
       return;
     })
  }

  downloadFile(data: any)
  {
    FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/'+data.url);
  }
    

}
