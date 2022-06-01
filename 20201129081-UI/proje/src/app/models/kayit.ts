import { Ogrenci } from './Ogrenci';
import { Odev } from './Odev';
import { Ders } from './Ders';
export class Kayit {
    kayitId:string;
    kayitOgrId:string;
    kayitDersId:string;
    kayitOdevId:string;
    dersBilgi:Ders;
    odevBilgi:Odev;
    ogrBilgi:Ogrenci ;
}