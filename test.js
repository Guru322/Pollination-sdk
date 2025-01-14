const PollinationsImageGenerator = require('./index.js');

describe('PollinationsImageGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new PollinationsImageGenerator();
  });

  describe('validateParams', () => {
    it('should validate and normalize parameters correctly', () => {
      const params = {
        prompt: 'test prompt',
        width: 400,
        height: 300
      };

      const validated = generator.validateParams(params);
      expect(validated.prompt).toBe('test prompt');
      expect(validated.width).toBe(400);
      expect(validated.height).toBe(300);
      expect(validated.model).toBe('flux');
    });

    it('should throw error for invalid parameters', () => {
      const params = {
        prompt: '',
        width: -1
      };

      expect(() => generator.validateParams(params)).toThrow();
    });
  });

  describe('generateImage', () => {
    it('should generate and return an image buffer', async () => {
      const params = {
        prompt: 'a beautiful sunset'
      };

      const imageBuffer = await generator.generateImage(params);
      expect(Buffer.isBuffer(imageBuffer)).toBeTruthy();
      expect(imageBuffer.length).toBeGreaterThan(0);
    });
  });
});