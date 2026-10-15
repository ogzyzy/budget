// Udostępnia stronie (zwykły <script>) tylko potrzebne funkcje Firestore jako window.FB.
import { initializeApp } from "firebase/app";
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager, memoryLocalCache,
  doc, collection, onSnapshot, writeBatch, runTransaction, getDoc, Timestamp, deleteField
} from "firebase/firestore";
window.FB = { initializeApp, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, memoryLocalCache,
  doc, collection, onSnapshot, writeBatch, runTransaction, getDoc, Timestamp, deleteField };
