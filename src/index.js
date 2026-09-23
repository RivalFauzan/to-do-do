import "./style.css";
import  { createHomepage } from "./pages/homepage.js";
import  { loadMenuPage } from "./pages/menu.js";
import  { loadAboutPage } from "./pages/about.js";

function bersihkanKonten() {
    const wadahContent = document.getElementById("content");
    if (wadahContent) {
        wadahContent.innerHTML = ""; // Bersihkan konten sebelumnya
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createHomepage();
    setupNavigation();
});

function setupNavigation() {
    const btnHome = document.getElementById(`btn-home`);
    const btnMenu = document.getElementById(`btn-menu`);
    const btnAbout = document.getElementById(`btn-about`);

    if (btnHome) {
        btnHome.addEventListener("click", () => {
            bersihkanKonten();
            createHomepage();
        });
    }

    if (btnMenu) {
        btnMenu.addEventListener("click", () => {
            bersihkanKonten();
            loadMenuPage();
        });
    }

    if (btnAbout) {
        btnAbout.addEventListener("click", () => {
            bersihkanKonten();
            loadAboutPage();
        });
    }
}




// const wadahContent = document.getElementById("content");
// const tombolNavigasi = document.querySelectorAll("nav button");

// function buatKontenHalaman(namaHalaman) {
//     const section = document.createElement("section");
//     section.className = "page-section";

//     const judul = document.createElement("h2");
//     judul.textContent = `Ini adalah halaman ${namaHalaman}`;

//     const deskripsi = document.createElement("p");
//     deskripsi.textContent = `Konten ini dimasukkan secara dinamis ke dalam #content menggunakan appendChild untuk halaman ${namaHalaman}. Ini adalah konten yang relevan untuk halaman ini.`;

//     section.appendChild(judul);
//     section.appendChild(deskripsi);

//     return section;
// }

// tombolNavigasi.forEach((tombol) => {
//     tombol.addEventListener("click", () => {
//         const teksTombol = tombol.textContent;

//         if (wadahContent) {
//             wadahContent.innerHTML = ""; // Bersihkan konten sebelumnya

//             const kontenBaru = buatKontenHalaman(teksTombol);
//             wadahContent.appendChild(kontenBaru);

//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//     if (wadahContent) {
//         wadahContent.appendChild(buatKontenHalaman("Home"));
//     }
// });