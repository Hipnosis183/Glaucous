<br>
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/assets/images/logo-lite.svg">
    <img src="src/assets/images/logo-dark.svg" width="80%">
  </picture>
</div>
<br>

**Glaucous** is a videogames database builder, library manager and emulator frontend.
It allows you to create your own customized database, plus the ability to use it as a *launcher/frontend*.

The application and database are designed to be as dynamic as possible, giving you the freedom to choose what you want to see and how. Customization and flexibility are paramount, allowing you to adapt your current setup without forcing any specific changes to work.

A quality database is being slowly worked on. Once it reaches a mature state, it will be available online, and users will be able to scrape the information from the application right away. Extensive documentation for the program usage and configuration will also be available at a later date.

# Screenshots

![](/src/assets/screens/0.png)
![](/src/assets/screens/1.png)

# Getting started

For now, Glaucous is only runnable locally as a database + frontend desktop application, but eventually it'll be available as an online database with scraping support.

To run/compile the program, after installing the dependencies (`npm install`), execute `npm run electron:serve` for live debugging, or `npm run electron:build` to compile to the current platform as a target.

The compilation targets builds:

- AppImages and Debian packages for Linux
- NSIS installers for Windows
- Unpacked, compressed 7z files for Linux and Windows