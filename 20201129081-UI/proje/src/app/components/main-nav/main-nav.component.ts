import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
kadi:string;
displayedColumns=['ogrNo','ogrAdSoyad','ogrMail','KullaniciAdi','ogrSifre','ogrYas','ogrDgYer','uyeadmin','islemler'];
dataSource:any;
@ViewChild(MatSort) sort:MatSort;
@ViewChild(MatPaginator) paginator:MatPaginator;
confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiservice:ApiService,
    public alert:MyAlertService
    ) {}
  ngOnInit(): void {
    if(this.apiservice.oturumkontrol) {
      this.kadi=localStorage.getItem("kadi");
    }
  }

  oturumkapat() {
    localStorage.clear();
    location.href="/;"
  }



  yetkikontrol(yetkiler) {
    var sonuc:boolean=false;
    var uyeYetkiler:string[]=JSON.parse(localStorage.getItem("uyeYetkileri"));
    if(uyeYetkiler) {
      yetkiler.forEach(element => {
        if(uyeYetkiler.indexOf(element)>-1) {
          sonuc=true;
          return false;
        }
      });
    }
    return sonuc;
  }
}
