# Google Search Email Scraper

This project scrapes emails from web pages found via **Google Custom Search API**. It automates the process of searching for websites, extracting emails, and saving them to a file.

## Features
✅ Fetches **100 search results** per request  
✅ Extracts emails from web pages  
✅ Saves emails to `emails.json`  
✅ Uses **Google Custom Search API** (instead of Puppeteer)  

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/google-email-scraper.git
   cd google-email-scraper
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root:
     ```
     GOOGLE_API_KEY=your-google-api-key
     GOOGLE_CX_ID=your-custom-search-engine-id
     ```
   - Get your API key & CX ID from **Google Custom Search**:  
     🔗 [https://developers.google.com/custom-search/v1/overview](https://developers.google.com/custom-search/v1/overview)

## Usage
Run the script:
```sh
node scraper.js
```

## Customization
Modify the search query in `scraper.js`:
```js
scrapeEmails('site:.com OR site:.org "nutrition" OR "diet" OR "email" "@gmail.com" OR "@yahoo.com" OR "@outlook.com"');
```

## Limitations
⚠ **Google API has a free limit of 100 queries/day**  
⚠ Email scraping is subject to **privacy laws & Google policies**  

## License
📜 MIT License
