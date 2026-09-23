export function loadMenuPage() {
    const wadahContent = document.getElementById("content");
    
    if (!wadahContent) return;

    const menusection = document.createElement("section");
    menusection.className = "menu-section";

    const judul = document.createElement("h1");
    judul.textContent = "Daftar Menu Spesial Kami";
    menusection.appendChild(judul);

    const daftarMenu = [
        { nama: `Nasi Goreng Spesial`, harga: `Rp 25.000`, deskripsi: `Nasi goreng dengan telur, ayam, dan krupuk.`},
        { nama: `Mie Ayam`, harga: `Rp 20.000`, deskripsi: `Mie dengan potongan ayam dan sayuran.`},
        { nama: `Sate Ayam`, harga: `Rp 30.000`, deskripsi: `Sate ayam dengan bumbu kacang.`},
        { nama: `Gado-Gado`, harga: `Rp 22.000`, deskripsi: `Salad sayuran dengan bumbu kacang.`},
        { nama: `Rendang Daging`, harga: `Rp 35.000`, deskripsi: `Daging sapi dimasak dengan rempah khas Indonesia.`},
    ];

    daftarMenu.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";

        const namaMenu = document.createElement(`h2`);
        namaMenu.textContent = `${item.nama} - ${item.harga}`;

        const deskripsiMenu = document.createElement(`p`);
        deskripsiMenu.textContent = item.description || item.deskripsi;

        itemDiv.appendChild(namaMenu);
        itemDiv.appendChild(deskripsiMenu);
        menusection.appendChild(itemDiv);
    });

    wadahContent.appendChild(menusection);
}