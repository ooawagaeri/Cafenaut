import Sentiment from "sentiment";
import { Injectable } from "@nestjs/common";
import { ReviewModel } from "../review.interface";

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
export class SentimentAnalyser {
  private sentiment: Sentiment;

  public constructor() {
    this.sentiment = new Sentiment()
  }

  private analyseContent(content: string | undefined): number {
    if (!content) {
      return 0;
    }
    const result = this.sentiment.analyze(content, options);
    return result.score;
  }

  /**
   * Analyses post text contents for sentiment score.
   *
   * @param post Review posted
   * @return Average of all aspects' sentiment score.
   */
  public analysePost(post: ReviewModel): number {
    const scores: number[] = [];
    scores.push(this.analyseContent(post.title));
    scores.push(this.analyseContent(post.body));
    scores.push(this.analyseContent(post.aspects.coffee.free_text))
    scores.push(this.analyseContent(post.aspects.tea.free_text))
    scores.push(this.analyseContent(post.aspects.ambience.free_text))
    scores.push(this.analyseContent(post.aspects.price.free_text))
    scores.push(this.analyseContent(post.aspects.work_friendly.free_text))
    scores.push(this.analyseContent(post.aspects.cuisine.free_text))
    scores.push(this.analyseContent(post.aspects.speciality.free_text))
    scores.push(this.analyseContent(post.aspects.amenities.free_text))
    scores.push(this.analyseContent(post.aspects.pet.free_text))

    const filteredScores = scores.filter(item => item !== 0);
    const sumScores = filteredScores.reduce((a, b) => a + b);
    return sumScores / filteredScores.length;
  }
}
