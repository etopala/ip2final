import { Odev } from './../../models/Odev';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/kayit';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OgrsecDialogComponent } from '../dialogs/ogrsec-dialog/ogrsec-dialog.component';


@Component({
  selector: 'app-odevogrencilistele',
  templateUrl: './odevogrencilistele.component.html',
  styleUrls: ['./odevogrencilistele.component.scss']
})
export class OdevogrencilisteleComponent implements OnInit {
  kayitlar:Kayit[];
  ogrenciler:Ogrenci[];
  secOdev:Odev;
  odevId:string;
  ogrId:string="";
  displayedColumns=['ogrNo','ogrAdSoyad','ogrMail','islemler'];
  dataSource:any;
  confirmdialogref:MatDialogRef<ConfirmDialogComponent>;
  dialogref:MatDialogRef<OgrsecDialogComponent>;
  constructor(
    public ApiService:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public matdialog:MatDialog

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=> {
      if (p) {
        this.odevId=p.odevId;
        this.odevgetir();
        this.kayitlistele();
        this.ogrencilistele();
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


  odevgetir() {
    this.ApiService.odevbyid(this.odevId).subscribe((d:Odev)=> {
      this.secOdev=d;
    });
  }

  kayitlistele() {
    this.ApiService.odevogrenciliste(this.odevId).subscribe((d:Kayit[])=> {
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    });
  }

  ogrencilistele() {
    this.ApiService.ogrenciliste().subscribe((d:Ogrenci[])=> {
      this.ogrenciler=d;
    });
  }

  ogrencisec(ogrId:string) {
    this.ogrId=ogrId;
  }

  ekle() {
    this.dialogref=this.matdialog.open(OgrsecDialogComponent, {
      width: '900px'
    });
    this.dialogref.afterClosed().subscribe(d=> {
      if (d) {
        var kayit:Kayit=new Kayit();
        kayit.kayitOgrId=d.ogrId;
        kayit.kayitOdevId=this.odevId;

        this.ApiService.kayitekle(kayit).subscribe((s:Sonuc)=> {
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.kayitlistele();
          }
        });
      }
    });
  }

  sil(kayit:Kayit) {
    this.confirmdialogref=this.matdialog.open(ConfirmDialogComponent, {
      width:'500px'
    });
    this.confirmdialogref.componentInstance.dialogMesaj=kayit.ogrBilgi.ogrAdSoyad + " Öğrenci Silinecektir Onaylıyor musunuz?";
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


