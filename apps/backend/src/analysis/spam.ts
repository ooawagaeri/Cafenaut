import { Injectable } from "@nestjs/common";
import { Analyser } from "./analyzer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spamCheck = require('spam-detection');

@Injectable()
export class SpamAnalyser extends Analyser {

  public constructor() {
    super();
  }

  analyseContent(content: string | undefined): number {
    if (!content) {
      return 0;
    }
    return spamCheck.getResults(content)[1].value;
  }
}
