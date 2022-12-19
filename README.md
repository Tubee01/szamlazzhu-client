# Szamlazz.hu nodeJS client

## Checklist

- [x] Create invoice
- [x] Reverse invoice
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
import { SzamlazzAgentClient } from 'szamlazzhu-client';

const client = new SzamlazzAgentClient({
  authToken: 'your-auth-token',
  // OR
  user: 'your-username',
  password: 'your-password',
});

client.sendInvoice({
  header: {
    currency: 'DKK',
    completionDate: '2022-11-30',
    paymentDueDate: '2022-12-08',
    language: 'de',
    paymentMethod: 'bank transfer',
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
