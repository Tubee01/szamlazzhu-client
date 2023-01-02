import { Builder } from "xml2js";
import { SellerEnum, Seller } from "../src";

describe('Seller', () => {
  const builder = new Builder({ rootName: 'elado', headless: true });
  it('should throw an error if the seller is not valid', () => {
    expect(() => new Seller({})).toThrowError('SzamlazzAgentClient requires seller bank');
  });

  it('should throw an error if the seller bank is not valid', () => {
    expect(() => new Seller({ accountNumber: 'test' })).toThrowError('SzamlazzAgentClient requires seller bank');
  });

  it('should throw an error if the seller accountNumber is not valid', () => {
    expect(() => new Seller({ bank: 'test' })).toThrowError('SzamlazzAgentClient requires seller accountNumber');
  });

  it('should return seller xml', () => {
    const seller = new Seller({ bank: 'test', accountNumber: 'test' });
    const xml = builder.buildObject({
      [SellerEnum.bank]: 'test',
      [SellerEnum.accountNumber]: 'test',
    });
    expect(seller.getXml).toEqual(xml);
  });

  it('should return seller getMapped', () => {
    const seller = new Seller({ bank: 'test', accountNumber: 'test' });
    expect(seller.getMapped).toEqual({
      [SellerEnum.bank]: 'test',
      [SellerEnum.accountNumber]: 'test',
    });
  });

});