import { Transaction } from '@app/finance/transaction';

export interface Ledger {
  stage(transaction: Transaction): Promise<boolean>;
  unstage(): Promise<boolean>;
  commit(): Promise<boolean>;
  rollback(transaction: Transaction): Promise<boolean>;
}
