import { ReviewModel } from "../review/review.interface";

export abstract class Analyser {
  abstract analyseContent(content: string | undefined): Promise<number>;

  /**
   * Analyses post text contents.
   *
   * @param post Review posted
   * @return Average of all aspects' score.
   */
  public async analysePost(post: ReviewModel): Promise<number> {
    const scores: number[] = [];
    scores.push(await this.analyseContent(post.title));
    scores.push(await this.analyseContent(post.body));
    scores.push(await this.analyseContent(post.aspects.coffee.free_text))
    scores.push(await this.analyseContent(post.aspects.tea.free_text))
    scores.push(await this.analyseContent(post.aspects.ambience.free_text))
    scores.push(await this.analyseContent(post.aspects.price.free_text))
    scores.push(await this.analyseContent(post.aspects.work_friendly.free_text))
    scores.push(await this.analyseContent(post.aspects.cuisine.free_text))
    scores.push(await this.analyseContent(post.aspects.speciality.free_text))
    scores.push(await this.analyseContent(post.aspects.amenities.free_text))
    scores.push(await this.analyseContent(post.aspects.pet.free_text))

    const filteredScores = scores.filter(item => item !== 0);
    if (filteredScores.length == 0) {
      return 0;
    }
    const sumScores = filteredScores.reduce((a, b) => a + b);
    return sumScores / filteredScores.length;
  }
}
