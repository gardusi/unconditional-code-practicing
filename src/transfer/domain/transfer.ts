import { Transaction } from "@app/finance/transaction";
import { Ledger } from "@app/finance/ledger";
import { Either } from '@app/common/domain/either';

export class Transfer {
  private context!: Transaction;

  public constructor(
    private readonly ledger: Ledger,
  ) {}

  private async step(
    result: boolean,
    effect: {
      next: () => Promise<boolean>,
      rollback: () => Promise<boolean>,
    },
  ): Promise<boolean> {
    return new Either(result).fold(effect.next, effect.rollback);
  }

  private async success(): Promise<boolean> {
    console.log("Successfully made a transfer");

    return true;
  }

  private async rollback(): Promise<boolean> {
    return this.ledger.rollback(this.context.rollbackTransaction());
  }

  private async commit(): Promise<boolean> {
    return this.step(
      await this.ledger.commit(),
      {
        next: this.success.bind(this),
        rollback: this.rollback.bind(this),
      }
    )
  }

  private async unstage(): Promise<boolean> {
    return this.ledger.unstage();
  }

  private async stage(): Promise<boolean> {
    return this.step(
      await this.ledger.stage(this.context),
      {
        next: this.commit.bind(this),
        rollback: this.unstage.bind(this),
      }
    );
  }

  public async make(transaction: Transaction): Promise<void> {
    this.context = transaction;
    await this.stage();
  }
}
