export enum Classification {
  UNWEIGHTED,
  CASUAL_COFFEE,
  CONNOISSEUR_COFFEE,
  CASUAL_TEA,
  CONNOISSEUR_TEA
}

export const CLASSIFY_MAP = new Map([
  [['Casual', 'Coffee'].join('_') , Classification.CASUAL_COFFEE],
  [['Connoisseur', 'Coffee'].join('_'), Classification.CONNOISSEUR_COFFEE],
  [['Casual', 'Tea'].join('_'), Classification.CASUAL_TEA],
  [['Connoisseur', 'Tea'].join('_'), Classification.CONNOISSEUR_TEA],
]);
