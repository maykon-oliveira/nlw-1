<h1 align="center">
  <img alt="Ecoleta" title="#delicinha" src=".github/ecoleta.png" width="250px" />
  <br/>
  <img alt="Ecoleta" title="#delicinha" src=".github/logo.png" width="250px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/maykon-oliveira/nlw-1">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/maykon-oliveira/nlw-1">
  
  <a href="https://github.com/maykon-oliveira/nlw-1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/maykon-oliveira/nlw-1">
  </a>

  <a href="https://github.com/maykon-oliveira/nlw-1/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/maykon-oliveira/nlw-1">
  </a>

  <a href="https://github.com/maykon-oliveira/nlw-1/blob/master/LICENSE.md">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <a>
</p>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-backend">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-frontend">Frontend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-mobile">Mobile</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<br>

---

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [API do IBGE para consumo do endereço](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs-estadosGet)
- [Upload de imagens](react-dropzone)
- [Leaflet](https://leafletjs.com/examples/quick-start/)

## 💻 Projeto

Projeto desenvolvido durante a <strong>Next Level Week</strong> que tem como objetivo fins ecológicos.
O <strong>Ecoleta</strong> serve como um Marketplace, uma conexão entre empresas ou entidade que coletam resíduos, sejam eles orgânicos ou inorgânicos, à pessoas que precisam fazer descarte dos resíduos.

## 🌐 Frontend

<h1 align="center">
    <img alt="Ecoleta Front-end" title="#delicinha" src=".github/frontend.gif" />
</h1>

## 📱 Mobile

<h1 align="center">
    <img alt="Ecoleta Mobile" title="#delicinha" src=".github/mobile.gif" />
</h1>

## 🔥 Instalação

```bash
# Clone este repositório
$ git clone git@github.com:maykon-oliveira/nlw-1.git

# Navegue até a pasta server e execute os seguintes comandos:
$ yarn knex:migrate
$ yarn knex:seed
$ yarn start

# Depois disso, entre na pasta web e execute o comando:
$ yarn start

# E finalmente, entre na pasta mobile e execunte o comando:
$ expo start

# Observações:
- Não esqueça de mudar a baseURL no arquivo api.ts das pastas web e mobile para o ip da sua máquina
```

## 🧾 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com 💗 by [Maykon Oliveira](https://www.linkedin.com/in/maykon-oliveira/)
