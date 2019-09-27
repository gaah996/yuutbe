# Teste Front-End: Yuutbe

O projeto foi desenvolvido utilizando a ferramenta CLI do Vue.js, o que significa que para executá-lo é preciso fazer algumas configurações e instalar as dependências necessárias com o NPM ou Yarn.
Este guia tem o objetivo de auxiliar na configuração do ambiente para poder executar o projeto em sua máquina local.

## 1 Configuração inicial

### 1.1 Instalando o Node.js

Para executar esse projeto será necessário ter instalado o Node.js. Você pode baixá-lo através do endereço https://nodejs.org/en/.

Também é possível instalar o Node utilizando um gerenciador de pacotes. Neste [link](https://nodejs.org/en/download/package-manager/) há o passo a passo da instalação para a grande maioria dos sistemas operacionais.

**Obs:** recomendo instalar ao menos a versão 10.16.3 do Node, pois essa foi a versão utilizada durante o desenvolvimento desse aplicativo.

### 1.2 Instalando o gerenciador de pacotes do Node.js

Para poder instalar todas as dependências necessárias do projeto o NPM ou Yarn também deverão estar disponíveis.

Para testar se uma versão do NPM está instalado abra uma janela do terminal e digite o seguinte comando:

```
npm -v
```

Caso a resposta seja a versão do seu NPM está tudo certo para você continuar, só pular para o próximo passo!

Caso precise instalá-lo, você pode fazer o download através do link https://www.npmjs.com/get-npm, ou através do seu gerenciador de pacotes.

**Obs:** caso opte por utilizar o Yarn como genrenciador de pacotes do Node.js, basta seguir o passo a passo disponível no link https://yarnpkg.com/lang/en/

## 2 Baixando e instalando o projeto

### 2.1 Clonando o repositório

Após a configuração inicial você poderá clonar esse repositório para a sua máquina e instalar as dependências necessárias para executá-lo.

### 2.2 Instalando as dependências

Depois de ter clonado o repositório, abra uma janela do seu terminal na pasta raiz do projeto e execute o comando:

```
npm install
```

### 2.3 Configurando suas variáveis de ambiente

Você precisará configurar as suas variáveis de ambiente para poder executar as chamadas à API do Youtube.

Para fazer essa configuração a primeira coisa a se fazer é duplicar o arquivo .env.local.example e renomear a cópia para .env.example

Dentro desse arquivo ficará localizada a sua API_KEY do Google Console para poder acessar a API do Youtube.

**Obs:** caso ainda não possua uma API_KEY basta acessar o [Google Console](https://developers.google.com/youtube/v3/getting-started?hl=pt-br) e gerar a sua chave.

## 3 Executando em modo de desenvolvimento

Depois que tudo já estiver instalado e o ambiente estiver configurado use o comando para iniciar o servidor:

```
npm run serve
```

Após o servidor ter iniciado ele informará qual o endereço que você deverá usar para acessar o projeto pelo seu navegador.

**Obs:** além do localhost um outro endereço estará disponível. Esse endereço poderá ser usado por outras pessoas conectadas à mesma rede para acessar o projeto nos dispositivos deles.
