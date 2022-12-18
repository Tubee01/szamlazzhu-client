import { Builder } from "xml2js";
import { ItemEnum } from "../src/enums";
import { Item } from "../src/modules";

describe('Item', () => {
  const builder = new Builder({ rootName: 'tetel', headless: true });
  it('should throw an error if the item is not valid', () => {
    expect(() => new Item({})).toThrowError();
  });

  it('should throw an error if the item name is not valid', () => {
    expect(() => new Item({ quantity: 1, netUnitPrice: 1 })).toThrowError();
  });

  it('should throw an error if the item quantity is not valid', () => {
    expect(() => new Item({ name: 'test', netUnitPrice: 1 })).toThrowError();
  });

  it('should throw and error if the vatRate is not valid', () => {
    expect(() => new Item({ name: 'test', quantity: 1, netUnitPrice: 1 })).toThrowError();
  });

  it('should throw an error if the item unit is not valid', () => {
    expect(() => new Item({ name: 'test', quantity: 1, vatRate: 1 })).toThrowError();
  });

  it('should throw an error if the item netUnitPrice is not valid', () => {
    expect(() => new Item({ name: 'test', quantity: 1, vatRate: 1, unit: 'test' })).toThrowError();
  });

  it('should throw and error if the item vatRate is not valid', () => {
    expect(() => new Item({ name: 'test', quantity: 1, netUnitPrice: 1, unit: 'test', vatRate: 'test' })).toThrowError();
  });

  it('should return item xml', () => {
    const item = new Item({ name: 'test', quantity: 1, vatRate: 27, unit: 'test', netUnitPrice: 1 });
    const xml = builder.buildObject({
      [ItemEnum.name]: 'test',
      [ItemEnum.quantity]: 1,
      [ItemEnum.unit]: 'test',
      [ItemEnum.netUnitPrice]: 1,
      [ItemEnum.vatRate]: 27,
      [ItemEnum.netAmount]: 1,
      [ItemEnum.vatAmount]: 0,
      [ItemEnum.grossAmount]: 1,
    });
    expect(item.getXml).toEqual(xml);
  });

  it('should return item getMapped', () => {
    const item = new Item({ name: 'test', quantity: 1, vatRate: 27, unit: 'test', netUnitPrice: 1 });
    expect(item.getMapped).toEqual({
      [ItemEnum.name]: 'test',
      [ItemEnum.quantity]: 1,
      [ItemEnum.unit]: 'test',
      [ItemEnum.netUnitPrice]: 1,
      [ItemEnum.vatRate]: 27,
      [ItemEnum.netAmount]: 1,
      [ItemEnum.vatAmount]: 0,
      [ItemEnum.grossAmount]: 1,
    });

  });

  it('should return item getXml', () => {
    const item = new Item({ name: 'test', quantity: 1, vatRate: 27, unit: 'test', netUnitPrice: 1 });
    const xml = builder.buildObject({
      [ItemEnum.name]: 'test',
      [ItemEnum.quantity]: 1,
      [ItemEnum.unit]: 'test',
      [ItemEnum.netUnitPrice]: 1,
      [ItemEnum.vatRate]: 27,
      [ItemEnum.netAmount]: 1,
      [ItemEnum.vatAmount]: 0,
      [ItemEnum.grossAmount]: 1,
    });
    expect(item.getXml).toEqual(xml);
  });

  it('should return item', () => {
    const item = new Item({ name: 'test', quantity: 1, vatRate: 'TAM', unit: 'test', netUnitPrice: 1 });
    expect(item.getMapped).toEqual({
      [ItemEnum.name]: 'test',
      [ItemEnum.quantity]: 1,
      [ItemEnum.unit]: 'test',
      [ItemEnum.netUnitPrice]: 1,
      [ItemEnum.vatRate]: 'TAM',
      [ItemEnum.netAmount]: 1,
      [ItemEnum.vatAmount]: 0,
      [ItemEnum.grossAmount]: 1,
    });
  });
});


