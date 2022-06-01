import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { Ders } from './../../models/Ders';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from './../../models/Ogrenci';
import { Kayit } from './../../models/kayit';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
  kayitlar:Kayit[];
  dersler:Ders[];
  secOgrenci:Ogrenci;
  ogrId:string;
  dersId:string="";
  displayedColumns=['dersNo','dersAd','dersKredi','islemler'];
  dataSource:any;
  confirmdialogref:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public ApiService:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public matdialog:MatDialog

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=> {
      if (p) {
        this.ogrId=p.ogrId;
        this.ogrencigetir();
        this.kayitlistele();
        this.derslistele();
      }
    });
  }

  filtrele(e) {
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ogrencigetir() {
    this.ApiService.ogrencibyid(this.ogrId).subscribe((d:Ogrenci)=> {
      this.secOgrenci=d;
    });
  }

  kayitlistele() {
    this.ApiService.ogrencidersliste(this.ogrId).subscribe((d:Kayit[])=> {
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    });
  }

  derslistele() {
    this.ApiService.dersliste().subscribe((d:Ders[])=> {
      this.dersler=d;
    });
  }

  derssec(dersId:string) {
    this.dersId=dersId;
  }

  kaydet() {
    if (this.dersId=="") {
      var s:Sonuc=new Sonuc();
      s.islem=false;
      s.mesaj="Ders Seçiniz";
      this.alert.AlertUygula(s);
      return false;
    }
    var kayit:Kayit=new Kayit();
    kayit.kayitDersId=this.dersId;
    kayit.kayitOgrId=this.ogrId;
    this.ApiService.kayitekle(kayit).subscribe((s:Sonuc)=> {
      this.alert.AlertUygula(s);
      if(s.islem) {
        this.kayitlistele();
      }
    });
  }

  sil(kayit:Kayit) {
    this.confirmdialogref=this.matdialog.open(ConfirmDialogComponent, {
      width:'500px'
    });
    this.confirmdialogref.componentInstance.dialogMesaj=kayit.dersBilgi.dersAd + " Dersi Silinecektir Onaylıyor musunuz?";
    this.confirmdialogref.afterClosed().subscribe(d=> {
      if (d) {
        this.ApiService.kayitsil(kayit.kayitId).subscribe((s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.kayitlistele();
          }
        });
      }
    });
  }
}
