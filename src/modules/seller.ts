import { Builder } from 'xml2js';
import { SellerEnum } from '../enums';
import { omitEmpty } from '../helpers';
import { ISeller } from '../interfaces';

export class Seller implements ISeller {
  bank!: string;
  accountNumber!: string;

  constructor(seller: ISeller) {
    Object.assign(this, validate(seller));
  }

  public get getMapped() {
    return map(this);
  }

  public get getXml() {
    return mapToXml(this);
  }
}

const mapToXml = (options: ISeller) => {
  const builder = new Builder({ rootName: 'elado', headless: true });

  return builder.buildObject(map(options));
};

const validate = (options: ISeller) => {
  if (!options.bank) {
    throw new Error('SzamlazzAgentClient requires seller bank');
  }

  if (!options.accountNumber) {
    throw new Error('SzamlazzAgentClient requires seller accountNumber');
  }

  return options;
};

const map = (options: ISeller) =>
  omitEmpty({
    [SellerEnum.bank]: options.bank,
    [SellerEnum.accountNumber]: options.accountNumber,
    [SellerEnum.emailReplyTo]: options.emailReplyTo,
    [SellerEnum.emailSubject]: options.emailSubject,
    [SellerEnum.emailText]: options.emailText,
  });
