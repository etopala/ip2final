import { Ogrenci } from './../../../models/Ogrenci';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-ogrenci-dialog',
  templateUrl: './ogrenci-dialog.component.html',
  styleUrls: ['./ogrenci-dialog.component.css']
})
export class OgrenciDialogComponent implements OnInit {
dialogBaslik:string;
islem:string;
frm:FormGroup;
yeniKayit:Ogrenci;

  constructor(
    public ApiService:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<OgrenciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle') {
      this.dialogBaslik="Öğrenci Ekle";
    }
    if (this.islem=='duzenle') {
      this.dialogBaslik="Öğrenci Düzenle";
    }
    this.frm=this.formolustur();
    }

  ngOnInit() {
  }

  formolustur() {
    return this.frmBuild.group({
      ogrNo:[this.yeniKayit.ogrNo],
      ogrAdSoyad:[this.yeniKayit.ogrAdSoyad],
      ogrMail:[this.yeniKayit.ogrMail],
      ogrYas:[this.yeniKayit.ogrYas],
      ogrDgYer:[this.yeniKayit.ogrDgYer],
      KullaniciAdi:[this.yeniKayit.KullaniciAdi],
      uyeadmin:[this.yeniKayit.uyeadmin],
      ogrSifre:[this.yeniKayit.ogrSifre]
    });
  }
}
