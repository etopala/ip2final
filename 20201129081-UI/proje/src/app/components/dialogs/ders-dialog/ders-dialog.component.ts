import { Ders } from './../../../models/Ders';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder} from '@angular/forms';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';


@Component({
  selector: 'app-ders-dialog',
  templateUrl: './ders-dialog.component.html',
  styleUrls: ['./ders-dialog.component.scss']
})
export class DersDialogComponent implements OnInit {
  dialogBaslik:string;
  islem:string;
  frm:FormGroup;
  yeniKayit:Ders;
  
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
        this.dialogBaslik="Ders Ekle";
      }
      if (this.islem=='duzenle') {
        this.dialogBaslik="Ders Düzenle";
      }
      this.frm=this.formolustur();
      }
  
    ngOnInit() {
    }
  
    formolustur() {
      return this.frmBuild.group({
        dersNo:[this.yeniKayit.dersNo],
        dersAd:[this.yeniKayit.dersAd],
        dersKredi:[this.yeniKayit.dersKredi],
      });
    }
  }
  
