import Decimal from 'decimal.js';
import { Identifier } from '@app/common/domain/identifier';
import { Description } from '@app/common/domain/description';
import { Account } from '@app/common/domain/account';

export class Transaction {
  public constructor(
    public identifier: Identifier,
    public source: Account,
    public target: Account,
    public amount: Decimal,
    public description: Description,
    public createdAt: Date,
  ) {}

  public rollbackTransaction(): Transaction {
    return new Transaction(
      this.identifier,
      this.target,
      this.source,
      this.amount,
      this.description,
      this.createdAt,
    );
  }

  public normalize(): Transaction {
    [this.source, this.target] = [this.target, this.source];
    this.amount = this.amount.times(-1);

    return this;
  }
}
