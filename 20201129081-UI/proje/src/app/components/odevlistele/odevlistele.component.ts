import { Kayit } from './../../models/kayit';
import { Ogrenci } from './../../models/Ogrenci';
import { Odev } from './../../models/Odev';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog,  MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';


@Component({
  selector: 'app-odevlistele',
  templateUrl: './odevlistele.component.html',
  styleUrls: ['./odevlistele.component.scss']
})
export class OdevlisteleComponent implements OnInit {
  kayitlar:Kayit[];
  odevler:Odev[];
  secOgrenci:Ogrenci;
  ogrId:string;
  odevId:string="";
  displayedColumns=['odevNo','odevAd','islemler'];
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
        this.odevlistele();
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
    this.ApiService.ogrenciodevliste(this.ogrId).subscribe((d:Kayit[])=> {
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    });
  }

  odevlistele() {
    this.ApiService.odevliste().subscribe((d:Odev[])=> {
      this.odevler=d;
    });
  }

  odevsec(odevId:string) {
    this.odevId=odevId;
  }

  kaydet() {
    if (this.odevId=="") {
      var s:Sonuc=new Sonuc();
      s.islem=false;
      s.mesaj="Ders Seçiniz";
      this.alert.AlertUygula(s);
      return false;
    }
    var kayit:Kayit=new Kayit();
    kayit.kayitOdevId=this.odevId;
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
    this.confirmdialogref.componentInstance.dialogMesaj=kayit.odevBilgi.odevAd + " Ödevi Silinecektir Onaylıyor musunuz?";
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
