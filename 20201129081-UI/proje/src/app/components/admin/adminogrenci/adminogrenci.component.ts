import { MatSort } from '@angular/material/sort';
import { Ogrenci } from './../../../models/Ogrenci';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OgrenciDialogComponent } from '../../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-adminogrenci',
  templateUrl: './adminogrenci.component.html',
  styleUrls: ['./adminogrenci.component.scss']
})
export class AdminogrenciComponent implements OnInit {
  ogrenciler:Ogrenci[];
  displayedColumns=['ogrNo','ogrAdSoyad','ogrMail','KullaniciAdi','ogrSifre','ogrYas','ogrDgYer','uyeadmin','islemler'];
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
  
    ekle() {
      var yeniKayit:Ogrenci=new Ogrenci();
      this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
        width:'500px',
        data:{
          kayit:yeniKayit,
          islem:'ekle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        this.apiservice.ogrenciekle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.ogrencilistele();
          }
        });
        }
      });
    }
  
    duzenle(kayit:Ogrenci) {
      this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
        width:'500px',
        data:{
          kayit:kayit,
          islem:'duzenle'
        }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d) {
        kayit.ogrNo=d.ogrNo;
        kayit.ogrAdSoyad=d.ogrAdSoyad;
        kayit.ogrMail=d.ogrMail;
        kayit.KullaniciAdi=d.KullaniciAdi;
        kayit.ogrSifre=d.ogrSifre;
        kayit.uyeadmin=d.uyeadmin;
        kayit.ogrYas=d.ogrYas;
        kayit.ogrDgYer=d.ogrDgYer;
  
        this.apiservice.ogrenciduzenle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
      });
    }
  
    sil(kayit:Ogrenci) {
      this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent, {
        width:'500px'
      });
      this.confirmdialogRef.componentInstance.dialogMesaj=kayit.ogrAdSoyad + " Silinecektir. Onaylıyor musunuz?"
      this.confirmdialogRef.afterClosed().subscribe(d=> {
        if (d) {
          this.apiservice.ogrencisil(kayit.ogrId).subscribe((s:Sonuc)=> {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.ogrencilistele();
            }
          });
        }
      });
    }
}
