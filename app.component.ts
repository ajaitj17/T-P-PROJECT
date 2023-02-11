
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { InnerDialogComponent } from './inner-dialog/inner-dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatCard, MatCardContent } from '@angular/material/card';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'material';

  displayedColumns: string[] = ['thoughts','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatCard) card!: MatCard;
 
   constructor(private dialog:MatDialog, private api : ApiService){}


   ngOnInit(): void {
    this.getAllQuestions();
   }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllQuestions();
      }
    })
  }
  
  getAllQuestions(){
    this.api.getQuestion()
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
  
  editQuestion(row:any){
    this.dialog.open(DialogComponent,{
    width:"30%", 
    data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllQuestions();
      }
    })
  }

  deleteQuestion(id:number){
       this.api.deleteQuestion(id)
       .subscribe({
        next:(res)=>{
          alert("Post Deleted Successfully")
          this.getAllQuestions()
        },
        error:()=>{
          alert("Error while deleting!")
        }
       })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //--------------------------------------------------------------------------------------------------------


  openInnerDialog() {
    this.dialog.open(InnerDialogComponent, {
      width:'30%'
    })
}



}
