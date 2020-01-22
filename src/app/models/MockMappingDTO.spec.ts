
import { MockMappingDTO } from './MockMappingDTO';

describe('MockMappingDTO Test', () => {

    it('should return false when index without hyphen', () => {
        const dto = new MockMappingDTO('index', 12345);
        expect(dto.isValid()).toBeFalsy();
    });

    it('should return false when index without hyphen', () => {
        const dto = new MockMappingDTO('provider-consumer', 12345);
        expect(dto.isValid()).toBeTruthy();
        const mapping = dto.toMockMapping();
        expect(mapping.provider).toBe('provider');
        expect(mapping.consumer).toBe('consumer');
        expect(mapping.port).toBe(12345);
    });
});
