import { AdminodevComponent } from './components/admin/adminodev/adminodev.component';
import { AdmindersComponent } from './components/admin/adminders/adminders.component';
import { AdminogrenciComponent } from './components/admin/adminogrenci/adminogrenci.component';
import { GirisComponent } from './components/giris/giris.component';
import { OdevogrencilisteleComponent } from './components/odevogrencilistele/odevogrencilistele.component';
import { OgrencilisteleComponent } from './components/ogrencilistele/ogrencilistele.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OdevComponent } from './components/odev/odev.component';
import { DersComponent } from './components/ders/ders.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'giris', component:GirisComponent
  },
  {
    path:'ders', component:DersComponent
  },
  {
    path:'odev', component:OdevComponent
  },
  {
    path:'derslistele/:ogrId', component:DerslisteleComponent
  },
  {
    path:'odevlistele/:ogrId', component:OdevlisteleComponent
  },
  {
    path:'ders/ogrencilistele/:dersId', component:OgrencilisteleComponent
  },
  {
    path:'odev/odevogrencilistele/:odevId', component:OdevogrencilisteleComponent
  },
  {
    path:'admin/adminogrenci', component:AdminogrenciComponent,
    canActivate: [AuthGuard],
    data: {
    yetkiler: ['Admin'],
    gerigit: '/giris'
    }
  },
  {
    path:'admin/adminders', component:AdmindersComponent,
    canActivate: [AuthGuard],
    data: {
    yetkiler: ['Admin'],
    gerigit: '/giris'
    }
  },
  {
    path:'admin/adminodev', component:AdminodevComponent,
    canActivate: [AuthGuard],
    data: {
    yetkiler: ['Admin'],
    gerigit: '/giris'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
