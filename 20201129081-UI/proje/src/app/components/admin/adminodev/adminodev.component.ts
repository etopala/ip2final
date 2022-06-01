import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Odev } from 'src/app/models/Odev';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { OdevDialogComponent } from '../../dialogs/odev-dialog/odev-dialog.component';

@Component({
  selector: 'app-adminodev',
  templateUrl: './adminodev.component.html',
  styleUrls: ['./adminodev.component.scss']
})
export class AdminodevComponent implements OnInit {
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
  
    duzenle(kayit:Odev) {
      this.dialogRef=this.matDialog.open(OdevDialogComponent,{
        width:'400px',
        data:{
          kayit:kayit,
          islem:'duzenle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        kayit.odevNo=d.odevNo;
        kayit.odevAd=d.odevAd;
  
        this.apiservice.odevduzenle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
      });
    }
  
    sil(kayit:Odev) {
      this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent, {
        width:'500px'
      });
      this.confirmdialogRef.componentInstance.dialogMesaj=kayit.odevAd + " Silinecektir. Onaylıyor musunuz?"
      this.confirmdialogRef.afterClosed().subscribe(d=> {
        if (d) {
          this.apiservice.odevsil(kayit.odevId).subscribe((s:Sonuc)=> {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.odevlistele();
            }
          });
        }
      });
    }
}
