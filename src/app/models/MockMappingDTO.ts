import { MockMapping } from './MockMapping';

export class MockMappingDTO {
    private index: string;
    private port: number;

    constructor(obj?: any) {
        Object.assign(this, obj);
    }


    isValid(): boolean {
        if ((this.index.indexOf('-') >= 0) &&
            (this.index.indexOf('-') < this.index.length)) {
            return true;
        } else {
            return false;
        }
    }

    toMockMapping(): MockMapping {
        const hyphen = this.index.indexOf('-');
        const provider = this.index.substr(0, hyphen);
        const consumer = this.index.substr(hyphen + 1);
        return new MockMapping(provider, consumer, this.port);
    }
}

