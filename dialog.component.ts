import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Post";
  constructor(private formbuilder : FormBuilder,
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
     this.productForm = this.formbuilder.group({
         thoughts : ['',Validators.required]
     });
     if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['thoughts'].setValue(this.editData.thoughts)
     }
  }
  addQuestion(){
    if(!this.editData){
    if(this.productForm.valid){
      this.api.postQuestion(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Question added Successfully")
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the question")
        }
      })
    }
  }
  else{
    this.updateProduct()
  }
}
updateProduct(){
  this.api.putQuestion(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Question updated Successfully")
      this.productForm.reset();
      this.dialogRef.close('update')
},
error:()=>{
  alert("Error while Updating")
}
  })
 
}

}
