import { Odev } from './../../../models/Odev';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder} from '@angular/forms';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.scss']
})
export class OdevDialogComponent implements OnInit {
  dialogBaslik:string;
  islem:string;
  frm:FormGroup;
  yeniKayit:Odev;
  
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
        this.dialogBaslik="Ödev Ekle";
      }
      if (this.islem=='duzenle') {
        this.dialogBaslik="Ödev Düzenle";
      }
      this.frm=this.formolustur();
      }
  
    ngOnInit() {
    }
  
    formolustur() {
      return this.frmBuild.group({
        odevNo:[this.yeniKayit.odevNo],
        odevAd:[this.yeniKayit.odevAd],
      });
    }
  }
  
