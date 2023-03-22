import Classifier from 'ml-classify-text';
import * as fs from 'fs';

export class CustomClassifier {
  private classifier: Classifier;
  private readonly filename: string;

  constructor(filename: string) {
    this.filename = filename;
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.error(`Resetting ${filename} model`);
        // Empty classifier
        this.classifier = new Classifier({
          nGramMin: 1,
          nGramMax: 2
        })
      } else {
        // Populate with previous data
        const model = JSON.parse(data.toString());
        this.classifier = new Classifier(model)
      }
    });
  }

  trainClassifier(text: string | string[], label: string): void {
    console.log(text, label);
    this.classifier.train(text, label);
  }

  predictClassifier(text: string): string | undefined {
    const predictions = this.classifier.predict(text);
    if (predictions.length) {
      predictions.forEach((prediction) => {
        console.log(`${prediction.label} (${prediction.confidence})`)
      })
      return predictions[0].label;
    } else {
      console.log('No predictions!')
    }
    return undefined
  }

  saveModel(): void {
    const model = this.classifier.model.serialize();
    fs.writeFile(this.filename, JSON.stringify(model), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Model has been saved');
    });
  }
}
