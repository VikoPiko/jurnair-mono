<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
### Idea
The idea from the project came from Airbnb. I wanted to combine the ease of online booking as well as a personal journal where the user can journal their own trips and upload photos of them, and user posts about vacations and recomendations they have.
Simply put combining the service aspect of Airbnb with the social aspect of platforms such as Instagram.
This inspired me to go for a Micro-Service architecture approach in development and led to the tech stack choice i have.

* Nx Monorepo as a "build framework" to track and manage many services with ease, whilst having them in a relational graph (Nx Graph).
* NestJS for services due to its easy integration and rich library support.
* NextJS for its SSR capabilities and rich tool-set since its React based. (Tools like I18Next, ShadCn components, Framer-Motion and others)
* RabbitMQ for a message broker across services - due to its faster and easier integration compared to Kafka.
* Docker/Docker-Compose for orchestrating services.

### Built With

Project is built using the following technologies:

* [![Next][Next.js]][Next-url]
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Nx](https://img.shields.io/badge/Nx-%233862AC.svg?style=for-the-badge&logo=Nx&logoColor=white)
* ![NestJS](https://img.shields.io/badge/nestjs-%F8FFE5.svg?style=for-the-badge&logo=nestjs&logoColor=white)
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

IMPORTANT:
This project is split between two repositories!
This is the repository responsible for services.
The front-end repository can be found and cloned at: https://github.com/VikoPiko/ui
The reason for this split are issues regarding the integration of ShadCN with Nx Monorepo as there is no official support for it as of today.
Due to my preference in working with ShadCN components during front-end development I've decided to split them across repositories.
All services have their own Dockerfiles which are orchestrated by the docker-compose.yaml at the root of the project

### Prerequisites

This project uses Nx. To install run:
* nx
  ```sh
  npm add --global nx
  ```
To run using Nx (root folder):
```sh
nx run-many -t serve-all
```

For issues with Nx Graph or Deamon try: 
```sh
nx reset
```
then run `nx run-many -t serve-all` command again

to change configuration or commands edit nx.json file. (needed when adding @nx/next:application -> from dev to serve:

```js
 {
      "plugin": "@nx/next/plugin",
      "options": {
        "startTargetName": "start",
        "buildTargetName": "build",
        "devTargetName": "dev",
        "serveStaticTargetName": "serve-static",
        "buildDepsTargetName": "build-deps",
        "watchDepsTargetName": "watch-deps"
      }
```
TO: 
```js
 {
      "plugin": "@nx/next/plugin",
      "options": {
        "startTargetName": "start",
        "buildTargetName": "build",
        "devTargetName": "serve",
        "serveStaticTargetName": "serve-static",
        "buildDepsTargetName": "build-deps",
        "watchDepsTargetName": "watch-deps"
      }
```

This way nx will run NextJs service on serve -all command.
  
* Docker
  Its possible to run this project with Docker as well. Simply run:
  ```sh
  docker compose up
  ```
  in the root folder of the project. where docker-compose.yml is located. for any changes such as RabbitMQ credentials, ports, etc.. open docker-compose.yml and change defaults.
  Default RabbitMQ config: username: guest; password: guest; RMQ maganer port - http://localhost:15672, RMQ port: http://localhost:5672

### Installation

1. Get a GoogleMaps API Key using Google services. (Needed for frontend Repo at: https://github.com/VikoPiko/ui )
2. Clone the repo
   ```sh
   git clone https://github.com/VikoPiko/jurnair-mono.git
   ```
3. Install NPM packages (services will each need their own npm install as well)
   ```sh
   npm install
   ```
   in root folder as well as apps/services/...
4. Generate OpenSSL public and private key pair for JWT signiture
   Install OpenSSL from: https://slproweb.com/products/Win32OpenSSL.html and add to path.
   To generate a private key:
   ```sh
   openssl genrsa -out private.key 3072
   ```
   minimum size is 2048!
   Then sign a public key using the private key:
   ```sh
    openssl rsa -in private.key -pubout -out public.key
   ```

   These files should be placed in /apps/services/auth-service
   Since they are supposed to be private, you can add the private.key to .gitignore.
   
5. In all services populate the .env files (using the templates from .env.sample or:
```js
DATABASE_URL="YourDatabaseProvider://USERNAME:PASSWORD@HOST:PORT/DB-NAME"
RABBITMQ_URLS="amqp://USERNAME:PASSWORD:HOST:PORT" #defaults are RABBITMQ_URLS = 'amqp://guest:guest@localhost:5672'
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Init Repositories
- [x] Scaffold basic communication between services
- [x] Add RMQ communication
- [x] Implement front-end UI
- [ ] Add Stripe for payment processing
- [ ] Add a WebSocket channel for messaging between users
- [ ] Unit and E2E tests
- [ ] Multi-language Support

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Viktor Pikolov - viktorpikolov@gmail.com

Project Link: [https://github.com/VikoPiko/jurnair-mono](https://github.com/VikoPiko/juranir-mono)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
