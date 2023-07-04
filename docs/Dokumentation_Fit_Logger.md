# Inhaltsverzeichnis

1. Einleitung
2. Zielsetzung und Randbedingungen
3. Systemkontext
4. Lösungsstrategie
5. Bausteinsicht

   - 5.1 Übersicht
   - 5.2 Bausteine
   - 5.3 Beziehungen und Abhängigkeiten
   - 5.4 Laufzeitperspektive

6. Laufzeitsicht

   - 6.1 Übersicht
   - 6.2 Szenarien
   - 6.3 Qualitätsattribute
   - 6.4 Ressourcenverbrauch

7. Verteilungssicht

   - 7.1 Übersicht
   - 7.2 Kommunikationsbeziehungen
   - 7.3 Verteilungsdiagramme

8. Datenperspektive

   - 8.1 Übersicht
   - 8.2 Datenstrukturen
   - 8.3 Datenflüsse

9. Infrastruktursicht

   - 9.1 Übersicht
   - 9.2 Technische Umgebung
   - 9.3 Bereitstellung
   - 9.4 Betrieb

10. Konzepte
11. Entwurfsentscheidungen und Technologieeinsatz
12. Risiken und technische Schulden
13. Qualitätsziele
14. Glossar

## 1. Einleitung

### 1.1 Aufgabenstellung

#### Was ist der FIT-Logger?

FIT-Logger ist eine Progressive Web App, die es dem Nutzer ermöglicht, seine Ernährung nachzuverfolgen, überwachen und zu planen.

Egal ob man sich bewusster Ernähren möchte, sportliche Ziele verfolgt, oder aufgrund gesundheitlicher Probleme gezwungen ist, seine täglich konsumierten Lebensmittel im Überblick zu behalten: der FIT-Logger ist immer der richtige Begleiter!

#### Wesentliche Features:

- Zieltracking: Visualisierung der Soll und Ist-Werte (Makronährstoffe, Kalorien)
- Festlegung täglicher Kalorien- und Makronährstoffziele
- Verwaltung einer Produkt Datenbank
- Komponieren einer Mahlzeit
- Produktsuche mittels Barcode-Scanner
- Führen eines Ernährungstagebuchs (Logbuch)
- Nachverfolgung festgelegter Ziele: Anzeige als Linien-Diagramm

## 2. Zielsetzung und Randbedinungen

## 3. Systemkontext

## 4. Lösungsstrategie

## 5. Bausteinsicht

## 6. Laufzeitsicht

## 7. Verteilungssicht

## 8. Datenperspektive

## 9. Infrastruktursicht

## 10. Konzepte

## 11. Entwurfsentscheidungen und Technologieeinsatz

### 11.1 Progressive Web App

Um ein möglichst breites Publikum anzusprechen, soll FIT-Logger **plattform- und geräteunabhängig** nutzbar sein.

Viele bekannte Apps sind an spezielle App-Marketplaces, wie den "Google Play Store" (Android) oder den "App-Store" von Apple (iOS) gebunden. User, die andere Betriebssysteme nutzen, können auf diese Apps nicht zugreifen.

Eine Progressive Web App kann auf einen App Store komplett verzichten. Die Anwendung kann direkt über einen Webbrowser aufgerufen werden, ohne dass ein Herunterladen (aus einem App Store) erforderlich ist. Eine PWA ist also **plattformunabhängig**.

Alternativen wie z.B. Flutter wurden ebenfalls in Betracht gezogen. Aufgrund der Komplexität der verwendeten Sprache (Dart), wurde die Idee schnell verworfen.

Deshalb haben wir uns für die Verwendung einer Progressive Web App entschieden.

Es ergeben sich weitere Auswirkungen durch die Verwendung einer Progressive Web App.

So ist eine Funktionalität die Offline-Verfügbarkeit. Man kann die App unabhängig von einer stabilen Internetverbindung nutzen. Außerdem sind PWAs skalierbar, da sie auf Webtechnologien basieren. Sie können sich an verschiedene Bildschirmgrößen und Geräte anpassen und sind sowohl für mobile als auch für Desktop-Benutzer geeignet. Das bedeutet, FIT-Logger ist nicht nur **plattformunabhängig**, sondern auch **geräteunabhängig**. Die Wartbarkeit des Systems ist durch Verwendung einer PWA im Vergleich zu nativen Apps einfacher, da es nur eine Codebasis für alle Plattformen gibt. Änderungen und Updates können zentralisiert erfolgen.

Die Entscheidung für die Verwendung einer Progressive Web App erfüllt die Hauptkritierien "Plattformunabhängigkeit" und "Geräteunabhängigkeit".

Referenzen:

Google Developers: Progressive Web Apps: https://web.dev/progressive-web-apps/

### 11.2 Verwenden des JavaScript-Frameworks "Vue.js" zur Entwicklung der PWA

Für die Entwicklung einer Progressive Web App ist es hilfreich, ein geeigntes JavaScript Framework zu verwenden. FIT-Logger soll eine effiziente Datenverwaltung, eine ansprechende Nutzeroberfläche durch weitere Frameworks sowie dynamische Funktionen zurückgreifen können, um optimal auf die Interaktion mit dem Nutzer abgestimmt zu sein. Vue.js bietet all diese Möglichkeiten.

Alternativ könnte man andere Frameworks wie z.B. React oder Angular in Betrach ziehen, denn diese Frameworks bieten ebenfalls Möglichkeiten zur Datenverwaltung, Erstellung von Benutzeroberflächen sowie dynamische Funktionen. Sie unterscheiden sich in der Herangehensweise sowie der Syntax.

Es wird das Vue.js Framework eingesetzt, da neben der guten **Datenverwaltung** und Bereitstellung **dynamischer Funktionen**, die einfache und **intuitive Syntax** für sich spricht.

Durch die Verwendung von Vue.js ergeben szur Datenverwaltung können wir den Zustand der Progressive Web App effektiv verwalten. Vue.js bietet eine reaktive Datenbindung, sodass Änderungen an den Daten automatisch in der Benutzeroberfläche reflektiert werden, wodurch ein konsistenter und aktualisierter Zustand beibehalten wird. Dies ermöglicht eine schnelle und effiziente Aktualisierung der Benutzeroberfläche basierend auf den Datenänderungen, wie es z.B. bei der Anzeige des täglichen Ziels auf dem Dashboard notwendig ist.

Referenzen:

Vue.js Dokumentation: https://vuejs.org/

### 11.3 UI-Framework: Quasar

## 12. Risiken und technische Schulden

## 13. Qualitätsziele

## 14. Glossar

### Begriffe

| Begriff | Synonyme        | Erklärung                                                    |
| ------- | --------------- | ------------------------------------------------------------ |
| Makros  | Makronährstoffe | Hauptenergielieferanten sind Kohlenhydrate, Fette und Eiweiß |
|         |                 |                                                              |
|         |                 |                                                              |
