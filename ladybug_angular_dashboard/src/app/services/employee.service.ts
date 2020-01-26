import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {}

  public getMgrDtls(empId: number): Observable<Employee> {
    return this.httpClient
      .get<Employee>("http://localhost:7070/empMgr/" + empId)
      .pipe(
        map(resData => {
          console.log(resData);
          return resData;
        })
      );
  }

  public getEmployeeList(){
    return this.httpClient
    .get<Employee[]>("http://localhost:7070/employees")
    .pipe(
      map(resData=>{
        console.log(resData);
        resData.forEach(emp => {
          emp.userName = emp.login.email.split("@")[0];
        });
        return resData;
      })
    )
  }

  employees: Employee[];
  // public getEmployees(){
  //   return this.httpClient
  //       .get<Employee>("http://localhost:7070/employees")
  //       .pipe(
  //         map(data=> {
  //           // if(data!=false){
  //           //   return data;
  //           // }
  //           return data;
  //         })
  //       );

  // }

  public getEmployees() {
    return this.employees;
  }

  public getManagers() {
    return this.httpClient
      .get<Employee[]>("http://localhost:7070/manager")
      .pipe(
        map(data => {
          return data;
        })
      );
  }
  
  public register(employee:Employee) {
    console.log(employee);

    return this.httpClient
      .post<any>("http://localhost:7070/register", 
        employee
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
  
}
