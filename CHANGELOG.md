# Zmiany

Numeracja: MAJOR.MINOR.PATCH. Wersje 1.0.x to poprawki działania wersji 1.0.0 (ta sama funkcjonalność).
Serwer = projekt Apps Script „Budżet” (numer wersji Apps Script w nawiasie).

## 1.5.1
- „Stałe” pokazuje tylko kategorie z kwotą; kategorie bez kwoty (19 z szablonu arkusza) zostają do wyboru
  przy dodawaniu wydatku. Koszt stały o nazwie takiej kategorii nadal ją przejmuje.

## 1.5.0
- Ekran Start, karta „Wspólne konto”: zamiast podsumowania wszystkich kategorii – jedna linia „Koszty stałe”
  (suma wspólnych kosztów stałych miesiąca, z korektami tylko na ten miesiąc) i osobno tylko wydatki dodane
  w danym miesiącu, wg kategorii.
- Daty wpisów zawsze odczytywane jako data (także zapisane tekstem).

## 1.4.2
- Aktualizacja aplikacji sprawdzana także przy każdym powrocie do niej (telefon trzymał w tle starą wersję
  i nowe poprawki nie docierały); przeładowanie czeka, aż skończysz pisać / zamkniesz okno.
- Testy zmiany nazw: wydatki, korekty kwoty miesiąca i kategorie właściciela zmieniają się w bazie, innej osoby nie.

## 1.4.1
- Ta sama nazwa kategorii może być u różnych osób (np. „Multisport” Dominika i Mileny); unikalność w obrębie
  właściciela. Zmiana nazwy, usuwanie i kwota w jednym miesiącu działają tylko na wydatkach tego właściciela.
- Bez mignięć przy szybkich operacjach: zapis uznawany za potwierdzony dopiero, gdy baza pokaże dokładnie
  oczekiwany stan (wcześniej potwierdzenie poprzedniego zapisu mogło na chwilę przywrócić usunięty wpis).

## 1.4.0
- Rozliczenia: wpisany dług nie zmienia niczyich środków; dopiero ✓ „oddane” odejmuje dłużnikowi i dodaje
  wierzycielowi (wcześniej wierzyciel miał mniej od razu).
- Ekran Start: karta Rozliczenia pokazuje nieoddane pozycje z opisem.
- „Stałe”: na dole lista kategorii bez kwoty stałej – stuknięcie pozwala ustawić kwotę (nic się nie chowa).
- Dane: połączono „YouTubePremium” (39 zł) z pustą „YouTube Premium”.

## 1.3.1
- Naprawa: kilka zapisów szybko po sobie (przed potwierdzeniem bazy) tworzyło duplikaty – nowe wpisy dostają
  identyfikator od razu, a usunięte go zwalniają. (W danych budżetu duplikatów nie było – sprawdzone.)
- Zmiana nazwy kosztu stałego na nazwę pustej kategorii (np. „YouTubePremium” → „YouTube Premium”) łączy je
  zamiast odmawiać; wydatki z obu nazw liczą się razem.

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
