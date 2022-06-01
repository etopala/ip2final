import { DersDialogComponent } from './../dialogs/ders-dialog/ders-dialog.component';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from './../../services/api.service';
import { Ders } from 'src/app/models/Ders';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  dersler:Ders[];
  displayedColumns=['dersNo','dersAd','dersKredi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<DersDialogComponent>;
confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;
    constructor(
      public apiservice:ApiService,
      public matDialog:MatDialog,
      public alert:MyAlertService
    ) { }
  
    ngOnInit() {
      this.derslistele();
    }
  
    derslistele() {
      this.apiservice.dersliste().subscribe((ders:Ders[])=>{
        this.dersler=ders;
        this.dataSource=new MatTableDataSource(this.dersler);
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
      var yeniKayit:Ders=new Ders();
      this.dialogRef=this.matDialog.open(DersDialogComponent,{
        width:'500px',
        data:{
          kayit:yeniKayit,
          islem:'ekle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        this.apiservice.dersekle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.derslistele();
          }
        });
        }
      });
    }
}
