import SzamlazzAgentClient from "../src";

describe('SzamlazzAgentClient', () => {
  const { token } = process.env as NodeJS.ProcessEnv;

  let invoiceNumber: string;
  it('should throw an error if no options are provided', () => {
    expect(() => new SzamlazzAgentClient({})).toThrowError('SzamlazzAgentClient requires options');
  });

  it('should throw an error if no username or auth token is provided', () => {
    expect(() => new SzamlazzAgentClient({ password: 'password' })).toThrowError('SzamlazzAgentClient requires user');
  });

  it('should throw an error if no password or auth token is provided', () => {
    expect(() => new SzamlazzAgentClient({ user: 'user' })).toThrowError('SzamlazzAgentClient requires password');
  });

  it('should throw an error if no username, password, or auth token is provided', () => {
    expect(() => new SzamlazzAgentClient({ eInvoice: true })).toThrowError(
      'SzamlazzAgentClient requires authToken or username and password',
    );
  });

  if (!token || token === '') {
    throw new Error('No token provided');
  }

  it('should receive an invoice with pdf', async () => {
    const client = new SzamlazzAgentClient({ authToken: token, requestInvoiceDownload: true });
    const resp = await client.sendInvoice({
      buyer: {
        name: 'name',
        zip: 'zip',
        city: 'city',
        address: 'address',
      },
      header: {
        completionDate: '2020-01-01',
        paymentDueDate: '2020-01-01',
        currency: 'HUF',
        language: 'ro',
        paymentMethod: 'PayPal',
        paid: true,
      },
      items: [
        {
          name: 'name',
          quantity: 1222,
          unit: 'db',
          netUnitPrice: 13123123,
          vatRate: 27,
        },
      ],
      seller: {
        bank: 'OTP',
        accountNumber: '12345678-12345678-12345678',
      },
    })

    await expect(resp).toHaveProperty('pdf', expect.any(Buffer));
  });

  it('should receive an invoice without pdf', async () => {
    const client = new SzamlazzAgentClient({ authToken: token });
    const resp = await client.sendInvoice({
      buyer: {
        name: 'name',
        zip: 'zip',
        city: 'city',
        address: 'address',
      },
      header: {
        completionDate: '2020-01-01',
        paymentDueDate: '2020-01-01',
        currency: 'HUF',
        language: 'ro',
        paymentMethod: 'PayPal',
        paid: true,
      },
      items: [
        {
          name: 'name',
          quantity: 1222,
          unit: 'db',
          netUnitPrice: 13123123,
          vatRate: 27,
        },
      ],
      seller: {
        bank: 'OTP',
        accountNumber: '12345678-12345678-12345678',
      },
    })
    await expect(resp).toHaveProperty('invoiceNumber', expect.any(String));
    await expect(resp).not.toHaveProperty('pdf');
    invoiceNumber = resp.invoiceNumber as string;
  });

  it('should reserve an invoice number', async () => {
    const client = new SzamlazzAgentClient({ authToken: token });
    const resp = await client.reverseInvoice({
      invoiceNumber
    });

    await expect(resp).toHaveProperty('invoiceNumber', expect.any(String));
    await expect(resp).not.toHaveProperty('pdf');
  });

  it('should receive an invoice without pdf, version 2', async () => {
    const client = new SzamlazzAgentClient({ authToken: token, responseVersion: 2 });
    const resp = await client.sendInvoice({
      buyer: {
        name: 'name',
        zip: 'zip',
        city: 'city',
        address: 'address',
      },
      header: {
        completionDate: '2020-01-01',
        paymentDueDate: '2020-01-01',
        currency: 'HUF',
        language: 'ro',
        paymentMethod: 'PayPal',
        paid: true,
      },
      items: [
        {
          name: 'name',
          quantity: 1222,
          unit: 'db',
          netUnitPrice: 13123123,
          vatRate: 27,
        },
      ],
      seller: {
        bank: 'OTP',
        accountNumber: '12345678-12345678-12345678',
      },
    })

    await expect(resp).toHaveProperty('invoiceNumber', expect.any(String));
    await expect(resp).not.toHaveProperty('pdf');
  });

  it('should throw szamlazz.hu error', async () => {
    const client = new SzamlazzAgentClient({ authToken: token });
    await expect(async () => await client.sendInvoice({
      buyer: {
        name: 'name',
        zip: 'zip',
        city: 'city',
        address: 'address',
      },
      header: {
        completionDate: '2020-01-01',
        paymentDueDate: '2020-01-01',
        currency: 'HUF',
        language: 'ro',
        paymentMethod: 'PayPal',
        invoiceNumberPrefix: '',
        paid: true,
      },
      items: [
        {
          name: 'name',
          quantity: 1222,
          unit: 'db',
          netUnitPrice: 13123123,
          vatRate: 27,
        },
      ],
      seller: {
        bank: 'OTP',
        accountNumber: '12345678-12345678-12345678',
      },
    })).rejects.toThrowError()
  });
});
