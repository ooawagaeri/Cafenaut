import { ReviewModel } from "../review/review.interface";

export abstract class Analyser {
  abstract analyseContent(content: string | undefined): number;

  /**
   * Analyses post text contents.
   *
   * @param post Review posted
   * @return Average of all aspects' score.
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
