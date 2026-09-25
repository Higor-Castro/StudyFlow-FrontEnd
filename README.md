# StudyFlow - Front-End



O **StudyFlow** é uma aplicação web em desenvolvimento para auxiliar estudantes na organização e gerenciamento de suas rotinas de estudos.



A proposta do projeto é oferecer uma plataforma simples e visual para organizar disciplinas, tarefas, trabalhos, provas e prazos, utilizando uma abordagem inspirada em ferramentas de gerenciamento de tarefas.



## 🎯 Objetivo



O objetivo do StudyFlow é proporcionar aos estudantes uma ferramenta que facilite a organização de suas atividades acadêmicas, permitindo acompanhar tarefas, prazos e o progresso das atividades de forma centralizada e intuitiva.


## 🛠️ Stack Tecnológica



### Front-end



- React - Version: 19.2.8
 
- Vite - Version: 8.2.0
 
- React Router DOM - Version: 7.18.2
 
- Axios - Version: 1.19.0
 
- React Icons - Version: 5.7.0

- JavaScript

- HTML5

- CSS3



### Ferramentas



- Git

- GitHub

- GitHub Projects

- NPM

- ESLint 



## 🏗️ Arquitetura



O projeto utiliza uma arquitetura com **Front-end e Back-end separados**, comunicando-se por meio de uma **API REST**.



Este repositório é responsável exclusivamente pelo desenvolvimento do **Front-end**, enquanto o Back-end será mantido em um repositório separado.



### Organização de Pastas


O projeto segue uma estrutura organizada por responsabilidades:

- hooks : hooks customizados, como o useApi, responsável por centralizar as requisições à API REST do Back-end (via Axios), incluindo o envio automático do token JWT e o tratamento de sessão expirada.

- pages : páginas da aplicação, organizadas por funcionalidade (login, cadastro, autenticação em duas etapas, recuperação de senha, perfil, termos de consentimento).

- routes : configuração das rotas da aplicação (AppRoutes) e proteção de rotas privadas (PrivateRoute), que valida o token JWT antes de liberar o acesso.

- utils : funções utilitárias, como o gerenciamento do token JWT no sessionStorage (auth.js).



## 🚀 Deploy

- Vercel : Deploy e hospedagem do Front-end



[Back-end do projeto](https://github.com/Higor-Castro/StudyFlow-backEnd)

## Desenvolvedores
 - Higor de Castro Venancio da Silva
 - João Vitor Rodrigues

