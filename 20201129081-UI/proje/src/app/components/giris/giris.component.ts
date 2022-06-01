import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.css']
})
export class GirisComponent implements OnInit {
  ogrenciler:Ogrenci[];
  dialogRef:MatDialogRef<OgrenciDialogComponent>;


  constructor(
    public apiservice:ApiService,
    public alert:MyAlertService,
    public matDialog:MatDialog,

  ) { }

  ngOnInit() {
  }

  oturumac(kadi:string,parola:string) {
    this.apiservice.tokenal(kadi,parola).subscribe((d:any)=>{
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("uid",d.ogrId);
      localStorage.setItem("kadi",d.KullaniciAdi);
      localStorage.setItem("uyeYetkileri",d.uyeYetkileri);
      location.href="/";
    }, err => {
      var s:Sonuc=new Sonuc();
      s.islem=false;
      s.mesaj="Kullanıcı Adı Veya Şifre Geçersizdir.";
      this.alert.AlertUygula(s);
    });
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
      });
      }
    });
  }
}
