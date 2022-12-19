export interface IBuyer {
  name: string;
  zip: string;
  city: string;
  address: string;
  email?: string;
  sendEmail?: boolean;
  taxNumber?: string;
  postName?: string;
  postZip?: string;
  postCity?: string;
  postAddress?: string;
  identifier?: string;
  phone?: string;
  comment?: string;
}
