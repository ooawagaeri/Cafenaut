import puppeteer from "puppeteer";
import { Injectable } from "@nestjs/common";
import { Analyser } from "./analyzer";

// Puppeteer configurations
const options = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

@Injectable()
export class ChatGptAnalyser extends Analyser {
  public constructor() {
    super();
  }

  async analyseContent(content: string | undefined): Promise<number> {
    if (content == undefined || content.length == 0) {
      return 0;
    }
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto("https://writer.com/ai-content-detector/");
    await page.type("textarea[class=ai_textbox]", content);
    await page.click("button[type=submit]");
    await page.evaluate(() => {
      const anchor: HTMLElement = document.querySelector('button[type="submit"]');
      anchor.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    const percentage = await page.evaluate(() => {
      const anchor = document.querySelector('span#ai-percentage');
      return anchor.textContent;
    });
    await browser.close();
    return Number(percentage) / 100;
  }
}
