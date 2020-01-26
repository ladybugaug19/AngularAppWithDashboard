import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "src/app/services/employee.service";
import { Employee } from "src/app/models/employee.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}
  //employee:Employee;
  manager: Employee[];
  employee: Employee = {
    empMgr: {
      empId: null
    },
    firstName: "",
    lastName: "",
    userName: "",
    login: {
      email: "",
      emp: null,
      password: "",
      role: ""
    }
  };

  ngOnInit() {
    this.employeeService.getManagers().subscribe(data => {
      this.manager = data;
      console.log(this.manager);
    });
  }

  onSubmit() {
    this.employeeService.register(this.employee).subscribe(data => {
      if (data == true) {
        console.log("success");
        this.router.navigateByUrl("/login");
      } else {
        console.log(data);
      }
    });
    console.log(this.employee);
  }
}
