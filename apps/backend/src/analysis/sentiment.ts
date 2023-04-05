import Sentiment from "sentiment";
import { Analyser } from "./analyzer";

// Manual defined values for café specific words
const options = {
  extras: {
    "noisy": -1,
    "mediocre": -1,
    "stale ": -2,
    "dry": -1,
    "splatter": -1,
    "beautiful": 1,
    "10/10": 1,
  }
}

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
    return Math.round(result.comparative * 100) / 100;
  }
}
