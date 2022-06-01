import { Ogrenci } from './../../../models/Ogrenci';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ogrsec-dialog',
  templateUrl: './ogrsec-dialog.component.html',
  styleUrls: ['./ogrsec-dialog.component.scss']
})
export class OgrsecDialogComponent implements OnInit {
  ogrenciler:Ogrenci[];
  displayedColumns=['ogrNo','ogrAdSoyad','ogrMail','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;
    constructor(
      public apiservice:ApiService,
      public matDialog:MatDialog,
      public alert:MyAlertService,
      public   dialogRef:MatDialogRef<OgrenciDialogComponent>
    ) { }
    ngOnInit() {
      this.ogrencilistele();
    }
  
    ogrencilistele() {
      this.apiservice.ogrenciliste().subscribe((o:Ogrenci[])=>{
        this.ogrenciler=o;
        this.dataSource=new MatTableDataSource(this.ogrenciler);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      });
    }
  
    filtrele(e) {
      var deger=e.target.value;
      this.dataSource.filter=deger.trim().toLowerCase();
      if(this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    ogrencisec(ogr:Ogrenci) {
      this.dialogRef.close(ogr)
    }
}
