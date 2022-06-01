import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { DersDialogComponent } from '../../dialogs/ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-adminders',
  templateUrl: './adminders.component.html',
  styleUrls: ['./adminders.component.scss']
})
export class AdmindersComponent implements OnInit {
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
  
    duzenle(kayit:Ders) {
      this.dialogRef=this.matDialog.open(DersDialogComponent,{
        width:'500px',
        data:{
          kayit:kayit,
          islem:'duzenle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        kayit.dersNo=d.dersNo;
        kayit.dersAd=d.dersAd;
        kayit.dersKredi=d.dersKredi;
  
        this.apiservice.dersduzenle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
      });
    }
  
    sil(kayit:Ders) {
      this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent, {
        width:'500px'
      });
      this.confirmdialogRef.componentInstance.dialogMesaj=kayit.dersAd + " Silinecektir. Onaylıyor musunuz?"
      this.confirmdialogRef.afterClosed().subscribe(d=> {
        if (d) {
          this.apiservice.derssil(kayit.dersId).subscribe((s:Sonuc)=> {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.derslistele();
            }
          });
        }
      });
    }
}
