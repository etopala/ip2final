import { Kayit } from './../models/kayit';
import { Odev } from './../models/Odev';
import { Ders } from './../models/Ders';
import { Ogrenci } from './../models/Ogrenci';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl = "https://localhost:44389/api/";
constructor(
  public http: HttpClient
) { }

ogrenciliste() {
  return this.http.get(this.apiUrl+"ogrenciliste");
}
ogrencibyid(ogrId:string) {
  return this.http.get(this.apiUrl+"ogrencibyid/"+ogrId);
}
ogrenciekle(ogr:Ogrenci) {
  return this.http.post(this.apiUrl+"ogrenciekle",ogr);
}
ogrenciduzenle(ogr:Ogrenci) {
  return this.http.put(this.apiUrl+"ogrenciduzenle",ogr);
}
ogrencisil(ogrId:string) {
  return this.http.delete(this.apiUrl+"ogrencisil/"+ogrId);
}

dersliste() {
  return this.http.get(this.apiUrl+"dersliste");
}
dersbyid(dersId:string) {
  return this.http.get(this.apiUrl+"dersbyid/"+dersId);
}
dersekle(ders:Ders) {
  return this.http.post(this.apiUrl+"dersekle",ders);
}
dersduzenle(ders:Ders) {
  return this.http.put(this.apiUrl+"dersduzenle",ders);
}
derssil(dersId:string) {
  return this.http.delete(this.apiUrl+"derssil/"+dersId);
}

odevliste() {
  return this.http.get(this.apiUrl+"odevliste");
}
odevbyid(odevId:string) {
  return this.http.get(this.apiUrl+"odevbyid/"+odevId);
}
odevekle(odev:Odev) {
  return this.http.post(this.apiUrl+"odevekle",odev);
}
odevduzenle(odev:Odev) {
  return this.http.put(this.apiUrl+"odevduzenle",odev);
}
odevsil(odevId:string) {
  return this.http.delete(this.apiUrl+"odevsil/"+odevId);
}

ogrencidersliste(ogrId:string) {
  return this.http.get(this.apiUrl+"ogrencidersliste/"+ogrId);
}
ogrenciodevliste(ogrId:string) {
  return this.http.get(this.apiUrl+"ogrenciodevliste/"+ogrId);
}
dersogrenciliste(dersId:string) {
  return this.http.get(this.apiUrl+"dersogrenciliste/"+dersId);
}
odevogrenciliste(odevId:string) {
  return this.http.get(this.apiUrl+"odevogrenciliste/"+odevId);
}
kayitekle(kayit:Kayit) {
  return this.http.post(this.apiUrl+"kayitekle",kayit);
}
kayitsil(kayitId:string) {
  return this.http.delete(this.apiUrl+"kayitsil/"+kayitId);
}

tokenal(kadi:string,parola:string) {
  var data="username="+kadi+"&password="+parola+"&grant_type=password";
  var reqHeader=new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
  return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
}
oturumkontrol() {
  if(localStorage.getItem("token")) {
    return true;
  }
  else {
    return false;
  }
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
