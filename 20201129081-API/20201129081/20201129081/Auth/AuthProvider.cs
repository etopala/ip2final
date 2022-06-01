using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace _20201129081.Auth
{

    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.CompletedTask;
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için

            //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...
            var uyeServis = new UyeService();
            var ogrenci = uyeServis.UyeOturumAc(context.UserName, context.Password);
            List<string> uyeYetkileri = new List<string>();

            if (ogrenci != null)
            {
                string yetki = "";
                if (ogrenci.uyeadmin == 1)
                {
                    yetki = "Admin";

                }
                else
                {
                    yetki = "Uye";
                }
                uyeYetkileri.Add(yetki);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, yetki));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, ogrenci.ogrId.ToString()));

                AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "ogrId", ogrenci.ogrId.ToString() },
                    { "KullaniciAdi", ogrenci.KullaniciAdi },
                    { "uyeYetkileri",Newtonsoft.Json.JsonConvert.SerializeObject(uyeYetkileri) }

               });
                AuthenticationTicket ticket = new AuthenticationTicket(identity, propert);


                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
            }

            return Task.CompletedTask;
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}