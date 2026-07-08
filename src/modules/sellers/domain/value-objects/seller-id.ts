export class SellerId {
    private readonly _value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("SellerId cannot be empty");
        }

        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    equals(other: SellerId): boolean {
        return this._value === other.value;
    }
}