import puppeteer from "puppeteer";
import { Analyser } from "./analyzer";
import { ReviewModel } from "../review/review.interface";

// Puppeteer configurations
const options = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

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
    await page.evaluate(() => {
      const anchor: HTMLElement = document.querySelector('button[type="submit"]');
      anchor.click();
    });

    let percentage = "";
    while (percentage == "") {
      await new Promise(r => setTimeout(r, 750));
      percentage = await page.evaluate(() => {
        const anchor = document.querySelector('span#ai-percentage');
        return anchor.textContent;
      });
    }
    await browser.close();
    return (100 - Number(percentage)) / 100;
  }

  public override async analysePost(post: ReviewModel): Promise<number> {
    const content_arr = [post.title, post.body, post.aspects.coffee.free_text,
      post.aspects.tea.free_text, post.aspects.ambience.free_text,
      post.aspects.price.free_text, post.aspects.work_friendly.free_text,
      post.aspects.cuisine.free_text, post.aspects.speciality.free_text,
      post.aspects.amenities.free_text, post.aspects.pet.free_text
    ];
    const content = content_arr.join(". ");
    return await this.analyseContent(content);
  }
}
