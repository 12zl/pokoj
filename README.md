# pokój ✳

Czat ze znajomymi bez konta, przygotowany do GitHub Pages. Domyślnie czarny motyw, opcjonalnie biały. Nick, kolor, sześć awatarów i własne zdjęcie, emotki, naklejki, lista uczestników oraz animowany wskaźnik pisania.

## Uruchomienie na GitHubie

1. Utwórz nowe publiczne repozytorium, np. `pokoj`.
2. Wgraj **zawartość tego folderu** do głównego katalogu repozytorium. `index.html` ma być na wierzchu, razem z `app.js`, `style.css` i folderami `vendor` i `stickers`.
3. W repozytorium otwórz **Settings → Pages**. W sekcji Build and deployment wybierz **Deploy from a branch**, następnie **main** i **/(root)**. Kliknij Save.
4. GitHub wyświetli adres opublikowanej strony. Otwórz go, wpisz nick i wybierz Stwórz pokój. Przycisk Kopiuj zaproszenie daje link dla znajomych.

Strona nie wymaga budowania ani tajnych kluczy. Linki do pokoju używają fragmentu `#`, więc działają również w podkatalogu GitHub Pages.

## Własne naklejki

1. Wgraj obrazek do folderu `stickers`, np. `kot.webp`. Obsługiwane: PNG, WEBP, GIF, JPG. Przezroczysty WEBP lub PNG zwykle wygląda najlepiej. Zalecane 256 × 256 px i plik poniżej 300 KB.
2. Edytuj `stickers/manifest.json`. Zastąp pustą listę `[]` na przykład taką:

```json
[
  { "id": "kot-szef", "name": "Kot szef", "file": "kot.webp" },
  { "id": "taniec", "name": "Taniec", "file": "taniec.gif" }
]
```

3. Zapisz zmiany na GitHubie. Po ponownej publikacji odśwież stronę. Obrazki pojawią się pod **ikona buźki → Naklejki**.

Nazwy plików: bez spacji i polskich znaków, wyłącznie litery, cyfry, myślnik lub podkreślenie. Każda naklejka musi mieć unikalne `id`; nie używaj zarezerwowanych `frog`, `party`, `love`, `alien`, `fire`, `cat`. Nie dodawaj przecinka po ostatnim elemencie listy. Maksymalnie 80 własnych naklejek. Sześć startowych naklejek emoji działa bez obrazków.

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
- `stickers/manifest.json` — lista Twoich naklejek.
- `vendor/peerjs.min.js` — lokalna kopia biblioteki PeerJS.

Do lokalnego podglądu użyj dowolnego serwera plików statycznych, np. rozszerzenia Live Server w edytorze. Nie otwieraj przez `file://`, ponieważ lista naklejek wymaga HTTP. Produkcyjnie używaj HTTPS (GitHub Pages je zapewnia).

## Dalsze pomysły

Hasło i zatwierdzanie wejścia przez gospodarza, reakcje emoji, odpowiedzi na konkretną wiadomość oraz opcjonalne powiadomienie dźwiękowe. Trwałe pokoje i historia wymagają osobnej wersji z backendem.

## Dokumentacja i zależności

[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [PeerJS](https://peerjs.com/client/getting-started), [ograniczenia WebRTC](https://peerjs.com/client/faq).
PeerJS jest udostępniony na licencji MIT — zobacz `vendor/PEERJS-LICENSE`. Kroje DM Sans i Space Grotesk pobierane są z Google Fonts, z lokalnym krojem zastępczym, gdy usługa jest niedostępna.
