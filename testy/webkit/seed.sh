#!/bin/bash
# zakłada budżet testowy w Firestore (konto administratora z firebase CLI); wypisuje klucz
cd /tmp && firebase projects:list >/dev/null 2>&1; rm -f /tmp/firebase-debug.log
TK=$(node -e 'const c=require(require("os").homedir()+"/.config/configstore/firebase-tools.json");console.log(c.tokens.access_token)')
K="test-wk-$(date +%s)-abcdefghijklmnop"; B="https://firestore.googleapis.com/v1/projects/budzet-domowy-a58aee-368b8/databases/(default)/documents/budzety/$K"
put(){ curl -sS -o /dev/null -w '' -X PATCH -H "Authorization: Bearer $TK" -H 'Content-Type: application/json' -d "$2" "$B$1"; }
NOW=$(node -e 'console.log(new Date(2026,9,1).getTime())')
put "" "{\"fields\":{\"names\":{\"arrayValue\":{\"values\":[{\"stringValue\":\"Ania\"},{\"stringValue\":\"Tomek\"}]}},\"year\":{\"integerValue\":\"2026\"},\"start\":{\"integerValue\":\"1000\"},\"groups\":{\"arrayValue\":{\"values\":[{\"stringValue\":\"\"}]}},\"zmigrowano\":{\"integerValue\":\"$NOW\"}}}"
i=0; for n in Czynsz:2000 Internet:80 Netflix:50 Prąd:300 Spotify:20 Zakupy:; do nm=${n%%:*}; kw=${n##*:}; [ -z "$kw" ] && kv='{"stringValue":""}' || kv="{\"integerValue\":\"$kw\"}"
  put "/pozycje/p$i" "{\"fields\":{\"nazwa\":{\"stringValue\":\"$nm\"},\"grupa\":{\"stringValue\":\"\"},\"kwota\":$kv,\"czyje\":{\"stringValue\":\"Wspólne\"},\"aktywna\":{\"stringValue\":\"✓\"},\"kol\":{\"integerValue\":\"$i\"}}}"; i=$((i+1)); done
put "/wyplaty/10" '{"fields":{"c":{"integerValue":"6000"},"d":{"integerValue":"5000"},"e":{"integerValue":"3000"},"t1":{"stringValue":"✓"},"t2":{"stringValue":"✓"}}}'
echo $K
