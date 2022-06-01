using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using _20201129081.Models;
using _20201129081.ViewModel;


namespace _20201129081.Controllers
{
    [Authorize]

    public class ServiceController : ApiController
    {
        dbEntities db = new dbEntities();
        SonucModel sonuc = new SonucModel();
        #region Ders
        [HttpGet]
        [Route("api/dersliste")]
        public List<DersModel> DersListe()
        {
            List<DersModel> liste = db.Ders.Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersNo = x.dersNo,
                dersAd = x.dersAd,
                dersKredi = x.dersKredi,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/dersbyid/{dersId}")]
        public DersModel DersById(string dersId)
        {
            DersModel kayit = db.Ders.Where(s => s.dersId == dersId).Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersNo = x.dersNo,
                dersAd = x.dersAd,
                dersKredi = x.dersKredi,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.Ders.Count(s => s.dersNo == model.dersNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu Kayıtlıdır!";
                return sonuc;
            }
            Ders yeni = new Ders();
            yeni.dersId = Guid.NewGuid().ToString();
            yeni.dersNo = model.dersNo;
            yeni.dersAd = model.dersAd;
            yeni.dersKredi = model.dersKredi;
            db.Ders.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/dersduzenle")]
        [Authorize]
        public SonucModel DersDuzenle(DersModel model)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == model.dersId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.dersNo = model.dersNo;
            kayit.dersAd = model.dersAd;
            kayit.dersKredi = model.dersKredi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/derssil/{dersId}")]
        [Authorize]
        public SonucModel DersSil(string dersId)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == dersId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitDersId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Derse Kayıtlı Öğrenci Olduğu İçin Ders Silinemez!";
                return sonuc;
            }
            db.Ders.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }
        #endregion
        #region Ogrenci
        [HttpGet]
        [Route("api/ogrenciliste")]
        public List<OgrenciModel> OgrenciListe()
        {
            List<OgrenciModel> liste = db.Ogrenci.Select(x => new OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrMail = x.ogrMail,
                ogrYas = x.ogrYas,
                ogrDgYer = x.ogrDgYer,
                ogrSifre = x.ogrSifre,
                uyeadmin = x.uyeadmin,
                KullaniciAdi = x.KullaniciAdi,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/ogrencibyid/{ogrId}")]
        public OgrenciModel OgrenciById(string ogrId)
        {
            OgrenciModel kayit = db.Ogrenci.Where(s => s.ogrId == ogrId).Select(x => new
           OgrenciModel()
            {
                ogrId = x.ogrId,
                ogrNo = x.ogrNo,
                ogrAdSoyad = x.ogrAdSoyad,
                ogrMail = x.ogrMail,
                ogrYas = x.ogrYas,
                ogrDgYer = x.ogrDgYer,
                ogrSifre = x.ogrSifre,
                uyeadmin = x.uyeadmin,
                KullaniciAdi = x.KullaniciAdi,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/ogrenciekle")]
        public SonucModel OgrenciEkle(OgrenciModel model)
        {
            if (db.Ogrenci.Count(s => s.ogrNo == model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Öğrenci Numarası Kayıtlıdır!";
                return sonuc;
            }
            Ogrenci yeni = new Ogrenci();
            yeni.ogrId = Guid.NewGuid().ToString();
            yeni.ogrNo = model.ogrNo;
            yeni.ogrAdSoyad = model.ogrAdSoyad;
            yeni.ogrMail = model.ogrMail;
            yeni.ogrYas = model.ogrYas;
            yeni.ogrDgYer = model.ogrDgYer;
            yeni.ogrSifre = model.ogrSifre;
            yeni.uyeadmin = model.uyeadmin;
            yeni.KullaniciAdi = model.KullaniciAdi;
            db.Ogrenci.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/ogrenciduzenle")]
        [Authorize]
        public SonucModel OgrenciDuzenle(OgrenciModel model)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrId == model.ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.ogrNo = model.ogrNo;
            kayit.ogrAdSoyad = model.ogrAdSoyad;
            kayit.ogrMail = model.ogrMail;
            kayit.ogrYas = model.ogrYas;
            kayit.ogrDgYer = model.ogrDgYer;
            kayit.ogrSifre = model.ogrSifre;
            kayit.uyeadmin = model.uyeadmin;
            kayit.KullaniciAdi = model.KullaniciAdi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/ogrencisil/{ogrId}")]
        [Authorize]
        public SonucModel OgrenciSil(string ogrId)
        {
            Ogrenci kayit = db.Ogrenci.Where(s => s.ogrId == ogrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitOgrId == ogrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Üzerinde Kayıt Olduğu İçin Öğrenci Silinemez!";
                return sonuc;
            }
            db.Ogrenci.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi";
            return sonuc;
        }
        #endregion
        #region Odev
        [HttpGet]
        [Route("api/odevliste")]
        public List<OdevModel> OdevListe()
        {
            List<OdevModel> liste = db.Odev.Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevNo = x.odevNo,
                odevAd = x.odevAd,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/odevbyid/{odevId}")]
        public OdevModel OdevById(string odevId)
        {
            OdevModel kayit = db.Odev.Where(s => s.odevId == odevId).Select(x => new OdevModel()
            {
                odevId = x.odevId,
                odevNo = x.odevNo,
                odevAd = x.odevAd,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/odevekle")]
        public SonucModel OdevEkle(OdevModel model)
        {
            if (db.Odev.Count(s => s.odevNo == model.odevNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ödev Kodu Kayıtlıdır!";
                return sonuc;
            }
            Odev yeni = new Odev();
            yeni.odevId = Guid.NewGuid().ToString();
            yeni.odevNo = model.odevNo;
            yeni.odevAd = model.odevAd;
            db.Odev.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/odevduzenle")]
        [Authorize]
        public SonucModel OdevDuzenle(OdevModel model)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == model.odevId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.odevNo = model.odevNo;
            kayit.odevAd = model.odevAd;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/odevsil/{odevId}")]
        [Authorize]
        public SonucModel OdevSil(string odevId)
        {
            Odev kayit = db.Odev.Where(s => s.odevId == odevId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitOdevId == odevId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödeve Kayıtlı Öğrenci Olduğu İçin Ödev Silinemez!";
                return sonuc;
            }
            db.Odev.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Silindi";
            return sonuc;
        }
        #endregion
        #region Kayit
        [HttpGet]
        [Route("api/ogrencidersliste/{ogrId}")]
        public List<KayitModel> OgrenciDersListe(string ogrId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOgrId == ogrId).Select(x => new KayitModel()
           {
               kayitId = x.kayitId,
               kayitDersId = x.kayitDersId,
               kayitOgrId = x.kayitOgrId,
           }).ToList();
            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.dersBilgi = DersById(kayit.kayitDersId);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/ogrenciodevliste/{ogrId}")]
        public List<KayitModel> OgrenciOdevListe(string ogrId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOgrId == ogrId).Select(x
           => new KayitModel()
           {
               kayitId = x.kayitId,
               kayitOgrId = x.kayitOgrId,
               kayitOdevId = x.kayitOdevId,
           }).ToList();
            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.odevBilgi = OdevById(kayit.kayitOdevId);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/dersogrenciliste/{dersId}")]
        public List<KayitModel> DersOgrenciListe(string dersId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitDersId == dersId).Select
           (x => new KayitModel()
           {
               kayitId = x.kayitId,
               kayitDersId = x.kayitDersId,
               kayitOgrId = x.kayitOgrId,
           }).ToList();
            foreach (var kayit in liste)
            {
                kayit.dersBilgi = DersById(kayit.kayitDersId);
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/odevogrenciliste/{odevId}")]
        public List<KayitModel> OdevOgrenciListe(string odevId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOdevId == odevId).Select
           (x => new KayitModel()
           {
               kayitId = x.kayitId,
               kayitOdevId = x.kayitOdevId,
               kayitOgrId = x.kayitOgrId,
           }).ToList();
            foreach (var kayit in liste)
            {
                kayit.odevBilgi = OdevById(kayit.kayitOdevId);
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
            }
            return liste;
        }
        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitDersId == model.kayitDersId && s.kayitOgrId == model.kayitOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgrId = model.kayitOgrId;
            yeni.kayitDersId = model.kayitDersId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Eklendi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/kayitekleodev")]
        public SonucModel KayitEkleOdev(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitOdevId == model.kayitOdevId && s.kayitOgrId == model.kayitOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgrId = model.kayitOgrId;
            yeni.kayitOdevId = model.kayitOdevId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Eklendi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/kayitekleders")]
        public SonucModel KayitEkleDers(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitDersId == model.kayitDersId && s.kayitOdevId == model.kayitOdevId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOdevId = model.kayitOdevId;
            yeni.kayitDersId = model.kayitDersId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Eklendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]

        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Silindi";
            return sonuc;
        }
        #endregion

    }
}
