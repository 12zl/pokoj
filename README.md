# pokój ✳

Czat ze znajomymi bez konta, przygotowany do GitHub Pages. Domyślnie czarny motyw, opcjonalnie biały. Nick, kolor, sześć awatarów i własne zdjęcie, emotki, naklejki, lista uczestników oraz animowany wskaźnik pisania.

Wiadomości pokazują, kto je odczytał. Możesz kopiować tekst, reagować sercem lub inną emotką, wysyłać zdjęcia i pliki, a także wkleić kod HTML, CSS, JS, JSON lub Python z numerami linii, kolorowaniem, kopiowaniem i pobieraniem. Pliki można wybrać przez spinacz albo przeciągnąć do czatu.

## Uruchomienie na GitHubie

1. Utwórz nowe publiczne repozytorium, np. `pokoj`.
2. Wgraj **zawartość tego folderu** do głównego katalogu repozytorium. `index.html` ma być na wierzchu, razem z `app.js`, `style.css` i folderami `vendor` i `stickers`.
3. W repozytorium otwórz **Settings → Pages**. W sekcji Build and deployment wybierz **GitHub Actions**. Wgraj również folder `.github`, który odpowiada za publikację i automatyczne wykrywanie naklejek.
4. GitHub wyświetli adres opublikowanej strony. Otwórz go, wpisz nick i wybierz Stwórz pokój. Przycisk Kopiuj zaproszenie daje link dla znajomych.

GitHub sam przygotowuje i publikuje stronę po każdej zmianie na `main`. Nie potrzebujesz tajnych kluczy ani dodatkowego konta. Linki do pokoju używają fragmentu `#`, więc działają również w podkatalogu GitHub Pages.

## Własne naklejki

**Po prostu wrzuć obrazki lub GIF-y — lista tworzy się sama.**

