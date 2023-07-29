function moveLine1() {
    var line = document.querySelector('.line');
    var titleText = document.querySelector('.title-text');
    titleText.parentNode.insertBefore(line, titleText.nextSibling);

    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes slideLine {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(0%);
            }
        }`;

    document.head.appendChild(styleSheet);
}

function moveLine2() {
    var line = document.querySelector('.line');
    var titleTextTwo = document.querySelector('.title-text-two');
    titleTextTwo.parentNode.insertBefore(line, titleTextTwo.nextSibling);

    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes slideLine {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(0%);
            }
        }`;

    document.head.appendChild(styleSheet);
}

//mudar informações
function trocarInformacoesPlantio() {
    const divInformacoes = document.getElementById("general-informations-text");
    const novoTexto = "<p>PREPARAÇÃO DO SOLO:<br>A araucária prospera em solos bem drenados e ricos em matéria orgânica. Prepare o solo com antecedência, removendo detritos e pedras, e adicione composto orgânico para melhorar a qualidade do solo. A araucária também aprecia solos ligeiramente ácidos.<br><br>ÉPOCA DE PLANTIO:<br>O plantio da araucária é melhor realizado no início da estação chuvosa, quando as chuvas ajudam na formação de raízes. Geralmente, isso ocorre na primavera, mas pode variar conforme a região.<br><br>PLANTIO:<br>Se estiver plantando sementes, coloque-as diretamente no solo ou em recipientes, cobrindo-as levemente com substrato. Se estiver utilizando mudas, faça um buraco no solo ligeiramente maior que o torrão da muda, coloque-a e cubra com terra, compactando suavemente ao redor dela.<br><br>REGA:<br>No início, após o plantio, mantenha o solo constantemente úmido, sem encharcar. À medida que a araucária se estabelece, reduza gradualmente a frequência de rega, permitindo que as raízes se desenvolvam em busca de água. No entanto, lembre-se de que a araucária é uma árvore que aprecia umidade e, em épocas secas, é necessário regá-la regularmente.<br><br>PROTEÇÃO CONTRA PÁSSAROS:<br>Durante o crescimento inicial, a araucária é suscetível a danos causados por pássaros que buscam suas sementes. Proteja as mudas ou pinhas com redes ou telas para evitar perdas.<br><br>ADUBAÇÃO:<br>A araucária é uma árvore resistente e geralmente não necessita de muita adubação. No entanto, a aplicação de um fertilizante balanceado, rico em potássio, na primavera pode auxiliar em seu desenvolvimento.<br><br>CUIDADOS EXTRAS:<br>Realize podas apenas para remover galhos danificados ou doentes. A araucária não exige podas frequentes e sua forma natural é parte de seu charme.<br><br>CRESCIMENTO E DESENVOLVIMENTO:<br>A araucária cresce lentamente, mas quando atinge a fase adulta, torna-se uma árvore majestosa e imponente, adicionando um toque especial ao seu jardim ou propriedade.</p>";

    divInformacoes.innerHTML = novoTexto;
}

function restaurarInformacoesGerais() {
    const divInformacoes = document.getElementById("general-informations-text");
    const informacoesAntigas = "<p>A jabuticabeira é uma árvore nativa do Brasil, conhecida por sua peculiaridade e saboroso fruto, a jabuticaba. Pertencente à família Myrtaceae, a jabuticabeira possui o nome científico Plinia cauliflora e é comumente encontrada em diversas regiões do país, especialmente na Mata Atlântica.<br><br><br>Essa árvore pode alcançar de 6 a 15 metros de altura e possui uma copa densa e arredondada, que proporciona sombra agradável em dias quentes. Suas folhas são simples, de cor verde-escura e aspecto brilhante, características que tornam a jabuticabeira uma opção popular para o paisagismo em jardins e parques.<br><br><br>O fruto da jabuticabeira é uma pequena baga redonda, de casca fina e escura, que varia do roxo ao preto, dependendo da variedade. Seu sabor doce e levemente ácido é muito apreciado, sendo consumido in natura, utilizado em sucos, licores, geleias e outras deliciosas preparações culinárias.<br><br><br>Uma característica marcante da jabuticabeira é o seu processo de frutificação. Ao contrário da maioria das árvores frutíferas, as jabuticabas surgem diretamente no tronco e nos galhos mais baixos, em um fenômeno conhecido como caulifloria. Essa particularidade encanta e surpreende a todos que têm o privilégio de presenciar o espetáculo das jabuticabas maduras cobrindo a árvore.<br><br><br>A jabuticabeira possui importância cultural e histórica para as comunidades brasileiras. Além de ser apreciada pela culinária local e pela produção de alimentos, a árvore também inspira lendas e tradições populares. Seu cultivo é valorizado, e muitas pessoas se dedicam ao plantio e à preservação dessa espécie tão especial, que simboliza parte da rica biodiversidade brasileira.</p>";
    
    divInformacoes.innerHTML = informacoesAntigas;
}