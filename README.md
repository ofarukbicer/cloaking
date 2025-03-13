# Cloaking

[![Boyut](https://img.shields.io/github/repo-size/ofarukbicer/cloaking?logo=git&logoColor=white&label=Boyut)](#)
[![Görüntülenme](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/ofarukbicer/cloaking&title=Görüntülenme)](#)

_Cloaking (gizleme) Arama motorları için basit bir gizleme tekniği_

[![ForTheBadge made-with-nodejs](https://ForTheBadge.com/images/badges/made-with-javascript.svg)](https://nodejs.org/)
[![ForTheBadge built-with-love](https://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/ofarukbicer/)

## 🚀 Hakkında

**Cloaking**, web sitenizin **arama motoru botlarına** özel içerik göstermesini sağlayan basit bir **gizleme tekniği** sunar. Bu projeyi kullanarak, belirli kullanıcı ajanlarını (örneğin Googlebot, Yandexbot, Bingbot) tespit edip, onlara farklı bir içerik sunabilirsiniz. Örneğin, botlar için özel içerik ya da sitenizdeki bazı bölümleri gizleyebilirsiniz.

Bu proje, **Node.js** kullanılarak geliştirilmiş bir proxy sunucu uygulamasıdır. Docker ile kolayca **global** olarak deploy edilebilir.

---

## ⚡️ Kurulum

### 1. Docker İle Çalıştırma

Cloaking uygulamasını çalıştırmak için Docker kullanabilirsiniz. Aşağıdaki adımları takip ederek kolayca başlatabilirsiniz:

#### Docker Hub'dan İndirme

```bash
docker pull ofarukbicer/cloaking:latest
```

Projenizi **Docker** üzerinden çalıştırmak için:

```bash
docker run -p 8080:8080 ofarukbicer/cloaking:latest
```

#### ENV Kullanarak Çalıştırma

Eğer bir `.env` dosyanız varsa, Docker kullanarak aşağıdaki gibi başlatabilirsiniz:

```bash
docker run --env-file .env -p 8080:8080 ofarukbicer/cloaking:latest
```

#### Docker Compose İle çalıştırma

`docker-compose.yml` dosyası içerisinde örnek docker-compose yapılandırması mevcuttur.

### 2. Ortam Değişkenleri

Aşağıdaki ortam değişkenlerini `.env` dosyanızda ayarlamanız gerekmektedir:

```env
DEFAULT_URL=http://default-server.com
BOT_URL=http://bot-server.com
UNKNOWN_URL=http://unknown-server.com
```

Bu URL'ler, proxy sunucusunun yönlendirme yapacağı hedefleri belirtir.

---

## 🛠 Kullanım

- **Bot Algılama**: Googlebot, Yandexbot, Bingbot gibi botlar tespit edilir ve farklı bir sunucuya yönlendirilir.
- **Referer Kontrolü**: Referer başlığı eksik olan istekler, "bilinmeyen" bir hedefe yönlendirilir.
- **Normal Kullanıcı Yönlendirmesi**: Diğer tüm kullanıcılar varsayılan sunucuya yönlendirilir.

---

## 🌐 Telif Hakkı ve Lisans

- _Copyright (C) 2025 by_ [ofarukbicer](https://github.com/ofarukbicer) ❤️️
- [GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007](https://github.com/ofarukbicer/cloaking/blob/main/LICENSE) _Koşullarına göre lisanslanmıştır.._

---

## ♻️ İletişim

Bana **Telegram** üzerinden mesaj gönderebilirsiniz:  
[@b17fo](https://t.me/b17fo)

---
