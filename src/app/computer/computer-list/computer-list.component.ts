import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Computer } from '../computer.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComputerService } from '../computer-service/computer.service';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit {

  dataSource = new MatTableDataSource<Computer>();
  computer: Computer;
  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'company', 'edit'];
  selection = new SelectionModel<Computer>(true, []);
  length = 10;
  pageIndex = 0;
  pageSize = 10;
  searchMode: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  snackBar: any;

  constructor(private computerService: ComputerService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private datePipe: DatePipe) {
                iconRegistry.addSvgIcon(
                  'delete',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/img/delete.svg'));
                iconRegistry.addSvgIcon(
                  'add',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/img/add.svg'));
                iconRegistry.addSvgIcon(
                  'edit',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));
              }

  applyFilter(filterValue: string) {
    if (filterValue === null || filterValue === '') {
      this.searchMode = false;
      this.pageIndex = 0;
      this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    } else {
      this.searchMode = true;
      this.pageIndex = 0;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.length = 1;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Computer): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public getPage(event?: PageEvent) {
      this.getPageNoSearch(event.pageSize, event.pageIndex + 1);
      return event;
  }

  private getPageNoSearch(index: number, size: number) {
    this.computerService.getComputerByPage(index, size).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
    });
    console.log(this.dataSource);
    this.computerService.getCount().subscribe(response => {
      this.length = response;
    });
  }

  createDialog(): void {
    this.computer = new Computer();
    const dialogRef = this.dialog.open(ComputerCreateComponent, {
      data: {computer: this.computer}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.computer = result;
        if (this.computer.introduced != null) {
          this.computer.introduced = this.datePipe.transform(this.computer.introduced , 'yyyy-MM-dd');
        }
        if (this.computer.discontinued != null) {
        this.computer.discontinued = this.datePipe.transform(this.computer.discontinued , 'yyyy-MM-dd');
        }
        this.addComputer(this.computer);
      }
    });
  }

  addComputer(newComputer: Computer) {
    this.computerService.createComputer(newComputer).subscribe(response => {
      this.refresh();
      this.openSnackBar('Successfully added computer !', 'ADD');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,

    });
  }

  public refresh() {
    this.getPageNoSearch(this.pageIndex + 1, this.pageSize);
    // tslint:disable-next-line: deprecation
    return event;
  }

  ngOnInit() {
    this.getPageNoSearch(this.pageSize, this.pageIndex + 1);
  }

}
