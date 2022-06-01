import { MyAlertService } from './myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public apiservice:ApiService,
        public alert:MyAlertService,
        public router:Router

    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var yetkiler=route.data["yetkiler"] as Array<string>;
        var gitUrl=route.data["gerigit"] as string;
        if(!this.apiservice.oturumkontrol() || !yetkiler || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }
        var sonuc:boolean=false;
        sonuc=this.apiservice.yetkikontrol(yetkiler);
        if(!sonuc) {
            this.router.navigate([gitUrl]);
        }
        return sonuc;
    }

}