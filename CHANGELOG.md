# Zmiany

Numeracja: MAJOR.MINOR.PATCH. Wersje 1.0.x to poprawki działania wersji 1.0.0 (ta sama funkcjonalność).
Serwer = projekt Apps Script „Budżet” (numer wersji Apps Script w nawiasie).

## 1.3.0
- Obsługa błędów: komunikaty zawsze na wierzchu (wcześniej chowały się pod oknami), błędy widoczne 6 s i zamykane
  stuknięciem, błąd w oknie kategorii pod polem, wyłapywanie nieoczekiwanych błędów, pasek „Brak internetu”.
- Koszt stały o nazwie istniejącej kategorii bez kwoty (np. „Internet” z szablonu) zamienia ją w koszt stały
  zamiast odmawiać.
- Zapamiętywanie użytkownika („kim jesteś”): pamięć przeglądarki + ciasteczko + adres (?ja=) – ikona na ekranie
  startowym dodana po wyborze pamięta osobę na stałe.
- Wielokrotne spacje w nazwie kategorii są skracane do jednej.

## 1.2.1
- Pisanie nie jest przerywane przez zmiany przychodzące z bazy (np. od drugiej osoby): ekran odświeża się po wyjściu z pola.
- Ekran nie przerysowuje się, gdy baza tylko potwierdza zapis.
- Kwoty można wpisywać z „zł”/„PLN” i spacjami (np. „29,99 zł”, „1 234,50”).
- Pola nazwy i opisu: polska klawiatura, wielka litera na początku, enter = gotowe.

## 1.2.0
- Koszty stałe odliczają się od konta wspólnego co miesiąc, od miesiąca startu budżetu (u nas: październik 2026 –
  miesiąc przeniesienia do bazy; można nadpisać polem startMiesiac w bazie), niezależnie od ✓ wpłat.
- Ekran zmienia się od razu po kliknięciu i nie „mruga”, gdy baza potwierdza zapis.

## 1.1.0
- Dane w bazie Firebase Firestore (projekt budzet-domowy-a58aee-368b8, region Warszawa) zamiast arkusza Google.
- Zapis widoczny od razu i działa bez internetu (dośle się po połączeniu).
- Zmiany drugiej osoby pojawiają się na żywo (ok. 0,3 s).
- Przy pierwszym otwarciu dane przenoszą się z arkusza do bazy automatycznie (jednorazowo).
- Dostęp jak dotąd: tajny klucz w linku (reguły bazy: firestore.rules).
- Biblioteka Firebase budowana lokalnie: build/ → firebase.js (`npm run build`).

## 1.0.4
- Numer wersji na dole ekranu Start.
- Samoaktualizacja: po wdrożeniu nowej wersji aplikacja sama się przeładowuje.
- Natychmiastowe także: edycja i usuwanie kategorii, kwota kosztu stałego w jednym miesiącu, aktualizacja stanu.
- Komunikaty mieszczą się na wąskich ekranach.
- Serwer bez zmian (1.0.3).

## 1.0.3 – serwer (Apps Script v8)
- Telefon trzyma kopię danych i liczy stan sam; zapisy widoczne od razu, wysyłane w tle, cofane przy błędzie.

## 1.0.2 – serwer (Apps Script v7)
- Ostatni stan zapamiętany na telefonie – otwieranie bez czekania.
- Mniej odczytów arkusza (8 zamiast 13).

## 1.0.1 – serwer (Apps Script v6)
- Aplikacja jako osobna strona (GitHub Pages): bez paska Google i bez logowania, dostęp kluczem w linku.

## 1.0.0 – serwer (Apps Script v5)
- Wersja wyjściowa.
