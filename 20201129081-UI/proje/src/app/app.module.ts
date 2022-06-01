import { AdminodevComponent } from './components/admin/adminodev/adminodev.component';
import { AdmindersComponent } from './components/admin/adminders/adminders.component';
import { AdminogrenciComponent } from './components/admin/adminogrenci/adminogrenci.component';
import { AuthGuard } from './services/AuthGuard';
import { ApiService } from 'src/app/services/api.service';
import { GirisComponent } from './components/giris/giris.component';
import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { OdevDialogComponent } from './components/dialogs/odev-dialog/odev-dialog.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { OdevogrencilisteleComponent } from './components/odevogrencilistele/odevogrencilistele.component';
import { OgrencilisteleComponent } from './components/ogrencilistele/ogrencilistele.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { OdevComponent } from './components/odev/odev.component';
import { DersComponent } from './components/ders/ders.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Authınterceptor } from './services/Authınterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    DersComponent,
    OdevComponent,
    DerslisteleComponent,
    OdevlisteleComponent,
    OgrencilisteleComponent,
    OdevogrencilisteleComponent,
    GirisComponent,

    //Admin
    AdminogrenciComponent,
    AdmindersComponent,
    AdminodevComponent,

    //Dialogs
    AlertDialogComponent,
    OgrenciDialogComponent,
    ConfirmDialogComponent,
    DersDialogComponent,
    OdevDialogComponent,
    OgrsecDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    OgrenciDialogComponent,
    ConfirmDialogComponent,
    DersDialogComponent,
    OdevDialogComponent,
    OgrsecDialogComponent
  ],
  providers: [
    MyAlertService,
    ApiService,
    AuthGuard,
    {provide:HTTP_INTERCEPTORS, useClass: Authınterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
