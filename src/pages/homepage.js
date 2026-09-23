export function createHomepage() {
    const wadahContent = document.getElementById("content");
    
    if (!wadahContent) return;

    const section = document.createElement("div");
    section.className = "hero-section";

    const judul = document.createElement("h2");
    judul.textContent = "selamat datang di restoran kami";

    const deskripsi = document.createElement("p");
    deskripsi.textContent = "Nikmati hidangan lezat dan pengalaman bersantap yang tak terlupakan di restoran kami. Kami menyajikan berbagai pilihan menu yang menggugah selera, mulai dari hidangan tradisional hingga kreasi modern. Setiap hidangan dibuat dengan bahan-bahan segar dan berkualitas tinggi, disiapkan oleh koki berpengalaman untuk memastikan kepuasan Anda. Selamat menikmati waktu Anda bersama kami!";

    section.appendChild(judul);
    section.appendChild(deskripsi);

    wadahContent.appendChild(section);
}