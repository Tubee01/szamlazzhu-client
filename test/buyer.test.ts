import { Builder } from 'xml2js';
import { BuyerEnum } from '../src/enums';
import { Buyer } from '../src/modules';

describe('Buyer', () => {
  const defaultBuyer = {
    name: 'test',
    zip: 'test',
    city: 'test',
    address: 'test',
  }
  const builder = new Builder({ rootName: 'vevo', headless: true });

  it('should throw an error if the buyer is not valid', () => {
    expect(() => new Buyer({})).toThrowError();
  });

  it('should throw an error if the buyer name is not valid', () => {
    expect(() => new Buyer({ zip: 'test', city: 'test', address: 'test' })).toThrowError();
  });

  it('should throw an error if the buyer zip is not valid', () => {
    expect(() => new Buyer({ name: 'test', city: 'test', address: 'test' })).toThrowError();
  });

  it('should throw an error if the buyer city is not valid', () => {
    expect(() => new Buyer({ name: 'test', zip: 'test', address: 'test' })).toThrowError();
  });

  it('should throw an error if the buyer address is not valid', () => {
    expect(() => new Buyer({ name: 'test', zip: 'test', city: 'test' })).toThrowError();
  });

  it('should throw an error if the buyer email is not valid', () => {
    expect(() => new Buyer({ ...defaultBuyer, sendEmail: true })).toThrowError();
  });

  it('should return buyer xml', () => {
    const buyer = new Buyer(defaultBuyer);
    const xml = builder.buildObject({
      [BuyerEnum.name]: defaultBuyer.name,
      [BuyerEnum.zip]: defaultBuyer.zip,
      [BuyerEnum.city]: defaultBuyer.city,
      [BuyerEnum.address]: defaultBuyer.address,
    });
    expect(buyer.getXml).toEqual(xml);
  });

  it('should return buyer xml with email', () => {
    const email = 'email@email.hu';
    const buyer = new Buyer({ ...defaultBuyer, email });
    const xml = builder.buildObject({
      [BuyerEnum.name]: defaultBuyer.name,
      [BuyerEnum.zip]: defaultBuyer.zip,
      [BuyerEnum.city]: defaultBuyer.city,
      [BuyerEnum.address]: defaultBuyer.address,
      [BuyerEnum.email]: email,
    });
    expect(buyer.getXml).toEqual(xml);
  });

  it('should return buyer xml with email and sendEmail', () => {
    const email = 'email@email.hu';
    const buyer = new Buyer({ ...defaultBuyer, email, sendEmail: true });
    const xml = builder.buildObject({
      [BuyerEnum.name]: defaultBuyer.name,
      [BuyerEnum.zip]: defaultBuyer.zip,
      [BuyerEnum.city]: defaultBuyer.city,
      [BuyerEnum.address]: defaultBuyer.address,
      [BuyerEnum.email]: email,
      [BuyerEnum.sendEmail]: true,
    });
    expect(buyer.getXml).toEqual(xml);
  });


  it('should return buyer object', () => {
    const buyer = new Buyer(defaultBuyer);
    expect(buyer).toEqual({
      name: 'test',
      zip: 'test',
      city: 'test',
      address: 'test',
    });
  });

  it('should return buyer map', () => {
    const buyer = new Buyer(defaultBuyer);
    expect(buyer.getMapped).toEqual({
      [BuyerEnum.name]: 'test',
      [BuyerEnum.zip]: 'test',
      [BuyerEnum.city]: 'test',
      [BuyerEnum.address]: 'test',
    });
  });
});
