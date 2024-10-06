# 🌊 Wave Function Collapse (WFC) Algorithm

O algoritmo **Wave Function Collapse (WFC)** é uma abordagem fascinante e poderosa para a geração procedural de conteúdos, inspirado na física quântica! O algoritmo original, desenvolvido por [Maxim Gumin](https://github.com/mxgmn/WaveFunctionCollapse) e oferece uma maneira simples e elegante de criar mundos únicos e consistentes através de um sistema de regras. Aqui trago uma implementação do WFC em JavaScript, com uma interface interativa para explorar o algoritmo em ação!

![Wave Function Collapse Example](https://i.imgur.com/wCBdtpt.png)

## 🔍 O que é o WFC?

O WFC começa com um grid vazio, onde cada quadrado pode assumir diversas possibilidades. Ao "observar" um quadrado, ele colapsa para um estado específico, e as possibilidades dos quadrados vizinhos são restringidas conforme regras definidas. Este processo continua até que todo o grid esteja preenchido de forma consistente.

### Como Funciona?

1. **Entropia**: O algoritmo utiliza o conceito de entropia da teoria da informação para decidir qual célula colapsar primeiro. Células com menor entropia (menos possibilidades) são colapsadas primeiro.
2. **Propagação de Restrições**: Cada célula colapsada impõe limites nas células vizinhas, reduzindo suas possibilidades, até que todas as células sejam preenchidas.

## 🚀 Casos de Uso

- **Geração de Mapas em Jogos** 🎮: Crie ambientes únicos e consistentes para jogos. Por exemplo, o jogo *Townscaper* usa conceitos semelhantes para gerar cidades encantadoras de forma procedural.
- **Geração de Texturas** 🎨: Produza texturas repetitivas e sem emendas para terrenos de jogos ou fundos de sites.
- **Criação de Puzzles** 🧩: Gere puzzles que respeitam regras específicas, garantindo que as peças sejam compatíveis e tenham uma solução lógica.

## 🌟 Experimente o Projeto!

👉 Confira a **[Live Preview do Projeto](https://chicogborba.github.io/WaveFunctionCollapseJS/)** para interagir e ver o WFC em ação! Clique em qualquer quadrado para iniciar.

## 📚 Recursos Adicionais

- **[Implementação do WFC no GitHub](https://github.com/mxgmn/WaveFunctionCollapse)**: Confira o repositório original do Maxim Gumin para mais detalhes e exemplos sobre o funcionamento do algoritmo.
- **Teoria da Informação**: Para aprofundar-se na teoria da informação, recomendo o livro *Information Theory, Inference, and Learning Algorithms* de David MacKay, disponível gratuitamente [aqui](https://www.inference.org.uk/mackay/itila/).

## 📧 Contato

Para mais informações sobre o projeto ou para discutir ideias, sinta-se à vontade para entrar em contato comigo: **chicogborba@gmail.com**.

---

© 2024 - Exemplo de algoritmo de Wave Function Collapse por Francisco Borba
