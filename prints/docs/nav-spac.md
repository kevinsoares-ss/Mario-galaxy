*Suposição:* O "SMG" funciona como um link "Voltar ao topo" ou para a seção Hero inicial. Os demais apontam para IDs correspondentes na página.

## 3. Estados Visuais

* **Oculto (Scroll < Threshold):**
* `opacity: 0`
* `transform: translateY(-100%)`
* `pointer-events: none`
* `aria-hidden="true"`


* **Visível (Scroll >= Threshold):**
* Classe ativa: `.nav-floating--visible`
* `opacity: 1`
* `transform: translateY(0)`
* `pointer-events: all`
* `aria-hidden="false"`



## 4. Estilos por Bloco (Mapeamento de Tokens)

Baseado no `DESIGN.md` (Super Mario Galaxy Theme):

| Elemento | Propriedade | Token / Valor |
| --- | --- | --- |
| **Container (`inner`)** | Background | `var(--bg-surface)` com opacidade 0.8 |
|  | Backdrop Blur | `blur(10px)` (Efeito vidro cósmico) |
|  | Border | `1px solid rgba(245, 240, 232, 0.1)` (Starlight Muted) |
|  | Border Radius | `32px` (Pill format) |
|  | Shadow | `var(--shadow-md)` |
| **Links** | Typography | `var(--font-sans)`, `var(--text-xs)` |
|  | Cor | `var(--text-muted)` |
|  | Hover/Active | `var(--accent-star)` |
|  | FontWeight | `var(--fw-medium)` |
| **Motion** | Transition | `var(--dur-medium) var(--ease-out-expo)` |

## 5. Comportamento JS

* **Threshold dinâmico:** - O gatilho de visibilidade deve ser calculado como: `altura do #hero * 0.6`.
* **Fallback:** Caso o elemento `#hero` não seja encontrado no DOM, o threshold padrão será `400px`.


* **Otimização:** Utilizar um `Event Listener` de scroll com `throttle` ou `IntersectionObserver` para evitar excesso de repaints.

## 6. Responsividade e Foco

* **Mobile:** Em telas menores que `768px`, a nav flutuante deve se adaptar para uma largura de quase 100% da viewport (com margens laterais) ou converter-se em um menu de tabulação inferior, mantendo o contraste.
* **Acessibilidade:**
* `focus-visible`: Aplicar outline em `var(--accent-star)` para navegação via teclado.
* Links devem ter estados `:hover` e `:active` claramente definidos pelo brilho do token `Power Star`.



## 7. Checklist de Implementação

* [ ] Verificar se a classe `.nav-floating--visible` é removida ao voltar para o topo.
* [ ] Validar se o `z-index` posiciona a nav acima de todos os elementos de seção, exceto modais.
* [ ] Confirmar se o efeito `backdrop-filter` não causa degradação de performance em navegadores móveis.
* [ ] Testar a suavidade da transição de opacidade e movimento.

## 8. Critérios de Aceitação Visuais

* A barra não deve usar `#FFFFFF` puro (seguir `Starlight Primary`).
* O arredondamento das bordas deve seguir o estilo de "cápsula" (pill-shape) presente nos sistemas modernos.
* O efeito de vidro deve permitir ver as cores cósmicas do fundo enquanto o usuário rola a página.
"""

