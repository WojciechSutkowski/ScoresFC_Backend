# Serwer aplikacji ScoresFC

Aplikacja została stworzona w ramach pracy inżynierskiej.

## Temat pracy

**Projekt i implementacja aplikacji internetowej do wspomagania wyświetlania wyników sportowych na żywo**

---

### Cel pracy

Celem pracy było zaprojektowanie i zaimplementowanie aplikacji internetowej pozwalającej użytkownikowi na śledzenie wyników meczów piłkarskich na żywo, statystyk oraz innych danych ze świata piłki nożnej. Grupa docelowa została zawężona z uwagi na to że najpopularniejsze aplikacje tego typu oferują zazwyczaj dane z wielu różnych sportów, co wprowadza większe skomplikowanie obsługi dla użytkowników. Aplikacja ScoresFC obsługuje wyłącznie dane piłkarskie z uwagi na największą popularność tego sportu, będąc aplikacją jasną i przejrzystą w obsłudze, łącząc przy tym najlepsze cechy znanych graczy na rynku. Aplikacja jest również przyjazna osobom walczącym z nałogiem hazardu, gdyż w odróżnieniu od konkurencji nie wyświetla reklam oraz kursów bukmacherskich, za to posiada odnośnik do strony Polskiego Towarzystwa Psychologicznego, gdzie osoby uzależnione mogą znaleźć pomoc w walce z nałogiem.

### Wykorzystane technologie

- Node.js + Express.js (serwer aplikacji)
- Vue.js + Sass (część kliencka aplikacji)
- MongoDB (baza danych)
- Jest (testy jednostkowe)
- Cypress (testy E2E)

### Wymagania

Wymagania serwera dla aplikacji ScoresFC można podzielić na trzy główne sekcje:

- obsługa systemu logowania oraz autoryzacji użytkowników
- obsługa systemu komentarzy
- obsługa połączenia z API-Football

---

##### System logowania i autoryzacji

System logowania i autoryzacji umożliwia użytkownikom aplikacji zarejestrowanie się oraz późniejsze zalogowanie się do aplikacji, dzięki czemu zyskują oni dostęp do funkcjonalności niedostępnych dla gości. Serwer daje możliwość zablokowania ścieżki dla gości, której zawartość dopiero po sprawdzeniu tokenu **JWT** oraz roli użytkownika w systemie (można nadać dostęp do niektórych stron tylko dla administratora) zostaje udostępniona użytkownikowi systemu.

Podczas rejestracji serwer przyjmuje dane użytkownika, hashuje hasło za pomocą algorytmu **bcrypt** i zapisuje użytkownika w kolekcji _users_ w bazie danych.

Podczas logowania system porównuje podane przez użytkownika hasło z podanym podczas rejestracji i w przypadku zgodności wszystkich danych, nadaje użytkownikowi JSON Web Token, ważny przez 168 godzin (7 dób).

---

##### System komentarzy

System komentarzy umożliwia dodawanie, usuwanie oraz pobieranie komentarzy zarówno dla danego meczu, jak i wszystkich komentarzy w systemie (na potrzeby panelu administratora)

---

##### Obsługa zapytań do API-Football

Serwer ma również za zadanie pobieranie danych z [API-Football](https://www.api-football.com/).

### Dokumentacja API

Została sporządzona dokumentacja API, dostępna tutaj: [dokumentacja Swagger](https://app.swaggerhub.com/apis-docs/WojciechSutkowski/ScoresFC/1.0.0)
