import { Component, OnInit, Inject } from '@angular/core';
import { Computer } from '../computer.model';
import { Company } from 'src/app/company/company.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CompanyService } from 'src/app/company/company-service/company.service';

export interface DialogData {
  computer: Computer;
}

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {

  companyList: Company[];
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<ComputerCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private companyService: CompanyService) {

                this.minDate = new Date(1970, 0, 2);
                const d =  new Date();
                const year = d.getFullYear();
                const month = d.getMonth();
                const day = d.getDate();
                this.maxDate = new Date(year + 20, month, day);
              }

onNoClick(): void {
  this.dialogRef.close();
}


getCompanies() {
  this.companyService.getCompanies().subscribe(response => {
    this.companyList = response;
  });
}


dateValidator(): boolean {

  if (this.data.computer.introduced !== null &&
    this.data.computer.discontinued !== null &&
    new Date(this.data.computer.introduced) > new Date(this.data.computer.discontinued) ) {
    return true;
  }
  return false;
}

  ngOnInit() {
    this.getCompanies();
  }

}
