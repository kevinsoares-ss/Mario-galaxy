# Especificação: Animação do Contador

## 1. Objetivo

Criar um componente de contador regressivo em HTML, CSS e JavaScript que atualize os valores a cada segundo e faça a cascata de atualização de segundos → minutos → horas → dias.

## 2. Comportamento esperado

- O elemento de segundos incrementa de 1 em 1 a cada segundo.
- Quando os segundos chegam a `59` e passam para `00`, o valor de minutos aumenta em `1`.
- Quando os minutos chegam a `59` e passam para `00`, o valor de horas aumenta em `1`.
- Quando as horas chegam a `23` e passam para `00`, o valor de dias aumenta em `1`.
- O contador mantém o formato fixo de 2 dígitos para todas as unidades (exceto dias, que pode usar 2 ou mais dígitos se necessário).
- Quando o tempo alvo é alcançado ou ultrapassado, o contador deve mostrar `00:00:00:00` ou outro estado final definido, sem valores negativos.

## 3. Estrutura HTML proposta

O componente deve ser semântico e fácil de mapear pelo JavaScript.

```html
<section id="contador" class="contador-section">
  <div class="contador-wrapper" data-target-date="2026-12-25T00:00:00">
    <div class="contador-item">
      <span class="contador-value" data-countdown="days">00</span>
      <span class="contador-label">DIAS</span>
    </div>
    <span class="contador-separator">:</span>
    <div class="contador-item">
      <span class="contador-value" data-countdown="hours">00</span>
      <span class="contador-label">HORAS</span>
    </div>
    <span class="contador-separator">:</span>
    <div class="contador-item">
      <span class="contador-value" data-countdown="minutes">00</span>
      <span class="contador-label">MIN</span>
    </div>
    <span class="contador-separator">:</span>
    <div class="contador-item">
      <span class="contador-value" data-countdown="seconds">00</span>
      <span class="contador-label">SEG</span>
    </div>
  </div>
</section>
```

## 4. Classes e atributos

- `.contador-section` - wrapper da seção.
- `.contador-wrapper` - container do bloco central do contador.
- `.contador-item` - grupo de unidade de tempo.
- `.contador-value` - número que atualiza a cada segundo.
- `.contador-label` - texto da unidade.
- `.contador-separator` - separador `:` entre grupos.
- `data-target-date` - data e hora alvo em formato ISO.
- `data-countdown="days|hours|minutes|seconds"` - identifica cada valor para o script.

## 5. Animação visual

- A cada atualização de valor, aplicar um efeito curto de transição ou animação suave no número.
- Exemplo de efeito: `transform: translateY(-10%)` + `opacity` durante 100–200ms.
- Deve haver um `min-width` fixo para os valores para evitar shift de layout durante a mudança dos números.
- Em `prefers-reduced-motion`, reduzir a animação para transição discreta ou removê-la.

## 6. CSS recomendado

- Fundo escuro ou semitransparente para destacar os números.
- Texto do valor em fonte display, alto contraste e espaçamento consistente.
- Labels menores em `--text-sm` e com `color: var(--text-muted)`.
- Separador `:` com opacidade reduzida e espaçamento consistente.
- Usar tokens de design do projeto sempre que possível:
  - `--bg-deep`, `--bg-surface`
  - `--text-primary`, `--text-muted`
  - `--font-display`, `--fw-bold`, `--tracking-tight`
  - `--radius-lg`, `--space-6`, `--space-8`

## 7. Contrato JavaScript

### Entrada

- Ler `data-target-date` do container `.contador-wrapper`.
- Localizar os elementos de valor usando `querySelector('[data-countdown="..."']`).

### Saída

- Atualizar `textContent` de:
  - `data-countdown="seconds"`
  - `data-countdown="minutes"`
  - `data-countdown="hours"`
  - `data-countdown="days"`

### Lógica de contagem

- Calcular a diferença entre `targetDate` e `Date.now()` em milissegundos.
- Converter para dias, horas, minutos e segundos.
- Atualizar valores a cada 1000ms.
- Usar cálculo baseado em tempo absoluto para evitar drift causado por `setInterval`.
- Não atualizar o DOM se o valor não mudou.
- Recalcular todas as unidades a cada tick e disparar animação apenas para as unidades alteradas.

## 8. Fluxo de animação de valores

1. Calcular segundos restantes.
2. Atualizar `seconds` a cada segundo.
3. Quando `seconds === 0` e houver rollover, atualizar `minutes`.
4. Quando `minutes === 0` e houver rollover, atualizar `hours`.
5. Quando `hours === 0` e houver rollover, atualizar `days`.
6. Se o tempo alvo for alcançado:
   - definir todos os campos como `00`
   - parar o timer

## 9. Acessibilidade

- O wrapper pode usar `aria-live="polite"` para anunciar mudanças sem spam.
- O `time` pode ser incluído com `datetime` atualizando conforme a contagem regressiva.
- Garantir contraste e legibilidade dos valores.
- O texto alternativo não é necessário nos valores, pois são puramente informativos.

## 10. Performance

- Usar um único `setInterval` ou `requestAnimationFrame` com cálculo absoluto.
- Evitar reflows criando layout fixo para os valores.
- Respeitar `prefers-reduced-motion`.
- Evitar criar novos nós a cada tick.

## 11. Critérios de aceitação

- [ ] O `segundos` atualiza a cada segundo, de 1 em 1.
- [ ] O `minutos` só muda quando segundos rolam de `59` para `00`.
- [ ] As `horas` só mudam quando minutos rolam de `59` para `00`.
- [ ] Os `dias` só mudam quando horas rolam de `23` para `00`.
- [ ] O layout não sofre deslocamento visível ao mudar os dígitos.
- [ ] O efeito visual de atualização é suave e não desconcentra.
- [ ] Em `prefers-reduced-motion`, não há animação excessiva.

## 12. Exemplo de implementação mínima do JS

```js
const container = document.querySelector(".contador-wrapper");
const targetDate = new Date(container.dataset.targetDate);
const elems = {
  days: container.querySelector('[data-countdown="days"]'),
  hours: container.querySelector('[data-countdown="hours"]'),
  minutes: container.querySelector('[data-countdown="minutes"]'),
  seconds: container.querySelector('[data-countdown="seconds"]'),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(targetDate - now, 0);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);

  elems.days.textContent = pad(days);
  elems.hours.textContent = pad(hours);
  elems.minutes.textContent = pad(minutes);
  elems.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
```

---

Esse arquivo está pronto para ser usado como guia de implementação. Se quiser, posso também criar a versão com o código completo e a integração no `index.html`.
