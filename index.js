require("dotenv").config();
const fetch = global.fetch;  // Ensure you have node-fetch installed
const fs = require("fs");

const API_KEY = process.env.GOOGLE_API_KEY; // Your Google API Key
const CX = process.env.GOOGLE_CX_ID; // Your Google CSE ID

async function searchGoogle(query, start = 1) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}&start=${start}`;

    try {
        console.log(`Fetching search results from Google (start=${start})...`);
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            return data.items.map(item => item.link);
        } else {
            console.log("No more search results from Google.");
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
    return [];
}

async function extractEmailsFromPage(url) {
    try {
        console.log(`Extracting emails from: ${url}`);
        const response = await fetch(url, { timeout: 10000 });
        if (!response.ok) return [];

        const html = await response.text();
        const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);

        return emails ? [...new Set(emails)] : [];
    } catch (error) {
        console.log(`Skipping ${url}:`, error.message);
        return [];
    }
}

async function scrapeEmails(query) {
    let allEmails = new Set();
    let start = 1;

    while (true) {
        const urls = await searchGoogle(query, start);
        if (urls.length === 0) break; // Stop if no more results

        for (const url of urls) {
            const emails = await extractEmailsFromPage(url);
            emails.forEach(email => allEmails.add(email));
        }

        console.log(`Total unique emails collected so far: ${allEmails.size}`);

        start += 10; // Move to next page of search results
        await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay to prevent getting blocked
    }

    fs.writeFileSync("emails.json", JSON.stringify([...allEmails], null, 2));
    console.log(`Scraping complete! Total emails collected: ${allEmails.size}`);
}

// Start scraping
scrapeEmails('site:.com OR site:.org "nutrition" OR "diet" OR "healthy eating" "contact us" OR "about us" OR "email" "@gmail.com" OR "@yahoo.com" OR "@outlook.com" "USA"');
