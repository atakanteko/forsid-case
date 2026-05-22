# 🚀 Project Setup & Run Instructions

## 1. Requirements

Before running the project, make sure you have installed:

- Node.js (>= 18)
- npm

---

## 2. Install Dependencies

Install project dependencies:

```bash
npm install
```

## 3. Run Mock API Server

This project uses a mock REST API powered by json-server.

```bash
npm run server
```

Available endpoints:

- GET /products
- PATCH /products/:id/stock

## 4. Run Frontend (Vue 3 + Vite)

Start the development server:

```bash
npm run dev
```

## 5. Environment

Create a .env file and copy the contents of the .env.example file into it.

## 6. Notes

Make sure the mock API server is running before starting the frontend.
If the API is not available, the UI will display an error state handled by TanStack Query.

# Component’leri Neden Feature-Based Yapıda Ayırıyorum?

Projede component’leri bu şekilde ayırmamın temel sebebi **ölçeklenebilirlik, bakım kolaylığı ve domain odaklı mimari kurmak**.

---

## Feature-Based Yapı Nedir?

Feature-based yapı, dosyaları teknik türüne göre değil, **iş alanına (domain/feature)** göre ayırma yaklaşımıdır.

Örnek:

```txt
features/
  product/
  user/
  order/
```

---

# Gereksiz API request’lerini nasıl engellediniz?

Gereksiz API request’lerini TanStack Query ile queryKey tabanlı cache kullanarak engelledim.

Aynı queryKey ile yapılan isteklerde data cache’den döner, tekrar API çağrısı atılmaz. Ayrıca staleTime ile veriyi belirli bir süre “fresh” tutarak gereksiz refetch’leri engelledim ve gcTime (cache garbage collection süresi) ile kullanılmayan query’lerin memory’de ne kadar kalacağını kontrol ettim.

# State yönetimini nasıl kurguladınız?

State yönetimini ikiye ayırarak kurguladım: server state ve UI state.

Server state tarafında TanStack Query kullanıyorum. API’den gelen veriler tamamen burada yönetiliyor. Cache, refetch, staleTime ve gcTime ile veri otomatik olarak senkron ve optimize şekilde tutuluyor.

UI state tarafında ise Pinia kullanıyorum.

Yaklaşımım:

TanStack Query: products listesi, API cache
Pinia: search input, filtre state

Bu ayrım sayesinde server state ile UI state birbirine karışmıyor, cache yönetimi sade kalıyor ve gereksiz re-fetch veya duplicate state problemleri ortadan kalkıyor.

# Bu yapı production’da kullanılacak olsaydı neleri iyileştirirdiniz?

Table daha generic bir hale getirilip proje genelinde datatable olarak kullanılabilir.
TanStack Query tarafında her feature için standart bir cache politikası belirlerdim:

- hangi query’ler stale
- hangileri always fresh
- hangi data ne kadar gcTime’da tutulacak

Pinia tarafında:

- global state minimum tutulur
- sadece UI state kalır
- shared state gerekiyorsa module bazlı ayrılır

Genel olarak ise

- global error boundary
- retry policy
- offline / network fail senaryoları çalışılabilir.
