export class SellerEmail {
    private readonly _value: string;

    constructor(value: string) {
        if (!value?.trim()) {
            throw new Error("SellerEmail cannot be empty");
        }

        const normalized = this.normalize(value);

        if (!this.validate(normalized)) {
            throw new Error("SellerEmail is not in valid format");
        }

        this._value = normalized;
    }

    private normalize(value: string): string {
        return value.trim().toLowerCase();
    }

    private validate(email: string): boolean {
        const MAX_EMAIL_LENGTH = 254;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return email.length <= MAX_EMAIL_LENGTH && emailRegex.test(email);
    }

    get value(): string {
        return this._value;
    }
}