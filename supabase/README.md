# Supabase — PixCrew backend'i

Bu klasör, PixCrew'in Supabase'de neye sahip olduğunu **yazılı** tutar. Amaç: "orada ne var?" sorusunu bir daha sormamak.

## Şu an Supabase'inde ne var?

Birlikte kurduğumuz, şu an **canlı** olan yapı:

**Tablolar**
- `groups` — gruplar (ad, oluşturan, tarih)
- `group_members` — kim hangi grupta
- `photos` — fotoğraf kayıtları (hangi grup, kim yükledi, dosya yolu). Dosyanın kendisi burada değil, Storage'da.

**Güvenlik (RLS)**
- Her tabloda Row Level Security açık.
- Kullanıcı yalnızca kendi üyesi olduğu grupları, o grupların fotoğraflarını ve kendi üyeliklerini görebilir; başkasının adına kayıt oluşturamaz.

**Storage (dosya deposu)**
- `photos` adında, **private** (herkese açık olmayan) bir bucket.
- Giriş yapmış kullanıcılar bu bucket'a yükleyip okuyabilir (MVP için gevşek; Faz 3'te daraltılacak).

**Auth**
- Supabase'in hazır kullanıcı sistemi (e-posta + şifre). Kayıt/giriş buradan.

## migrations/ klasörü ne?

İçindeki `.sql` dosyaları, yukarıdakileri oluşturan komutların kaydı. Numara sırasına göre:

| Dosya | Ne yapar |
|-------|----------|
| `001_groups.sql` | `groups` + `group_members` tabloları |
| `002_groups_rls.sql` | Grup güvenlik kuralları |
| `003_photos.sql` | `photos` tablosu |
| `004_photos_rls.sql` | Fotoğraf güvenlik kuralları |
| `005_storage_policies.sql` | Storage izinleri |

**Bunları şu an tekrar çalıştırman gerekmiyor** — hepsi zaten kurulu. Bu dosyalar kaydı tutuyor ki ne olduğunu bilelim ve gerekirse (ör. sıfırdan yeni bir Supabase projesi) baştan kurabilelim. Yeni bir şey eklediğimizde buraya `006_...sql` olarak ekleyeceğiz, önce dosya, sonra sen panelde çalıştır.

## Yeni bir SQL dosyasını çalıştırma (gerektiğinde)

1. Supabase paneli → sol menü **SQL Editor**
2. Yeni sorgu → ilgili `.sql` dosyasının içeriğini yapıştır
3. **Run**

## Bağlantı anahtarları (.env)

Uygulamanın Supabase'e bağlanması için iki değer gerekiyor; bunlar koda değil, kök dizindeki `.env` dosyasına yazılır (bkz. `.env.example`):

- `EXPO_PUBLIC_SUPABASE_URL` — Supabase paneli → Project Settings → Data API → Project URL
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Project Settings → API Keys → Publishable key

`.env` dosyası `.gitignore` ile dışarıda tutulur — anahtarlar asla git'e girmez. Bu yüzden projeyi yeni bir bilgisayara kurunca `.env`'i elle oluşturman gerekir.

## Proje bölgesi

Veritabanı **Frankfurt (eu-central-1)** bölgesinde. Yüz verisi işleyeceğimiz için veriler bilinçli olarak AB'de tutuluyor (KVKK/GDPR).
