/**
 * Inspired em Data.Either
 * https://github.com/joanllenas/ts.data.either
 **/ 

export class Either {
  public constructor(
    private readonly condition: boolean,
  ) {}

  private translate(result: boolean): "right" | "left" {
    return String(result)
      .replace("true", "right")
      .replace("false", "left") as "right" | "left";
  }

  public fold<A, B>(right: () => A, left: () => B): A | B
  public async fold<A, B>(right: () => Promise<A>, left: () => Promise<B>): Promise<A | B> {
    return { right, left }[
      this.translate(this.condition)
    ]();
  }

  public withRight<A>(right: () => A): void | A
  public async withRight<A>(right: () => Promise<A>): Promise<void | A> {
    return { right, left: () => {} }[
      this.translate(this.condition)
    ]();
  }

  public withLeft<B>(left: () => B): void | B
  public async withLeft<B>(left: () => Promise<B>): Promise<void | B> {
    return { right: () => {}, left }[
      this.translate(this.condition)
    ]();
  }
}
