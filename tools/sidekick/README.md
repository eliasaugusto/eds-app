# Sidekick Library Setup

Este diretorio registra os itens exibidos na Library do DA/Sidekick.

## Arquivos

- `tools/sidekick/library.html`: bootstrap da UI da library.
- `tools/sidekick/library.json`: lista dos itens do plugin `blocks`.
- `tools/sidekick/blocks/product-grid.html`: conteudo de exemplo usado para preview/copy.

## Como ativar no projeto

1. Publicar os arquivos em `/tools/sidekick/**`.
2. Garantir que o plugin `library` do sidekick esteja configurado para `url: /tools/sidekick/library.html`.
3. Reabrir o DA e acessar a Library.

## Observacoes

- A lista da Library nao e descoberta automaticamente pela pasta `blocks/`.
- Novos blocos precisam de entrada em `library.json` e uma pagina de exemplo em `tools/sidekick/blocks/`.
