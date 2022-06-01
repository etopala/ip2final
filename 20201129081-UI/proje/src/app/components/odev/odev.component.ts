import { Odev } from './../../models/Odev';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from './../../services/api.service';
import { OdevDialogComponent } from '../dialogs/odev-dialog/odev-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';


@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.css']
})
export class OdevComponent implements OnInit {
  odevler:Odev[];
  displayedColumns=['odevNo','odevAd','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<OdevDialogComponent>;
  confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;
    constructor(
      public apiservice:ApiService,
      public matDialog:MatDialog,
      public alert:MyAlertService
    ) { }
  
    ngOnInit() {
      this.odevlistele();
    }
  
    odevlistele() {
      this.apiservice.odevliste().subscribe((odev:Odev[])=>{
        this.odevler=odev;
        this.dataSource=new MatTableDataSource(this.odevler);
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
    
    ekle() {
      var yeniKayit:Odev=new Odev();
      this.dialogRef=this.matDialog.open(OdevDialogComponent,{
        width:'400px',
        data:{
          kayit:yeniKayit,
          islem:'ekle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        this.apiservice.odevekle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.odevlistele();
          }
        });
        }
      });
    }
}
