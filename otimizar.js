const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pastaImagens = path.join(__dirname, 'public', 'images');

const imagens = [
  'mktdigital.png',
  'equipe.png',
  'Logo.png',
  'portifolio3.jpg',
  'img.png',
  'design.jpg'
];

console.log("Iniciando a otimização das imagens no projeto...");

imagens.forEach((nomeArquivo) => {
  const caminhoOriginal = path.join(pastaImagens, nomeArquivo);

  if (fs.existsSync(caminhoOriginal)) {
    const nomeSemExtensao = nomeArquivo.split('.').slice(0, -1).join('.');
    const caminhoDestino = path.join(pastaImagens, `${nomeSemExtensao}.webp`);

    sharp(caminhoOriginal)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(caminhoDestino)
      .then(info => {
        console.log(`Sucesso: ${nomeArquivo} otimizada! Tamanho final: ${(info.size / 1024).toFixed(2)} KB`);
      })
      .catch(err => {
        console.error(`Erro em ${nomeArquivo}:`, err.message);
      });
  } else {
    console.log(`Imagem original não encontrada em public/images: ${nomeArquivo}`);
  }
});