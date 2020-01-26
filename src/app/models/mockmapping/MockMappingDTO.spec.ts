
import { MockMappingDTO } from './MockMappingDTO';

describe('MockMappingDTO Test', () => {

    it('should return false when index without hyphen', () => {
        const obj = {
            index: 'inex',
            port: 12345
        };
        const dto = new MockMappingDTO(obj);
        expect(dto.isValid()).toBeFalsy();
    });

    it('should return false when index without hyphen', () => {
        const obj = {
            index: 'provider-consumer',
            port: 12345
        };
        const dto = new MockMappingDTO(obj);
        expect(dto.isValid()).toBeTruthy();
        const mapping = dto.toMockMapping();
        expect(mapping.provider).toBe('provider');
        expect(mapping.consumer).toBe('consumer');
        expect(mapping.port).toBe(12345);
    });
});
