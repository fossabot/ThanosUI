export class SchemaKeyImpl {
    provider: string;
    name: string;
    version: string;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }
    isValid(): boolean {
        if (!this.provider || 0 === this.provider.length) {
            return false;
        } else if (!this.name || 0 === this.name.length) {
            return false;
        } else if (!this.version || 0 === this.version.length) {
            return false;
        } else {
            return true;
        }
    }

    isEqual(key: SchemaKeyImpl): boolean {
        if ((this.name === key.name) &&
            (this.provider === key.provider) &&
            (this.version === key.version)) {
            return true;
        } else {
            return false;
        }

    }
}
