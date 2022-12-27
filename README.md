# Szamlazz.hu nodeJS client

<div align="center">

[![codecov](https://codecov.io/gh/Tubee01/szamlazzhu-client/branch/development/graph/badge.svg?token=RNUO9X9158)](https://codecov.io/gh/Tubee01/szamlazzhu-client)
[![npm version](https://badge.fury.io/js/szamlazzhu-client.svg)](https://badge.fury.io/js/szamlazzhu-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Checklist

- [x] Create invoice
- [x] Reverse invoice
- [ ] Query invoices
- [ ] Error handling
  - [x] Szamlazz.hu API errors
  - [ ] Network errors
  - [ ] Invalid parameters
  - [ ] JSON based error reporting
- [ ] Tests
- [ ] Documentation

## SzamlazzAgentClient

The SzamlazzAgentClient is a class that allows you to send invoices and reverse invoices using the Szamlazz API.

### Installation

```bash
npm install szamlazzhu-client
```

### Usage

#### Create invoice

```typescript
import { SzamlazzAgentClient, Currency, Language, PaymentMethod } from 'szamlazzhu-client';

const client = new SzamlazzAgentClient({
  authToken: 'your-auth-token',
  // OR
  user: 'your-username',
  password: 'your-password',
});

client.sendInvoice({
  header: {
    currency: Currency.DKK,
    completionDate: '2022-11-30',
    paymentDueDate: '2022-12-08',
    language: Language.DE,
    paymentMethod: PaymentMethod.Bank,
  },
  buyer: {
    name: 'John Doe',
    zip: '1234',
    city: 'Budapest',
    address: 'Árvíztűrő tükörfúrógép utca 1.',
  },
  items: [
    {
      name: 'Item 1',
      quantity: 1,
      unit: 'piece',
      netUnitPrice: 100,
      vatRate: 27,
    },
  ],
  seller: {
    bank: 'OTP',
    accountNumber: '12345678-12345678-12345678',
  },
});
```

#### Reverse invoice

```typescript
client.reverseInvoice({ invoiceNumber: '12345678-1-1' });
```

## Errors received from the Szamlazz API

The SzamlazzAgentClient will throw an error if the API returns an error. The error will be like this:

```text
[code: 3]: Sikertelen bejelentkezés.
```
