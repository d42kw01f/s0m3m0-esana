A TypeScript-based news scraper that fetches news data from the Helakuru Esana platform and saves it as JSON files. This project is organized for modularity, with functions separated into different files for easy maintenance and scalability.

## Features

- Fetches individual news articles from specified URLs.
- Saves news data in JSON format in a dedicated directory.
- Uses environment variables to secure sensitive API credentials.

## Project Structure

```
s0m3m0-esana/
├── src/
│   ├── index.ts           # Main entry file
│   ├── fetchNews.ts       # Fetches a single news article and saves it as JSON
├── news_data/             # Directory where fetched news data is saved as JSON
├── .env                   # Environment variables (not included in version control)
├── .gitignore             # Ignores node_modules, .env, and other unnecessary files
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project overview and instructions
```

## Prerequisites

- **Node.js** and **npm** installed
- **TypeScript** installed globally or locally in the project

## Setup

1. **Clone the repository**:

   ```bash
   git clone git@github.com:your-username/s0m3m0-esana.git
   cd s0m3m0-esana
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   API_KEY=your_api_key
   PRO_STATUS=basic
   IID=your_iid
   UID=your_uid
   LAN=si
   IID_TOKEN=
   PKG=lk.bhasha.helakuru
   PLATFORM=1
   VER=1363
   USER_AGENT=okhttp/4.12.0
   ```

   Replace `your_api_key`, `your_iid`, and `your_uid` with actual values.

## Usage

1. **Compile TypeScript Files**:

   ```bash
   npx tsc
   ```

2. **Run the Project**:

   To start fetching and saving news articles, run the following command:

   ```bash
   node dist/src/index.js
   ```

   Alternatively, if you have `ts-node` installed, you can run it directly:

   ```bash
   npx ts-node src/index.ts
   ```

## Customization

- **Adding More URLs**: In `src/index.ts`, you can add more URLs to the `urls` array to fetch multiple articles.

- **Changing Output Directory**: The default directory for JSON files is `news_data`. You can modify this in `fetchNews.ts`.

