import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPwdComponent } from './auth/reset-pwd/reset-pwd.component';
import { SubmitPwdComponent } from './auth/submit-pwd/submit-pwd.component';
import { DefaultComponent } from './shared/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeesComponent } from './modules/employees/employees.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { ProjectDetailsComponent } from './modules/projects/project-details/project-details.component';
import { BugCreateComponent } from './modules/bugs/bug-create/bug-create.component';
import { BugViewComponent } from './modules/bugs/bug-view/bug-view.component';
import { BugEditComponent } from './modules/bugs/bug-edit/bug-edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BugsComponent } from './modules/bugs/bugs.component';
import { RegisterComponent } from './modules/register/register.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "login", component: AuthComponent, children: [
      { path: "", component: LoginComponent, pathMatch: "full" },
      { path: "resetPwd", component: ResetPwdComponent },
      {
        path: "reset", children: [
          { path: "**", component: SubmitPwdComponent }
        ]
      }
    ]
  },
  {
    path: "dashboard", component: DefaultComponent, data: { breadcrumb: null }, children: [
      { path: "", component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, pathMatch: "full" },
      { path: "employees", component: EmployeesComponent, data: { breadcrumb: 'Employees' } },
      { path: "register", component: RegisterComponent, data: { breadcrumb: 'Register' }},
	  {
        path: "projects", data: { breadcrumb: 'Projects' }, children: [
          { path: "", component: ProjectsComponent, pathMatch: "full", data: { breadcrumb: null } },
          {
            path: ":id", component: ProjectDetailsComponent, data: { breadcrumb: '{id}' }
          },
          {
            path: "bug", component: BugsComponent, data: { breadcrum: null }, children: [
              //{ path: "",  pathMatch: "full", data: { breadcrum: null} },
              {
                path: "add/:projectId", component: BugCreateComponent, //data: { breadcrumb: 'Add' } 
              },
              {
                path: "view/:projectId/:bugId", component: BugViewComponent, //data: { breadcrumb: 'View' } 
              },
              {
                path: "edit/:projectId/:bugId", component: BugEditComponent, //data: { breadcrumb: 'Edit' } 
              }
            ]
          }
        ]
      },

      // {
      //   path: "bug",component: BugsComponent, data: { breadcrumb: 'Bug' }, children: [
      //     { path: "add/:projectId", component: BugCreateComponent },
      //     { path: "view/:projectId/:bugId", component: BugViewComponent, data: { breadcrumb: 'View' } },
      //     { path: "edit/:projectId/:bugId", component: BugEditComponent, data: { breadcrumb: 'Edit' } }
      //   ]
      // }
    ], canActivate: [AuthGuardService]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
