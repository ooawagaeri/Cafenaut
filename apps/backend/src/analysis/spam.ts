import { Injectable } from "@nestjs/common";
import { Analyser } from "./analyzer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spamCheck = require('spam-detection');

@Injectable()
export class SpamAnalyser extends Analyser {

  public constructor() {
    super();
  }

  async analyseContent(content: string | undefined): Promise<number> {
    if (content == undefined || content.length == 0) {
      return 0;
    }
    return Math.round(spamCheck.getResults(content)[1].value * 100) / 100;
  }
}
