using _20201129081.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using _20201129081.ViewModel;

namespace _20201129081.Auth
{
    public class UyeService
    {
        dbEntities db = new dbEntities();
        public OgrenciModel UyeOturumAc(string kadi, string parola)
        {
            OgrenciModel ogrenci = db.Ogrenci.Where(s => s.KullaniciAdi == kadi && s.ogrSifre == parola).Select(x => new OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrMail = x.ogrMail,
                KullaniciAdi = x.KullaniciAdi,
                ogrDgYer = x.ogrDgYer,
                ogrNo = x.ogrNo,
                ogrSifre = x.ogrSifre,
                ogrYas = x.ogrYas,
                uyeadmin = x.uyeadmin,
            }).SingleOrDefault();
            return ogrenci;

        }
    }
}