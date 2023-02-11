import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-inner-dialog',
  templateUrl: './inner-dialog.component.html',
  styleUrls: ['./inner-dialog.component.css']
})
export class InnerDialogComponent implements OnInit {
  CommentForm !: FormGroup;
  constructor(private formbuilder : FormBuilder,private api: ApiService,private dialogRef : MatDialogRef<InnerDialogComponent>,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.CommentForm = this.formbuilder.group({
      Comments : ['',Validators.required]
  });
  this.getAllComments();
  }

  addComment(){
    if(this.CommentForm.valid){
      this.api.postComment(this.CommentForm.value)
      .subscribe({
        next:(res)=>{
          alert("Comment added Successfully")
          this.CommentForm.reset();
          this.dialogRef.close('save');
          console.log(res)
        },
        error:()=>{
          alert("Error while adding the question")
        }
       })
    }
  }
  
  displayedColumns: string[] = ['Comments'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  getAllComments(){
    this.api.getComment()
    .subscribe({
      next:(res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error While Fetching?")
      }
    })
  }
}
