import puppeteer, { Browser, Page } from 'puppeteer';

export const puppeteerAnalyzer = async (port: number): Promise<void> => {

  try {

    console.log('entered puppeteer');
    const browser: Browser = await puppeteer.launch({ headless: 'new' });
    const page: Page = await browser.newPage();

    console.log(port);

    let bool = true;
    while (bool) {
      try {
        await Promise.all([
          page.goto(`http://localhost:${port}`),
          page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        ]);
        bool = false;

      } catch (error) {
        if (error) await page.reload();
      }
    }

    console.log('navigated to port')

    // Perform Metrics Here
    //get entries returns an array of all performance API metrics    
    const getEntries = await page.evaluate(function (): string {
      return JSON.stringify(window.performance.getEntries());
    })
    console.log('entries stringified')
    //parsing the object provides the array
    const parseEntries: { [key: string]: unknown } = JSON.parse(getEntries);
    console.log('performance metrics on user app:', parseEntries);

    await browser.close();

  } catch (error) {

    console.error('error in puppeteer middleware handler');
    console.error(error);
    throw error;

  }
};

/* 

CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,  
  name NVARCHAR(255) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  password NVARCHAR(255) NOT NULL,
  CONSTRAINT userEmail UNIQUE (email)
);

*/
