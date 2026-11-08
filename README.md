# Ale Ferraz — site novo ("Saúde em Movimento")

Reformulação do site do personal trainer Ale Ferraz. Sai o tom de alta
performance; entra um posicionamento misto de saúde: reabilitação e dor,
longevidade 60+, emagrecimento saudável e gestantes.

## Como abrir

É um site estático. Abra `index.html` no navegador ou sirva a pasta:

    python -m http.server 8767

## Estrutura

    index.html        página única com 10 seções
    css/tokens.css    cores, fontes, raios e escala de texto (A / A+ / A++)
    css/style.css     estilos
    js/main.js        barra, menu, tamanho de texto, seletor de público,
                      contadores, anéis, tilt do retrato, revelar ao rolar
    images/           WebP otimizados + og.jpg (compartilhamento)
    proposta/         proposta de identidade visual (versão 1, 08/11/2026)

## Regras de design que valem para toda alteração

- Nenhum elemento é posicionado por cima de fotos (nada de etiquetas sobre rostos).
- Sem ícone ou logotipo: a marca é o nome "Ale Ferraz" em texto.
- Corpo de texto 18px, contraste AAA, botões com no mínimo 46px de altura.
- Nada pisca ou pulsa; todas as animações respeitam "reduzir movimento".
- O site nunca usa a palavra "fisioterapia" como serviço (CREF, não CREFITO).
  Usa "treino de reabilitação" e "em parceria com o seu fisioterapeuta".

## Pendências (dependem do Ale)

- Cidade e academia para SEO local e seção de contato.
- Fotos de alunos 60+ e de exercícios de reabilitação.
- Depoimento de aluno 60+ ou em reabilitação.
- Confirmar valores dos planos e se devem ficar visíveis.
