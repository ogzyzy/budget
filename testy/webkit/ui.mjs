// Testy dotykowe w silniku WebKit (Safari) – przez WebKitWebDriver, dotyk = W3C actions „touch”.
import { createRequire } from 'node:module'; import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const DIR = process.argv[2], KEY = process.argv[3];
const require = createRequire(DIR + '/package.json');
const { Builder } = require('selenium-webdriver'); const { Command } = require('selenium-webdriver/lib/command');
const srv = http.createServer((q, r) => { const f = path.join('/home/user/budget', new URL(q.url, 'http://x').pathname.replace(/\/$/, '/index.html')); fs.existsSync(f) ? r.end(fs.readFileSync(f)) : (r.writeHead(404), r.end()); }).listen(8791);
const caps = { browserName: 'MiniBrowser', 'webkitgtk:browserOptions': { binary: '/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/MiniBrowser', args: ['--automation', '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'] } };
const d = await new Builder().usingServer('http://localhost:4444').withCapabilities(caps).build();
const js = (s, ...a) => d.executeScript(s, ...a);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const waitFor = async (expr, ms = 15000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await js('return !!(' + expr + ')')) return Date.now() - t0; await sleep(100); } return -1; };
const box = sel => js('const b = document.querySelector(arguments[0]).getBoundingClientRect(); return { x: Math.round(b.left + 40), y: Math.round(b.top + b.height / 2) };', sel);
const touch = async (steps) => d.execute(new Command('actions').setParameter('actions', [{ type: 'pointer', id: 'finger', parameters: { pointerType: 'touch' }, actions: steps }]));
const tap = async sel => { const p = await box(sel); await touch([{ type: 'pointerMove', x: p.x, y: p.y, duration: 0 }, { type: 'pointerDown', button: 0 }, { type: 'pause', duration: 60 }, { type: 'pointerUp', button: 0 }]); await sleep(250); };
const W = {}, errs = [];
try {
  await d.manage().window().setRect({ width: 390, height: 844 });
  await d.get('http://localhost:8791/?k=' + KEY + '&ja=0');
  await js('window.__err=[]; window.addEventListener("error", e => window.__err.push(e.message)); window.addEventListener("unhandledrejection", e => window.__err.push(String(e.reason)));');
  W.ladowanieMs = await waitFor('window.BUDZET_TEST && window.BUDZET_TEST.raw() && document.body.innerText.includes("Koszty stałe")', 30000);
  W.dotykDostepny = await js('return "ontouchstart" in window || navigator.maxTouchPoints > 0');
  // 1) miesiąc: stuknięcie w nazwę → siatka → Wrzesień → Październik
  await tap('#monthBtn'); W.siatkaOtwarta = await js('return document.getElementById("monthSheet").classList.contains("on")');
  await tap('#monthGrid button:nth-child(9)'); W.poWyborze = await js('return document.getElementById("monthName").textContent');
  await tap('#monthBtn'); await tap('#monthGrid button:nth-child(10)'); W.powrot = await js('return document.getElementById("monthName").textContent');
  // 2) przeciąganie w „Stałych”: przytrzymaj Spotify, przesuń na górę
  await tap('.tab[data-view="fixed"]');
  const kolej = () => js('return [...document.querySelectorAll("#fixedList .pos-list")[0].children].map(r => r.querySelector(".fx-name").textContent.replace(" ›", ""))');
  W.przed = await kolej();
  const a = await js('const rows=[...document.querySelectorAll("#fixedList .pos-list")[0].children]; const s=rows.find(r=>r.textContent.includes("Spotify")).getBoundingClientRect(), t=rows[0].getBoundingClientRect(); return {x:Math.round(s.left+60), y:Math.round(s.top+s.height/2), ty:Math.round(t.top+t.height/2)};');
  const kroki = [{ type: 'pointerMove', x: a.x, y: a.y, duration: 0 }, { type: 'pointerDown', button: 0 }, { type: 'pause', duration: 600 }];
  for (let i = 1; i <= 12; i++) kroki.push({ type: 'pointerMove', x: a.x, y: Math.round(a.y + (a.ty - 6 - a.y) * i / 12), duration: 30 });
  kroki.push({ type: 'pointerUp', button: 0 }); await touch(kroki); await sleep(800);
  W.poPrzeciagnieciu = await kolej();
  W.edycjaNieOtwarta = await js('return !document.getElementById("posSheet").classList.contains("on")');
  W.zaznaczenieTekstu = await js('return String(getSelection())');
  // stuknięcie dalej otwiera edycję
  await tap('#fixedList .pos-list .fx-row:nth-child(2) .fx-name'); W.stuknieciaEdycja = await js('return document.getElementById("posSheet").classList.contains("on") && document.getElementById("posName").value');
  await tap('#posCancel');
  // 3) wydatek z polskimi znakami (klawiatura WebDriver)
  await tap('.tab[data-view="start"]'); await tap('#startAdd');
  const amt = await d.findElement({ css: '#amt' }); await amt.sendKeys('12,50');
  const desc = await d.findElement({ css: '#desc' }); await desc.sendKeys('Żabka – ąęćłńóśźż');
  await tap('#saveBtn'); await sleep(400);
  W.wydatek = await js('return window.BUDZET_TEST.raw().tx.filter(x => x[3]).map(x => x[1] + " " + x[2] + " " + x[3])');
  // 4) rozliczenie na pół
  await tap('.tab[data-view="settle"]'); await tap('#settleAdd');
  await js('[...document.querySelectorAll("#splitBtns button")].find(b => b.textContent.includes("Na pół")).setAttribute("data-t","1"); [...document.querySelectorAll("#dirBtns button")];');
  await tap('#splitBtns button[data-t="1"]');
  await (await d.findElement({ css: '#amt' })).sendKeys('200');
  await js('document.getElementById("amt").dispatchEvent(new Event("input"))');
  W.podglad = await js('return document.getElementById("splitInfo").textContent');
  await (await d.findElement({ css: '#desc' })).sendKeys('kolacja'); await tap('#saveBtn'); await sleep(400);
  W.rozliczenia = await js('const s = obliczStan(window.BUDZET_TEST.raw(), 10); return s.settle.list.map(x => (x.a ? s.settle.dirs[0] : s.settle.dirs[1]) + " " + (x.a || x.b) + " " + x.note + (x.pol ? " pół z " + x.suma : ""))');
  await tap('.tab[data-view="mine"]'); W.osobisteKategorie = await js('return [...document.querySelectorAll("#mineByPos > *")].map(e => e.textContent.trim()).filter(Boolean).slice(0, 5)');
  W.poziomyScroll = await js('return document.documentElement.scrollWidth > innerWidth');
  fs.writeFileSync(DIR + '/ui-settle.png', Buffer.from(await d.takeScreenshot(), 'base64'));
  W.bledyJS = await js('return window.__err');
} catch (e) { errs.push(String(e).slice(0, 400)); }
finally { await d.quit(); srv.close(); }
console.log(JSON.stringify({ W, errs }, null, 1));
