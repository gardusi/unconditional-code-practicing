import v4 from "uuid/v4";
import { Identifier } from '@app/common/domain/identifier';
import { Either } from "@app/common/domain/either";

export class Uuid implements Identifier {
  private static readonly PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  public constructor(
    public readonly identifier: string,
  ) {
    new Either(Uuid.PATTERN.test(identifier))
      .withLeft(() => { throw Error("Tried to assign an invalid UUID") });
  }

  public static generate(): Uuid {
    return new Uuid(v4());
  }

  public equals(uuid: Uuid): boolean {
    return this.toString() === uuid.toString();
  }

  public toString(): string {
    return this.identifier;
  }
}
