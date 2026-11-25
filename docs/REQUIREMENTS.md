# PixCrew — Ürün Gereksinimleri

> Projenin tek doğru kaynağı. Ne inşa ettiğimizi burada tanımlarız; kod ve kararlar buna göre ilerler.
> Son güncelleme: 2026-11-25

## Tek cümleyle

Bir grup insanın çektiği fotoğrafları tek bir ortak havuza toplayıp, yüz tanımayla her kişiye yalnızca kendisinin olduğu fotoğrafları otomatik dağıtan uygulama.

## Çözdüğü problem

Tatilde/etkinlikte herkes kendi telefonuyla fotoğraf çekiyor. Bunları birbirine dağıtmak (ör. AirDrop) zor:

- Aynı fotoğraf birden çok kez gidiyor (**çakışma**).
- Kimin hangi fotoğrafta olduğunu tek tek düşünüp **elle ayıklamak** uzun sürüyor — grup büyüdükçe (7+ kişi) daha da kötü.
- Çoğu zaman fotoğrafta **olmayan** kişiye bile fotoğraf gönderiliyor (gereksiz gönderim).

PixCrew bu elle dağıtımı tamamen ortadan kaldırır.

## Temel kavram: "ortak alan"

Uygulamanın temel birimi bir **ortak alan** (bir grup ya da etkinlik). Çekirdek mekanizma her zaman aynıdır:

```
ortak alan → fotoğraf havuzu → yüzler ayrışır → herkes kendi albümünü görür → beğenir
```

Kimin yüklediği bu mekanizmayı değiştirmez. Aynı altyapı iki şekilde kullanılır:

1. **Kapalı grup (tatil senaryosu):** Arkadaş ekibi; herkes katılır, herkes kendi çektiği fotoğrafları yükler.
2. **Tek-yükleyen / etkinlik senaryosu:** Bir kişi (fotoğrafta olsun ya da olmasın) tüm fotoğrafları yükler; diğerleri alana girip kendini bulur, kendi fotoğraflarını görür ve beğenir.

Her iki durumda da yüzler ayrıştıktan sonra her kişi **yalnızca içinde olduğu** fotoğrafları görür; kimse elle ayıklama yapmaz.

## Temel akış

1. Kullanıcı uygulamayı kurar, arkadaşları da kurar.
2. Her kullanıcı bir kez **referans selfie** verir ("bu benim").
3. Fotoğraflar ortak havuza yüklenir (herkes ya da tek kişi).
4. Uygulama her fotoğraftaki yüzleri referanslarla eşleştirir.
5. Her kişi kendi albümünde yalnızca içinde olduğu fotoğrafları görür.
6. Kişi, içinde olduğu fotoğraflardan beğendiklerini işaretler.

## Özellikler

### 1. Kimlik — referans selfie
Her kullanıcı bir kez kendi yüzünü kaydeder; eşleştirmenin dayanağı budur.
*(MVP kararı: "herkes kendini tanımlar" yöntemi. Selfie'siz, yüzleri otomatik gruplayıp "kendi yüzüne dokun" yöntemi Faz 2'ye bırakıldı.)*

### 2. Ortak havuza fotoğraf yükleme
Fotoğraflar ortak havuza yüklenir. **Her fotoğrafta onu yükleyen kişi kayıtlı tutulur** — aşağıdaki "kendi yüklediklerim" filtresinin çalışması için şart. (Altyapıda `photos.uploader_id` olarak zaten var.)

### 3. Yüze göre otomatik dağıtım — *işin kalbi*
Uygulama fotoğraftaki kişileri tespit edip her fotoğrafı yalnızca içindeki kişilere yönlendirir. Toplu grup fotoğrafı da, iki kişilik fotoğraf da doğru kişilere gider; fotoğrafta olmayan kimseye fotoğraf gitmez.

