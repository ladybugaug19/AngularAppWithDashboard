import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { BugDtls } from "../models/bug-dtls.model";

@Injectable({
  providedIn: "root"
})
export class BugService {
  private isBugAdded: boolean = false;
  constructor(private httpClient: HttpClient) {}

  public saveBugDtls(bug: BugDtls): Observable<boolean> {
    return this.httpClient
      .post<boolean>("http://localhost:7070/addBug", bug)
      .pipe(
        map(data => {
          if (data === true) {
            this.isBugAdded = data;
            return data;
          } else {
            return false;
          }
        })
      );
  }

  public getIsBugAdded(): boolean {
    return this.isBugAdded;
  }

  public getBugById(bugId: number): Observable<any> {
    console.log("Bug ID---->");
    console.log(bugId);
    return this.httpClient.get<any>("http://localhost:7070/bug/" + bugId).pipe(
      map(data => {
        console.log(data);
        if (data != false) return data;
        else {
          return data;
        }
      })
    );
  }

  public getBugListByProject(projectid:number):Observable<BugDtls[]>{
    return this.httpClient.get<any>("http://localhost:7070/bugs/"+projectid)
    .pipe(map(data=>{
      if(data != false){
        return data;
      }else{
        console.error("Data Not Found!!");
      }
    }));
  }

  public getBugStatusCount():Observable<Number[]>{
    return this.httpClient.get<any>("http://localhost:7070/getBugStatusCount/")
    .pipe(map(data=>{
      if(data != false){
        return data;
      }else{
        console.error("Data Not Found!!");
      }
    }));
  }

  public getBugPriorityCount():Observable<Number[]>{
    return this.httpClient.get<any>("http://localhost:7070/getBugPriorityCount/")
    .pipe(map(data=>{
      if(data != false){
        return data;
      }else{
        console.error("Data Not Found!!");
      }
    }));
  }

  public updateBugDtls(bug: BugDtls){
    return this.httpClient.put<boolean>("http://localhost:7070/updateBug",bug)
    .pipe(map(resData=>{
      if(resData===true){
        return resData;
      }else{
        return resData;
      }
    }))
  }
}
