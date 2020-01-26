import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  LoggedIn: boolean = JSON.parse(localStorage.getItem("LoggedIn"));
  constructor(private httpClient: HttpClient) { }

  public employee: Employee;

  public isLoggedIn() {
    return this.LoggedIn;
  }

  public logout() {
    this.LoggedIn = false;
    localStorage.setItem("LoggedIn", JSON.stringify(this.LoggedIn));
    sessionStorage.clear();
  }

  //login validating employee
  public validateUser(email, password) {
    return this.httpClient
      .post<any>("http://localhost:7070/authenticate", {
        email: email,
        password: password
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data != false) {
            this.employee = data;
            console.log("emp---->" + this.employee);
            console.log(this.employee.firstName);
            console.log(this.employee);
            this.LoggedIn = true;
            localStorage.setItem("LoggedIn", JSON.stringify(this.LoggedIn));
            localStorage.setItem("user", JSON.stringify(this.employee));
            return true;
          }
          else {
            return false;
          }
          // if (data === true) {
          //   this.LoggedIn = true;
          //   return true;
          // } else {
          //   this.LoggedIn = false;
          //   return false;
          // }
        })
      );
  }

  //register
  // public register(empId, empName, empEmail, empPassword, empRole, empUserName) {
  //   console.log(empId);
  //   return this.httpClient
  //     .post<any>("http://localhost:7070/register", {
  //       empId: empId,
  //       empName: empName,
  //       empEmail: empEmail,
  //       empPassword: empPassword,
  //       empRole: empRole,
  //       empUserName: empUserName
  //     })
  //     .pipe(
  //       map(data => {
  //         console.log(data);
  //         if (data === true) {
  //           return data;
  //         } else {
  //           return false;
  //         }
  //       })
  //     );
  // }




  public register(emp: Employee) {
    console.log("regiter--->" + emp);
    return this.httpClient
      .post<any>("http://localhost:7070/register",
        emp
      )
      .pipe(
        map(data => {
          console.log(data);
          if (data === true) {
            return data;
          } else {
            return false;
          }
        })
      );
  }





  // reset password service layer,sending email to get the link to reset the password

  public resetPwd(email) {
    console.log("in authservice");
    console.log(email);
    return this.httpClient
      .post<any>("http://localhost:7070/forgot", {
        email: email
      })
      .pipe(
        map(data => {
          if (data === true) {
            console.log("data in if block ");
            console.log(data);
            return true;
          } else {
            console.log("in data else block");
            return false;
          }
        })
      );
  }

  //submiting new password

  public submitPwd(password, token) {
    console.log("token pass->",token);
    return this.httpClient
      .post<any>("http://localhost:7070/reset/" + token, {
        password: password
      })
      .pipe(
        map(data => {
          if (data === true) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  // public getManagers(): Employee[] {
  //   return this.employee.employeeSubOrdinates;
  // }

  public getEmployeeRole():string{
    return this.employee.login.role;
  }
}
