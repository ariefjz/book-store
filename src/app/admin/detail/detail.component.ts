import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading:boolean | undefined

  constructor(
    public dialogRef:MatDialogRef<DetailComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   public api: ApiService
  ) {}

  ngOnInit(): void {}

  saveData() {
    this.loading=true;
    console.log(this.data);
    if(this.data.id == undefined) {
      this.api.post('books',this.data).subscribe(result=>{
        this.dialogRef.close(this.data);
        this.loading=false;
      },error=>{
        this.loading=false;
        alert('Tidak dapat menyimpan data');
      });

    } else {
      this.api.put('books/'+this.data.id,this.data).subscribe(result=>{
        this.dialogRef.close(result);
        console.log(result);
        this.loading=false;
      }, error=>{
        this.loading=false;
        alert('Tidak dapat memperbarui data');
      })
    }
  }

}
