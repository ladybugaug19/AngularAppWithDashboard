import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projArr:Project[];
  isAdmin:boolean=false;
  role:string;
  constructor(private svc: ProjectService, private router:Router) { }

  ngOnInit() {
    //this.projects = this.svc.getProjects();
    this.svc.getProjects().subscribe(projs=>{
      this.projArr = projs;
    });

   this.role=JSON.parse(localStorage.getItem('user')).login.role;
   if(this.role=='ADMIN')
   {
     this.isAdmin=true;
   }
  }

  // onProjectSelect(projectId:number){
  //   console.log(projectId);
  //   console.log(typeof projectId);
  //   this.router.navigateByUrl("/dashboard/projects/"+projectId);
  // }

}
