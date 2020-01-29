export class SchemaKeyImpl {
    id: string;
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
        } else if (!this.id || 0 === this.id.length) {
            return false;
        } else {
            return true;
        }
    }

    isEqual(key: SchemaKeyImpl): boolean {
        if (this.id === key.id) {
            return true;
        } else {
            return false;
        }

    }
}
