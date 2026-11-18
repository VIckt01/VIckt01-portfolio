const PROJETOS = {
  "beets-filmes": {
    titulo: "Top 8 Filmes de Tecnologia",
    categoria: "Social Media & Conteúdo",
    cliente: "Beets Jr. (UFSCar)",
    ano: "2026",
    desafio:
      "A Beets Jr. precisava de um conteúdo no Instagram que gerasse salvamentos, engajamento e identificação imediata com o público universitário de computação e tecnologia.",
    solucao:
      "Desenvolvi um carrossel misturando estética de colagem de papel rasgado, elementos retrô dos anos 90 e referências da cultura geek e IA (O Jogo da Imitação, A Rede Social, Matrix, Her, Hackers e Wall-E).",
    galeria: [
      "assets/img/Beetsjr1.png",
      "assets/img/Beetsjr2.png",
      "assets/img/Beetsjr3.png",
      "assets/img/Beetsjr4.png",
      "assets/img/Beetsjr5.png",
      "assets/img/Beetsjr6.png",
    ],
  },
  "ceavo-hortifruti": {
    titulo: "Campanha Combustível Natural",
    categoria: "Social Media",
    cliente: "CEAVO Hortifruti",
    ano: "2026",
    desafio:
      "Posicionar os produtos do hortifruti como aliados essenciais para quem pratica atividades físicas e busca mais energia no treino de forma saudável.",
    solucao:
      "Composição visual que divide a peça entre a identidade verde vibrante da marca e fotografia de lifestyle esportivo com luz natural, destacando a chamada de forma rápida e direta com receitas deliciosas para o dia a dia e um segundo carrossel com a temática halloween.",
    galeria: [
        "assets/img/CEAVO1.png",
        "assets/img/CEAVO5.png",
        "assets/img/CEAVO4.png",
        "assets/img/CEAVO3.png",
        "assets/img/CEAVO2.png",
        "assets/img/1.png",
    ],
  },
  "sistemas-web": {
    titulo: "Sistemas & Landing Pages",
    categoria: "Site & Front-end",
    cliente: "Projetos Autorais e Clientes",
    ano: "2026",
    desafio:
      "Pequenos negócios muitas vezes perdem vendas por não terem uma página profissional ou ferramentas simples para organizar pedidos, formulários e cadastros.",
    solucao:
      "Criação de páginas leves, responsivas e personalizadas em HTML, CSS e JavaScript que levam o cliente direto ao WhatsApp ou facilitam a rotina da empresa.",
    galeria: ["assets/img/sistemas-1.png"],
  },
  climatizacao: {
    titulo: "Identidade & Panfletos de Serviços",
    categoria: "Identidade Visual & Venda",
    cliente: "Negócio Familiar (Ar-Condicionado)",
    ano: "2026",
    desafio:
      "Transmitir confiança e profissionalismo no serviço de instalação e manutenção de ar-condicionado para atrair clientes da região.",
    solucao:
      "Desenvolvimento de logotipo limpo e panfleto direto ao ponto, destacando os serviços principais e facilitando o contato imediato pelo WhatsApp.",
    galeria: ["assets/img/ar-1.png"],
  },
};

// Preenche a página projeto.html automaticamente
(() => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = PROJETOS[id];

  if (!p) {
    window.location.href = "index.html#portfolio";
    return;
  }

  document.title = `${p.titulo} | Victoria Gabrielle`;
  document.getElementById("p-categoria").textContent = p.categoria;
  document.getElementById("p-titulo").textContent = p.titulo;
  document.getElementById("p-cliente").textContent = p.cliente;
  document.getElementById("p-ano").textContent = p.ano;
  document.getElementById("p-desafio").textContent = p.desafio;
  document.getElementById("p-solucao").textContent = p.solucao;

  const galeria = document.getElementById("p-galeria");
  p.galeria.forEach((src, i) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item";
    fig.innerHTML = `<img src="${src}" alt="${p.titulo} - Imagem ${i + 1}" />`;
    galeria.appendChild(fig);
  });
})();
