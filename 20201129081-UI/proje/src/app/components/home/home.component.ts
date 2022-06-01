import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { MatSort } from '@angular/material/sort';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ogrenciler:Ogrenci[];
  displayedColumns=['ogrNo','ogrAdSoyad','ogrMail','ogrYas','ogrDgYer','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<OgrenciDialogComponent>;
  confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;
    constructor(
      public apiservice:ApiService,
      public matDialog:MatDialog,
      public alert:MyAlertService
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
  
  
}
