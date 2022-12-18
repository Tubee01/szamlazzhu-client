import { Builder } from 'xml2js';
import { Currencies, Languages, PaymentMethods } from '../src/constants';
import { HeaderEnum } from '../src/enums';
import { Header } from '../src/modules/header';

describe('Header', () => {
  const builder = new Builder({ rootName: 'fejlec', headless: true });

  it('should throw an error if header completionDate is not provided', () => {
    expect(() => new Header({})).toThrow('SzamlazzAgentClient requires header completionDate');
  });

  it('should throw an error if header paymentDueDate is not provided', () => {
    expect(() => new Header({ completionDate: '2020-01-01' })).toThrow(
      'SzamlazzAgentClient requires header paymentDueDate',
    );
  });

  it('should throw an error if header paymentMethod is not provided', () => {
    expect(
      () => new Header({ completionDate: '2020-01-01', paymentDueDate: '2020-01-01' }),
    ).toThrow('SzamlazzAgentClient requires header paymentMethod');
  });

  it('should throw an error if header paymentMethod is not valid', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'test',
        }),
    ).toThrow(
      `SzamlazzAgentClient requires header paymentMethod to be one of ${PaymentMethods.map(
        (paymentMethod) => paymentMethod.code,
      ).join(', ')}`,
    );
  });

  it('should throw an error if header currency is not provided', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'cash',
        }),
    ).toThrow('SzamlazzAgentClient requires header currency');
  });

  it('should throw an error if header currency is not valid', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'cash',
          currency: 'test',
        }),
    ).toThrow(
      `SzamlazzAgentClient requires header currency to be one of ${Currencies.map((currency) => currency.code).join(
        ', ',
      )}`,
    );
  });

  it('should throw an error if header language is not provided', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'cash',
          currency: 'HUF',
        }),
    ).toThrow('SzamlazzAgentClient requires header language');
  });

  it('should throw an error if header language is not valid', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'cash',
          currency: 'HUF',
          language: 'test',
        }),
    ).toThrow(
      `SzamlazzAgentClient requires header language to be one of ${Languages.map((language) => language.code).join(
        ', ',
      )}`,
    );
  });

  it('should throw an error if completionDate is not valid', () => {
    expect(
      () =>
        new Header({
          completionDate: 'test',
          paymentDueDate: '2020-01-01',
          paymentMethod: 'cash',
          currency: 'HUF',
          language: 'hu',
        }),
    ).toThrow('SzamlazzAgentClient requires dates to be a valid date');
  });

  it('should throw an error if paymentDueDate is not valid', () => {
    expect(
      () =>
        new Header({
          completionDate: '2020-01-01',
          paymentDueDate: 'test',
          paymentMethod: 'cash',
          currency: 'HUF',
          language: 'hu',
        }),
    ).toThrow('SzamlazzAgentClient requires dates to be a valid date');
  });

  it('should return object if all required fields are provided', () => {
    const headerClass = new Header({
      completionDate: '2020-01-01',
      paymentDueDate: '2020-01-01',
      paymentMethod: 'cash',
      currency: 'HUF',
      language: 'hu',
    });

    expect(headerClass).toEqual({
      completionDate: '2020-01-01',
      paymentDueDate: '2020-01-01',
      paymentMethod: 'cash',
      currency: 'HUF',
      language: 'hu',
      exchangeBank: 'MNB',
      exchange: '0.0',
    });
  });

  it('should return header map', () => {
    const header = new Header({
      completionDate: '2020-01-01',
      paymentDueDate: '2020-01-01',
      paymentMethod: 'cash',
      currency: 'HUF',
      language: 'hu',
    });

    expect(header.getMapped).toEqual({
      [HeaderEnum.issueDate]: new Date().toISOString().split('T')[0],
      [HeaderEnum.completionDate]: '2020-01-01',
      [HeaderEnum.paymentDueDate]: '2020-01-01',
      [HeaderEnum.paymentMethod]: 'cash',
      [HeaderEnum.currency]: 'HUF',
      [HeaderEnum.language]: 'hu',
      [HeaderEnum.exchangeBank]: 'MNB',
      [HeaderEnum.exchange]: '0.0',
    });
  });

  it('should return header getXml', () => {
    const obj = {
      completionDate: '2020-01-01',
      paymentDueDate: '2020-01-01',
      paymentMethod: 'cash',
      currency: 'HUF',
      language: 'hu',
    }

    const header = new Header(obj);

    const xml = builder.buildObject({
      [HeaderEnum.issueDate]: new Date().toISOString().split('T')[0],
      [HeaderEnum.completionDate]: obj.completionDate,
      [HeaderEnum.paymentDueDate]: obj.paymentDueDate,
      [HeaderEnum.paymentMethod]: obj.paymentMethod,
      [HeaderEnum.currency]: obj.currency,
      [HeaderEnum.language]: obj.language,
      [HeaderEnum.exchangeBank]: 'MNB',
      [HeaderEnum.exchange]: '0.0',

    });

    expect(header.getXml).toEqual(xml);

  });

  it('should return header ,when type is SS', () => {
    const header = new Header({
      invoiceNumber: 'test',
      type: 'SS',
    });

    expect(header.getMapped).toEqual({
      [HeaderEnum.invoiceNumber]: 'test',
      [HeaderEnum.issueDate]: new Date().toISOString().split('T')[0],
      [HeaderEnum.type]: 'SS',
    });

  });

  it('should throw error if date is not valid', () => {
    expect(() => new Header({
      completionDate: 'test-01-01',
      paymentDueDate: '2020-test-01',
      paymentMethod: 'cash',
      currency: 'HUF',
      language: 'hu',
    })).toThrow('SzamlazzAgentClient requires dates to be a valid date');
  });
});
