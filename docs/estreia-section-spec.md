1. Objetivo
Implementar a seção de fechamento da landing page ("Estréia"), focada em gerar urgência e
expectativa para o lançamento do filme através de um contador progressivo e atmosfera
cinematográfica imersiva.
2. Inventário de Elementos
● Fundo: Composição cósmica (nebulosas rosa/roxo) com estrelas fixas.
● Elementos Flutuantes: 6 instâncias do asset "Power Star" distribuídas
assimetricamente.
● Cabeçalho da Seção: Título principal com destaque em palavras-chave e sub-heading
institucional.
● Chamada do Contador: Label de suporte indicando a ação (Estreia).
● Componente de Contador: Bloco centralizado contendo 4 grupos de dígitos e labels de
unidade.
● Rodapé da Seção: Data literal confirmando o evento e disclaimer legal.
● Navegação: Paginação lateral (dots) e setas de navegação vertical/horizontal.
3. Estrutura HTML (Blueprint)
A estrutura deve seguir o contrato de dados para integração com o script de contagem:
<section id="estreia" class="estreia-section">
<div class="estreia-content">
<header class="estreia-header">
<h2 class="text-hero">Cada <span class="text-accent">estrela</span> guarda uma história.
A sua começa <span class="text-accent">agora.</span></h2>
<p class="text-brand">SUPER MARIO GALAXY: O FILME</p>
</header>
<div class="countdown-wrapper">
<span class="countdown-label">ESTREIA NOS CINEMAS EM</span>
<div class="countdown-container" data-target-date="2026-12-25T00:00:00">
<div class="countdown-item">
<span class="countdown-value" data-countdown="days">00</span>
<span class="countdown-unit">DIAS</span>
</div>
<span class="countdown-separator">:</span>
<div class="countdown-item">
<span class="countdown-value" data-countdown="hours">00</span>

<span class="countdown-unit">HORAS</span>
</div>
<span class="countdown-separator">:</span>
<div class="countdown-item">
<span class="countdown-value" data-countdown="minutes">00</span>
<span class="countdown-unit">MIN</span>
</div>
<span class="countdown-separator">:</span>
<div class="countdown-item">
<span class="countdown-value" data-countdown="seconds">00</span>
<span class="countdown-unit">SEG</span>
</div>
</div>
<time class="estreia-date-literal">Dia 25 de Dezembro, 2026</time>
</div>
</div>
</section>

4. Camadas e Profundidade (Z-Index)
Camada Z-Index Conteúdo
Background Deep -2 Fundo preto (#000000) e

nebulosas.

Stars Layer -1 Power Stars distribuídas com
efeito de parallax sutil.
Content Layer 1 Textos, Contador e Data.
UI/Nav Layer 10 Controles de paginação e

setas.
5. Aplicação de Tokens (DESIGN.md)
● Cores: Background em --bg-deep. Texto principal em --text-primary. Destaques em
--accent-star.
● Tipografia: Título em --font-display com peso --fw-bold. Contador utilizando --font-display
com --tracking-tight.
● Espaçamento: Gap entre blocos principais utilizando --space-xl. Padding interno do
contador baseado em --space-lg.
● Efeitos: Borda do contador com --bg-surface e --radius-lg. Glow interno nos números em
--cosmic-cyan (conforme DESIGN.md).
6. Responsividade
● Desktop: Contador alinhado horizontalmente com separadores visíveis.
● Mobile (< 768px): Colapso do contador para 2 colunas e 2 linhas (Dias/Horas em cima,

Min/Seg embaixo) ou redução de escala para manter linha única sem overflow.
● Fontes: Uso obrigatório de clamp() para o título hero, conforme style.css.
7. Contrato JS
● Input: O script deve ler o atributo data-target-date no container pai.
● Output: Atualização via textContent nos spans identificados por data-countdown.
● Lógica de Transição: Valores devem ser atualizados a cada 1000ms.
8. Suposições e Ambiguidades
● Assume-se que as "Power Stars" possuem animação de flutuação independente (floating
motion).
● O brilho ciano na base dos números será implementado via text-shadow ou
pseudo-elemento ::after para simular o efeito do print.
● Os separadores ":" podem ser ocultados em resoluções mobile para economizar espaço
horizontal.
9. Checklist de Entrega
● [ ] Fundo escuro puro sem vazamento de luz nas bordas.
● [ ] Alinhamento central perfeito em todos os viewports.
● [ ] Tags semânticas aplicadas (header, time, h2).
● [ ] Tokens de cor e tipografia validados pelo DESIGN.md.
10. Critérios de Aceite
● O contador não deve apresentar "pulo" de layout (layout shift) quando os números
mudarem.
● A legibilidade deve ser mantida mesmo sobre as áreas mais claras das nebulosas do
fundo.
● O contraste entre o texto secundário (labels) e o fundo deve respeitar o limite de
acessibilidade definido para --text-muted.