1. Otwórz [folder stickers](https://github.com/12zl/pokoj/tree/main/stickers).
2. Kliknij **Add file → Upload files**, przeciągnij obrazki i kliknij **Commit changes**. Możesz wrzucić wiele naraz.
3. Poczekaj na ukończenie publikacji (zwykle 1–2 minuty), a następnie odśwież czat. Naklejki pojawią się pod **ikona buźki → Naklejki**. Znajomi również powinni odświeżyć stronę po dodaniu nowych plików.

Obsługiwane pliki: **PNG, WEBP, GIF, JPG i JPEG**. GIF-y zachowują animację. Nazwa naklejki powstaje z nazwy pliku; spacje, polskie znaki i emoji są dozwolone. Umieszczaj pliki bezpośrednio w `stickers`, nie w podfolderach. Zalecane około 256 × 256 px i niewielkie pliki. Maksymalnie 80 własnych naklejek; przekroczenie limitu zatrzyma publikację, pozostawiając ostatnią działającą wersję strony.

Nie edytuj `manifest.json`: podczas publikacji jest automatycznie generowany na podstawie obrazków. Usunięcie pliku usuwa naklejkę przy następnej publikacji. Sześć startowych naklejek emoji jest dostępnych niezależnie od wgranych plików.

W trakcie rozmowy możesz też kliknąć **buźka → Naklejki → Dodaj własne zdjęcie / GIF**. Te naklejki zapisują się w Twojej przeglądarce i możesz wysyłać je ponownie bez GitHuba. Znajomi widzą wysłaną naklejkę, ale nie dodaje się ona do ich osobistej kolekcji.

## Pliki, odczyty i kod

- Jednorazowy plik ma limit 3 MB. Jest przesyłany przez przeglądarkę gospodarza i nie trafia na GitHub ani do trwałego magazynu. Przy bardzo dużych plikach lub słabym połączeniu przesłanie może się nie udać.
- Osoba, która dołącza później, dostaje historię wiadomości. Załączniki mogą być przez chwilę niedostępne, dopóki gospodarz nie prześle ich ponownie. Po zamknięciu pokoju pliki i historia znikają z aplikacji.
- Odczyt liczy się, gdy wiadomość jest widoczna w aktywnej karcie. Przyciskiem 👁 można zobaczyć nicki. To informacja o wyświetleniu, nie gwarancja, że ktoś przeczytał treść.
- Kod do 20 000 znaków ma zachowane wcięcia, numerację, kolorowanie, kopiowanie i pobieranie z odpowiednim rozszerzeniem.

## Jak działa pokój

- Połączenia WebRTC przez PeerJS 1.5.5. Publiczny PeerServer Cloud pomaga przeglądarkom się odnaleźć. Wiadomości są przekazywane przez przeglądarkę gospodarza pozostałym uczestnikom.
- **Gospodarz musi mieć otwartą kartę.** Jej zamknięcie, uśpienie urządzenia lub utrata internetu może zakończyć pokój. Brak automatycznej zmiany gospodarza.
- Do 12 osób. Nowa osoba otrzymuje ostatnie 100 wiadomości z pamięci gospodarza. Widok pokazuje maksymalnie 200 wiadomości. Po zamknięciu pokoju historia nie jest przechowywana przez aplikację.
- Każdy, kto ma kod lub link, może wejść. To nie jest system uwierzytelniania — nicki nie potwierdzają tożsamości. Kod ma 12 losowych znaków. Nie publikuj linku do prywatnej rozmowy.
- WebRTC szyfruje transport; gospodarz odczytuje i przekazuje wiadomości. Nie jest to szyfrowanie end-to-end między wszystkimi uczestnikami z pominięciem gospodarza.
- Profil i motyw zapisują się lokalnie w przeglądarce. Zdjęcie jest kadrowane do kwadratu i zmniejszane do 128 × 128 px przed przesłaniem znajomym. Wiadomości nie są zapisywane w localStorage.
- Niektóre sieci szkolne, firmowe lub restrykcyjne sieci mobilne mogą blokować połączenia bezpośrednie. Do niezawodnej pracy w takich sieciach potrzebny jest własny TURN lub wersja z serwerem czatu. Publiczny PeerServer to usługa zewnętrzna, której dostępności ten projekt nie gwarantuje.
- Kod frontendu jest statyczny. GitHub Pages nie uruchamia serwera czatu. Ta wersja nie wymaga płatnego backendu; nie oferuje trwałych pokoi ani historii po wyjściu gospodarza.

## Pliki

- `index.html` — interfejs.
- `style.css` — wygląd, motywy, animacje i układ mobilny.
- `app.js` — profil, pokój, połączenia i wiadomości.
- `extras.js` — odczyty, reakcje, załączniki, własne naklejki i bloki kodu.
- `stickers/` — tutaj wrzucasz własne obrazki i GIF-y.
- `.github/scripts/build-site.cjs` — automatycznie tworzy katalog naklejek i stronę w `_site`.
- `.github/workflows/pages.yml` — publikuje stronę po zapisaniu zmian.
- `vendor/peerjs.min.js` — lokalna kopia biblioteki PeerJS.

Do lokalnego podglądu z własnymi naklejkami uruchom `node .github/scripts/build-site.cjs`, a następnie serwuj folder `_site` dowolnym serwerem plików statycznych. Nie otwieraj przez `file://`, ponieważ lista naklejek wymaga HTTP. Produkcyjnie używaj HTTPS (GitHub Pages je zapewnia).

## Dalsze pomysły

Hasło i zatwierdzanie wejścia przez gospodarza, reakcje emoji, odpowiedzi na konkretną wiadomość oraz opcjonalne powiadomienie dźwiękowe. Trwałe pokoje i historia wymagają osobnej wersji z backendem.

## Dokumentacja i zależności

[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [PeerJS](https://peerjs.com/client/getting-started), [ograniczenia WebRTC](https://peerjs.com/client/faq).
PeerJS jest udostępniony na licencji MIT — zobacz `vendor/PEERJS-LICENSE`. Kroje DM Sans i Space Grotesk pobierane są z Google Fonts, z lokalnym krojem zastępczym, gdy usługa jest niedostępna.