### 4. "Kendi yüklediklerim" filtresi
İki kullanım senaryosunu tek ayarla destekler:
- **Varsayılan (tatil modu):** İçinde olduğun fotoğraflar, *kendi yüklediklerin hariç* — çünkü onlar zaten galerinde.
- **Aç/kapa — "kendi yüklediklerimi de dahil et":** İçinde olduğun *tüm* fotoğraflar, kendi attıkların dahil.

### 5. Manzara / ortak fotoğraf seçeneği (opsiyonel)
Kullanıcı isterse, içinde kimse olmayan ortak manzara fotoğraflarını da alabilir.

### 6. Beğeni / oylama katmanı
- Fotoğrafta olan ya da olmayan **herkes** toplu fotoğraf yükleyebilir; havuzdaki kişiler bulunur.
- Kişiler uygulamaya girip kendilerini seçip adlandırır ("bu benim").
- Kişiler, içinde oldukları fotoğraflardan beğendiklerini işaretler.
- Bir fotoğrafın köşesinde (sağ üst) onu beğenenlerin işaretleri görünür.
- Beğeniye göre **filtreleme** yapılabilir; ortak beğenilen fotoğraflar kolayca seçilir.
- Kimin neyi beğendiğini, alana giren kişiler ve fotoğrafı yükleyen görebilir.

### 7. En iyi kare seçimi (opsiyonel — varsayılan KAPALI)
Üst üste, aynı poz/açıda çekilen karelerden en iyisini öne çıkarma.
- "Objektif güzellik" iddiası **yok**.
- Ölçülebilir kriterler: **gözler açık mı**, **hareket/bulanıklık var mı**.
- Varsayılan olarak uygulanmaz; kullanıcı isterse açar.

## Aşamalandırma

### Faz 1 — MVP (asıl değer)
Kimlik (selfie) + gruplar + ortak havuza yükleme + referans selfie ile yüz eşleştirme + kişisel albüm (Özellik 1–4).

### Faz 2 — zenginleştirme
Beğeni/oylama (6), manzara seçeneği (5), selfie'siz anonim yüz kümeleme, "bu ben değilim / bunu da ekle" manuel düzeltme ekranı.

### Faz 3 — yayın öncesi
En iyi kare seçimi (7), yüz işlemeyi cihaz-üstüne taşıma (gizlilik), mağaza süreçleri (App Store / Google Play).

## Gizlilik duruşu

- Yüz verisi hassas veridir.
- Veriler AB'de tutulur (Frankfurt / Supabase), KVKK/GDPR uyumlu.
- Hedef: yüz işlemeyi mümkünse **cihaz-üstünde** yapıp ham fotoğrafları buluta hiç göndermemek (Faz 3).
- Yüz verisi için açık rıza akışı.

## Teknik kararlar (özet)

- **Yığın:** React Native + Expo (SDK 54), Supabase (Postgres + Auth + Storage), yüz tanıma.
- **Yüz eşleştirme (MVP):** referans selfie ile 1'e-N eşleştirme. Anonim kümeleme Faz 2.
- **İsim:** PixCrew (çakışma nedeniyle SnapCircle'dan değiştirildi).
- **Mimari:** ekranlar `app/`, veri/iş mantığı `services/`, Supabase bağlantısı `lib/`.

## Mevcut durum (2026-11-25)

Bitti: kimlik (kayıt/giriş/çıkış), `groups` + `group_members` tabloları + RLS, `photos` tablosu + Storage bucket + RLS, karşılama/giriş/ana ekran, `services/` veri katmanı.

Sırada: fotoğraf yükleme ekranı (galeriden seç → Storage → `photos`), ardından referans selfie ve yüz eşleştirme.

## Para modeli (not — amaç değil, olasılık)

Ürün bitince en gerçekçi gelir yönü: **marka/influencer etkinlikleri için etkinlik başına B2B hizmet** (fotoğrafları markalı olarak katılımcılara dağıtmak). Öncelik değil; önce MVP çalışmalı. Ayrıntı: ayrı gelir modeli araştırması.
