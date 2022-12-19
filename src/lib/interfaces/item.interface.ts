export interface IItem {
  name: string;
  identifier?: string;
  quantity: number;
  unit: string;
  netUnitPrice: number;
  vatRate: string | number;
  netAmount?: number;
  vatAmount?: number;
  grossAmount?: number;
  comment?: string;
}
