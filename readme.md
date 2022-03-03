&nbsp;

![](/src/assets/images/logo-dark.svg#gh-light-mode-only)
![](/src/assets/images/logo-lite.svg#gh-dark-mode-only)

&nbsp;

Videogames database builder, library manager and emulator frontend with **Vue**, **Electron** and **Tailwind**.

![](/src/assets/screens/0.png)

**Viridian** allows you to create your own personalized videogames database, plus the ability to use it as a *launcher/frontend*. The application design and structure makes it possible to build dynamic databases, and its configuration is very customizable, being adaptable to your needs and current setup, without forcing you to make things in a specific way.

![](/src/assets/screens/1.png)

While the application is **fully-featured**, **completely functional** and **stable**, it shows its true potential when used with a populated database. There's been a lot of care and effort put into data entry operations and features to make it pleasant and easy to use, but it's still a very time consuming task.

Since I plan to make a ***Viridian-compatible***, high quality online database in the future, where users would be able to scrape the information right away from the app and browser, documentation and more details will be eventually added at a later time.

Still, I encourage you to try the app on its current state for yourself and discover its true potential!

## Getting started

For now, Viridian is only runnable locally as a database + frontend desktop application, but eventually (whenever I get a decently populated and high quality database, and a domain name) it'll be available as an online database with scraping support.

To run and/or compile the program, after installing the dependencies (`npm install`), execute `npm run electron:serve` for live debugging, or `npm run electron:build` to compile to the current platform as a target.

The compilation targets builds:

- AppImages and Debian packages for Linux
- NSIS installers for Windows
- Unpacked, compressed 7z files for Linux and Windows