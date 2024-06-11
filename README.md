# Note Niche

Note Niche is a Notion clone for creating and sharing notes. It's a powerful, flexible, and user-friendly platform for managing your notes, ideas, and documents. 
<div align="center">
  <br />
      <img src="public/project-banner.png" alt="Project Banner"/>
  <br />
</div>

<div align="center">
   <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next Badge"/>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Badge"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node Badge"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript Badge"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS Badge"/>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge"/>
</div>


## Features

- Create, edit, and share notes
- Organize your notes in a structured way
- Collaborate with others on shared notes
- User authentication and management
- Dark and light themes

## Technologies Used

- [Next.js](https://nextjs.org/) - The React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [MongoDB](https://www.mongodb.com/) - Document database
- [Clerk](https://clerk.dev/) - User authentication and management
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [EdgeStore](https://edgestore.dev/) - Edge data storage

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Mlika-Gaith/notion-clone.git
   ```

2. Install NPM packages

```bash
npm install
   ```

3. Config your env variables see .env.example


```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

4. Start the dev server

```bash
npm run dev
```

5. App should be available at [http://localhost:3000/](http://localhost:3000/)