## Setup

### Prerequisites

Before starting, ensure that you have Node.js and npm installed on your machine.

### Installation

1. **Install Dependencies**

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

2. **Environment Setup**

   - Copy the `.env.exemple` file:
     ```bash
     cp .env.exemple .env
     ```
   - Edit the new `.env` file with your environment-specific configuration.

### Usage

> Note: The examples below use pnpm.

- **pnpm test**  
  Runs unit tests with Jest while collecting test coverage statistics.  
  _Status: Work in progress._

- **pnpm dev**  
  Launches the application in development mode using nodemon.  
  Automatically restarts the server when file changes are detected.  
  Executes the compiled JavaScript located at `dist/index.js`.

- **pnpm build**  
  Compiles TypeScript source code into JavaScript using the TypeScript compiler.

- **pnpm lint**  
  Analyzes the codebase with ESLint to identify and report on potential issues.

- **pnpm prettier**  
  Formats the entire codebase with Prettier, rewriting files to adhere to the specified formatting rules.

- **pnpm prettier-check**  
  Checks if the codebase conforms to Prettier formatting rules without modifying any files.
