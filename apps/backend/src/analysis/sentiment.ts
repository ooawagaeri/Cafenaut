import Sentiment from "sentiment";
import { Injectable } from "@nestjs/common";
import { Analyser } from "./analyzer";

// Manual defined values for café specific words
const options = {
  extras: {
    "noisy": -2,
    "mediocre": -1,
    "stale ": -2,
    "dry": -1,
    "splatter": -1,
  }
}

@Injectable()
export class SentimentAnalyser extends Analyser {
  private sentiment: Sentiment;

  public constructor() {
    super();
    this.sentiment = new Sentiment()
  }

  async analyseContent(content: string | undefined): Promise<number> {
    if (content == undefined || content.length == 0) {
      return 0;
    }
    const result = this.sentiment.analyze(content, options);
    return result.score;
  }
}
