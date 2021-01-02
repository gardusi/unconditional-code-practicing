export interface Identifier {
  equals(identifier: Identifier): boolean;
  toString(): string;
}
