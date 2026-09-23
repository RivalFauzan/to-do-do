// src/about.js

export function loadAboutPage() {
    const wadahContent = document.getElementById('content');
    if (!wadahContent) return;

    // 1. Buat elemen pembungkus utama halaman about
    const aboutSection = document.createElement('section');
    aboutSection.className = 'about-section';

    // 2. Buat judul halaman
    const judul = document.createElement('h1');
    judul.textContent = 'Tentang Kami';
    aboutSection.appendChild(judul);

    // 3. Buat cerita/konten deskripsi
    const paragraf1 = document.createElement('p');
    paragraf1.textContent = 'Didirikan sejak tahun 2020, kami berkomitmen untuk selalu menyajikan hidangan dengan bahan baku segar berkualitas terbaik setiap harinya.';
    
    const paragraf2 = document.createElement('p');
    paragraf2.textContent = 'Kenyamanan pelanggan dan cita rasa otentik adalah prioritas utama kami. Terima kasih telah menjadi bagian dari perjalanan kuliner kami.';

    // Satukan paragraf ke dalam section
    aboutSection.appendChild(paragraf1);
    aboutSection.appendChild(paragraf2);

    // 4. Masukkan seluruh section ke dalam div#content
    wadahContent.appendChild(aboutSection);
}
