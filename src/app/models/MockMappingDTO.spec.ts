
import { MockMappingDTO } from './MockMappingDTO';

describe('MockMappingDTO Test', () => {

    it('should return false when index without hyphen', () => {
        const dto = new MockMappingDTO('index', 12345);
        expect(dto.isValid()).toBeFalsy();
    });
});
