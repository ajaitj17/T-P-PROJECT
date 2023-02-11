import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postQuestion(data : any){
    return this.http.post<any>("http://localhost:3000/posts/",data);
  }
  getQuestion(){
    return this.http.get<any>("http://localhost:3000/posts/");
  }
  putQuestion(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data);
  }
  deleteQuestion(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id);
  }

  postComment(data : any){
    return this.http.post<any>("http://localhost:3000/comments/",data);
  }

  getComment(){
    return this.http.get<any>("http://localhost:3000/comments/");
  }
}
