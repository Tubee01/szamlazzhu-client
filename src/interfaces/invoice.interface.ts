import { IBuyer } from './buyer.interface';
import { IHeader } from './header.interface';
import { IItem } from './item.interface';
import { ISeller } from './seller.interface';

export interface IInvoice {
  header: IHeader;
  buyer: IBuyer;
  items: IItem[];
  seller: ISeller;
}
