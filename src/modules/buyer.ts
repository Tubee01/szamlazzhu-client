import { BuyerEnum as BuyerEnum } from '../enums';
import { IBuyer } from '../interfaces';
import { Builder } from 'xml2js';
import { omitEmpty } from '../helpers';

export class Buyer implements IBuyer {
  name!: string;
  zip!: string;
  city!: string;
  address!: string;

  constructor(options: IBuyer) {
    Object.assign(this, validate(options));
  }

  get getMapped() {
    return map(this);
  }

  get getXml() {
    return mapToXml(this);
  }
}

const validate = (options: IBuyer) => {
  if (!options.name) {
    throw new Error('SzamlazzAgentClient requires buyer name');
  }

  if (!options.zip) {
    throw new Error('SzamlazzAgentClient requires buyer zip');
  }

  if (!options.city) {
    throw new Error('SzamlazzAgentClient requires buyer city');
  }

  if (!options.address) {
    throw new Error('SzamlazzAgentClient requires buyer address');
  }

  if (options.sendEmail && !options.email) {
    throw new Error('SzamlazzAgentClient requires buyer email');
  }

  return options;
};

const mapToXml = (options: IBuyer) => {
  const builder = new Builder({ rootName: 'vevo', headless: true });

  return builder.buildObject(map(options));
};

const map = (options: IBuyer) =>
  omitEmpty({
    [BuyerEnum.name]: options.name,
    [BuyerEnum.zip]: options.zip,
    [BuyerEnum.city]: options.city,
    [BuyerEnum.address]: options.address,
    [BuyerEnum.email]: options.email,
    [BuyerEnum.sendEmail]: options.sendEmail,
    [BuyerEnum.taxNumber]: options.taxNumber,
    [BuyerEnum.postName]: options.postName,
    [BuyerEnum.postZip]: options.postZip,
    [BuyerEnum.postCity]: options.postCity,
    [BuyerEnum.postAddress]: options.postAddress,
    [BuyerEnum.identifier]: options.identifier,
    [BuyerEnum.phone]: options.phone,
    [BuyerEnum.comment]: options.comment,
  });
