import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [{
    projectId: 1,
    projectName: "Project 1",
    projectDesc: "Lorem ipsome 11111",
    projectMgr: 1
  },
  {
    projectId: 2,
    projectName: "Project 2",
    projectDesc: "Lorem ipsome 22222",
    projectMgr: 1
  },
  {
    projectId: 3,
    projectName: "Project 3",
    projectDesc: "Lorem ipsome 333333",
    projectMgr: 2
  }
  ];

  constructor(private httpClient: HttpClient) { }

  public getProjects():Observable<Project[]> {
    console.log("hhhhhh");
    return this.httpClient
      .get<Project[]>("http://localhost:7070/projects")
      .pipe(map(responseData=>{ console.log(responseData); this.projects=responseData; return responseData}));
  }

  // public getProjects():Project[]{
  //   return this.projects;
  // }

  public getSingleProject(id:number):Observable<Project>{
    // let p:Project=null;
    // this.projects.forEach((proj)=>{
    //   if(proj.projectId === id){
    //     p = proj;
    //   }
    // });
    // return p;

    return this.httpClient
    .get<Project>("http://localhost:7070/project/"+id)
    .pipe(map(resData=>{return resData;}));
  }


  public getEmpListInProject(projectId:number){
    return this.httpClient.get<any>("http://localhost:7070/employeesDevTest/"+projectId).pipe(map(data=>{
      return data;
    }));
  }


}
