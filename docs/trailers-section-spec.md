# Especificação Técnica: Seção Trailers (Cinema Cósmico)

Este documento detalha a implementação da seção de trailers, consolidando o mapeamento visual do print `desktop-print-trailers.png` e as diretrizes de design do `DESIGN.md`.

---

## 1. Objetivo

Proporcionar uma experiência cinematográfica imersiva para visualização dos materiais em vídeo do projeto, utilizando um componente de carrossel centralizado que reforça a profundidade do universo através de camadas de texto e brilho.

## 2. Inventário Visual (Contrato Estrito)

Com base no mapeamento visual, os únicos elementos permitidos são:

### Cabeçalho de Introdução

* **Eyebrow:** "ASSISTA AGORA".
* **Título Principal:** "Trailers oficiais".
* **Subtítulo:** "CLIPES DA AVENTURA NO ESPAÇO".

### Camada de Fundo (Background)

* **Marca d'água:** Texto "TRAILERS" em escala monumental, baixa opacidade, posicionado atrás do player à direita.
* **Atmosfera:** Gradientes radiais nas cores cósmicas (Purple/Cyan) para criar profundidade.

### Componente de Vídeo (Player Central)

* **Moldura:** Bordas arredondadas com gradiente linear fino.
* **Thumbnail:** Imagem de pré-visualização do vídeo.
* **UI do Player:** Título do vídeo, botões de Play, Link e o botão pílula "Assistir no YouTube".

### Navegação (Footer da Seção)

* **Controles:** Setas direcionais (esquerda/direita) em molduras circulares.
* **Indicadores de posição (Dots):** 4 pontos, onde o estado ativo é indicado por destaque visual.

---

## 3. Estrutura HTML (Árvore de Elementos)

```html
<section id="trailers" class="trailers">
  <div class="trailers__bg-text" aria-hidden="true">TRAILERS</div>

  <header class="trailers__header">
    <span class="trailers__eyebrow">ASSISTA AGORA</span>
    <h2 class="trailers__title">Trailers oficiais</h2>
    <p class="trailers__subtitle">CLIPES DA AVENTURA NO ESPAÇO</p>
  </header>

  <div class="trailers__carousel">
    <article class="trailers__player-container">
      <div class="trailers__video-wrapper">
        <iframe 
          src="[TRAILER_URL_1]" 
          title="The Super Mario Bros. Movie | Official Trailer" 
          loading="lazy">
        </iframe>
        <div class="trailers__player-ui">
          <button class="trailers__play-btn" aria-label="Play"></button>
          <div class="trailers__player-footer">
            <button class="trailers__link-btn" aria-label="Copiar Link"></button>
            <a href="[TRAILER_URL_1]" class="trailers__yt-btn">Assistir no YouTube</a>
          </div>
        </div>
      </div>
    </article>

    <nav class="trailers__nav" aria-label="Navegação de trailers">
      <button class="trailers__nav-prev" aria-label="Trailer anterior"></button>
      <div class="trailers__dots">
        <span class="trailers__dot"></span>
        <span class="trailers__dot trailers__dot--active"></span>
        <span class="trailers__dot"></span>
        <span class="trailers__dot"></span>
      </div>
      <button class="trailers__nav-next" aria-label="Próximo trailer"></button>
    </nav>
  </div>
</section>

```

---

## 4. Camadas Visuais

1. **Camada 0 (Fundo):** `--bg-deep` com gradientes radiais em `--cosmic-purple` e `--cosmic-cyan`.
2. **Camada 1 (Decorativa):** Texto "TRAILERS" com opacidade reduzida e `z-index` inferior ao conteúdo.
3. **Camada 2 (Conteúdo):** Textos, Player e Controles de navegação.

## 5. Tokens Relacionados (`DESIGN.md`)

* **Tipografia:** Heading em `--font-display`, Subtítulo e Eyebrow em `--font-sans`.
* **Cores de Texto:** Título em `--text-primary`, Subtítulo em `--text-muted`, Eyebrow em `--accent-star`.
* **Easing:** Transições de hover nos botões e dots usando `--ease-out-expo`.
* **Bordas:** `border-radius` do player seguindo a escala de arredondamento do sistema.

## 6. Estados Visíveis

* **Dot Ativo:** Cor diferenciada (Ciano) e brilho sutil.
* **Dot Inativo:** Opacidade reduzida (Starlight Muted).
* **Hover (Suposição):** Aumento sutil de escala no player e mudança de opacidade nas setas de navegação.

## 7. Responsividade

* **Desktop:** Player centralizado com largura aproximada de 60-70% da viewport.
* **Mobile (< 768px):** Player expande para ocupar 90-95% da largura. O texto de fundo "TRAILERS" deve ser ocultado ou reduzido para evitar poluição visual.

## 8. Suposições a Confirmar

* **Marca d'água:** Documentada como decorativa (aria-hidden="true").
* **Carrossel:** Assume-se comportamento de scroll horizontal infinito ou "snap" centrado.

## 9. Checklist de Implementação

* [ ] Centralização absoluta do player e textos.
* [ ] Implementação da borda gradiente no container do vídeo.
* [ ] Texto de fundo "TRAILERS" posicionado corretamente à direita.
* [ ] Verificação do contraste do subtítulo sobre o fundo escuro.

## 10. Critérios de Aceitação (Anti-regressão)

* [ ] O segundo ponto (dot) da navegação deve nascer como o estado ativo.
* [ ] A marca d'água "TRAILERS" não deve interferir na legibilidade do player.
* [ ] O player deve respeitar o aspecto de tela cinematográfico (16:9).
* [ ] Não há CTAs ou botões externos além do "Assistir no YouTube" e controles de vídeo.