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
    const novoTexto = "<p>PREPARAÇÃO DO SOLO:<br>As jabuticabeiras preferem solos ricos em matéria orgânica e bem drenados. Antes do plantio, prepare o solo, misturando composto orgânico e areia para melhorar a drenagem. Certifique-se de remover pedras e raízes de outras plantas.<br><br>Época de Plantio:<br>O melhor momento para plantar uma jabuticabeira é no início da estação chuvosa, quando a terra está úmida e as temperaturas são amenas. Esse período geralmente ocorre na primavera ou no início do verão, dependendo da região.<br><br>ESPAÇAMENTO:<br>Deixe um espaço adequado entre as mudas para que a jabuticabeira tenha espaço suficiente para crescer. O espaçamento ideal varia de acordo com a variedade e o porte da árvore, mas, em média, 3 a 5 metros de distância entre as mudas são recomendados.<br><br>PLANTIO:<br>Faça um buraco no solo, ligeiramente maior que o tamanho da muda, e coloque-a com cuidado, cobrindo as raízes com terra. Compacte suavemente o solo ao redor da muda e regue abundantemente.<br><br>REGA:<br>As jabuticabeiras precisam de água regularmente para se estabelecerem e desenvolverem raízes saudáveis. Nos primeiros meses após o plantio, mantenha o solo sempre úmido, sem encharcar. Depois desse período, regue em intervalos regulares, evitando que o solo fique seco por longos períodos.<br><br>ADUBAÇÃO:<br>Fertilize a jabuticabeira com adubo rico em nutrientes, especialmente durante o período de crescimento ativo. Utilize adubos orgânicos ou fertilizantes específicos para plantas frutíferas, seguindo as instruções do fabricante.<br><br>CUIDADOS EXTRAS:<br>Proteja a muda dos ventos fortes e de geadas, se ocorrerem na sua região. Realize podas de formação para direcionar o crescimento da árvore e remover galhos doentes ou cruzados. A poda também estimula a frutificação.<br><br>COLHEITA:<br>A jabuticabeira geralmente leva alguns anos para produzir frutos. Quando as jabuticabas estiverem maduras, colha-as delicadamente para evitar danos aos ramos.</p>";

    divInformacoes.innerHTML = novoTexto;
}

function restaurarInformacoesGerais() {
    const divInformacoes = document.getElementById("general-informations-text");
    const informacoesAntigas = "<p>A jabuticabeira é uma árvore nativa do Brasil, conhecida por sua peculiaridade e saboroso fruto, a jabuticaba. Pertencente à família Myrtaceae, a jabuticabeira possui o nome científico Plinia cauliflora e é comumente encontrada em diversas regiões do país, especialmente na Mata Atlântica.<br><br><br>Essa árvore pode alcançar de 6 a 15 metros de altura e possui uma copa densa e arredondada, que proporciona sombra agradável em dias quentes. Suas folhas são simples, de cor verde-escura e aspecto brilhante, características que tornam a jabuticabeira uma opção popular para o paisagismo em jardins e parques.<br><br><br>O fruto da jabuticabeira é uma pequena baga redonda, de casca fina e escura, que varia do roxo ao preto, dependendo da variedade. Seu sabor doce e levemente ácido é muito apreciado, sendo consumido in natura, utilizado em sucos, licores, geleias e outras deliciosas preparações culinárias.<br><br><br>Uma característica marcante da jabuticabeira é o seu processo de frutificação. Ao contrário da maioria das árvores frutíferas, as jabuticabas surgem diretamente no tronco e nos galhos mais baixos, em um fenômeno conhecido como caulifloria. Essa particularidade encanta e surpreende a todos que têm o privilégio de presenciar o espetáculo das jabuticabas maduras cobrindo a árvore.<br><br><br>A jabuticabeira possui importância cultural e histórica para as comunidades brasileiras. Além de ser apreciada pela culinária local e pela produção de alimentos, a árvore também inspira lendas e tradições populares. Seu cultivo é valorizado, e muitas pessoas se dedicam ao plantio e à preservação dessa espécie tão especial, que simboliza parte da rica biodiversidade brasileira.</p>";
    
    divInformacoes.innerHTML = informacoesAntigas;
}