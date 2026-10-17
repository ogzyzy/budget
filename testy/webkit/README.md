# Testy w silniku WebKit (Safari)

Silnik WebKit (WebKitGTK) – ten sam co Safari na iPhonie, ale wersja na Linuksa: sprawdza JavaScript, CSS,
zdarzenia wskaźnika, układ i połączenie z Firestore. NIE odtwarza w pełni gestów iOS (przewijanie palcem,
menu po przytrzymaniu) – to wymaga prawdziwego iPhone'a.

Przygotowanie (Ubuntu, w sesji z proxy):

    apt-get install -y webkit2gtk-driver xvfb
    npm i selenium-webdriver@4.25.0            # w katalogu z testami
    # WebKit nie bierze proxy ze zmiennych środowiska – ustaw je w GSettings (plik keyfile):
    mkdir -p xdg/glib-2.0/settings && cat > xdg/glib-2.0/settings/keyfile <<K
    [org/gnome/system/proxy]
    mode='manual'
    ignore-hosts=['localhost', '127.0.0.0/8', '::1']
    [org/gnome/system/proxy/https]
    host='127.0.0.1'
    port=<port z HTTPS_PROXY>
    K
    Xvfb :99 &
    DISPLAY=:99 XDG_CONFIG_HOME=$PWD/xdg GSETTINGS_BACKEND=keyfile GIO_USE_PROXY_RESOLVER=gnome WebKitWebDriver --port=4444 &

Uruchomienie: `K=$(./seed.sh); node ui.mjs . $K` (seed.sh zakłada budżet testowy `test-…` w bazie
przez konto firebase CLI; po testach usuń go: `firebase firestore:delete budzety/$K -r`).
