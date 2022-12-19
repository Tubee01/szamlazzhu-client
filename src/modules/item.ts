import { Builder } from 'xml2js';
import { ItemEnum as ItemEnum, VatEnum as VatEnum } from '../enums';
import { omitEmpty } from '../helpers';
import { IItem } from '../interfaces';

export class Item implements IItem {
  name!: string;
  identifier?: string | undefined;
  quantity!: number;
  unit!: string;
  netUnitPrice!: number;
  vatRate!: string | number;

  constructor(item: IItem, rounding = 0) {
    Object.assign(this, this.validate(item, rounding));
  }

  public get getMapped() {
    return map(this);
  }

  public get getXml() {
    return mapToXml(this);
  }

  private validate = (item: IItem, rounding: number) => {
    if (!item.name) {
      throw new Error(`Client requires item name`);
    }

    if (!item.quantity) {
      throw new Error(`Client requires item quantity`);
    }

    if (!item.vatRate) {
      throw new Error(`Client requires item vatRate`);
    }

    if (!item.unit) {
      throw new Error(`Client requires item unit`);
    }

    if (!item.netUnitPrice) {
      throw new Error(`Client requires item netUnitPrice`);
    }

    return calculateItemPrice(item, rounding);
  };
}

const mapToXml = (item: IItem) => {
  const builder = new Builder({ rootName: 'tetel', headless: true });

  return builder.buildObject(map(item));
};

const calculateItemPrice = (item: IItem, rounding: number) => {
  const { quantity, netUnitPrice, vatRate } = item;
  const vatRateRegex = new RegExp('^[0-9]{1,2}$');

  const netAmount = calculateItemNetAmount(quantity, netUnitPrice);

  if (typeof vatRate === 'number' || vatRateRegex.test(vatRate.toString())) {
    const vat = +vatRate / 100;
    const vatAmount = round(netAmount * vat, rounding);
    const grossAmount = round(netAmount + vatAmount, rounding);

    return {
      ...item,
      netAmount,
      vatAmount,
      grossAmount,
    };
  } else if (typeof vatRate === 'string') {
    if (
      [
        VatEnum.TAM,
        VatEnum.AAM,
        VatEnum.EU,
        VatEnum.EUK,
        VatEnum.MAA,
        VatEnum.ÁKK,
        VatEnum.TEHK,
        VatEnum.HO,
        VatEnum.KBAET,
      ].includes(vatRate as VatEnum)
    ) {
      return {
        ...item,
        netAmount,
        vatAmount: 0,
        grossAmount: netAmount,
      };
    }
  }

  throw new Error(`Client requires item vatRate to be a number or a valid vatRate`);
};

const round = (value: number, decimals: number) => {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};

const calculateItemNetAmount = (quantity: number, netUnitPrice: number): number => {
  return quantity * netUnitPrice;
};

const map = (item: IItem) =>
  omitEmpty({
    [ItemEnum.name]: item.name,
    [ItemEnum.identifier]: item.identifier,
    [ItemEnum.quantity]: item.quantity,
    [ItemEnum.unit]: item.unit,
    [ItemEnum.netUnitPrice]: item.netUnitPrice,
    [ItemEnum.vatRate]: item.vatRate,
    [ItemEnum.netAmount]: item.netAmount,
    [ItemEnum.vatAmount]: item.vatAmount,
    [ItemEnum.grossAmount]: item.grossAmount,
    [ItemEnum.comment]: item.comment,
  });
