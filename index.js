const axios = require('axios');
const { Validator } = require('./validator');

class PollinationsImageGenerator {
  constructor() {
    this.baseUrl = 'https://image.pollinations.ai/prompt';
  }

  /**
   * Validates and normalizes the input parameters
   * @param {Object} params - The parameters to validate
   * @returns {Object} - Normalized parameters
   */
  validateParams(params) {
    if (!params || typeof params !== 'object') {
      throw new Error('Parameters must be provided as an object');
    }

    try {
      return {
        prompt: Validator.validateString(params.prompt, 'prompt'),
        model: params.model || 'flux',
        seed: Validator.validateNumber(params.seed, 'seed', 0, Number.MAX_SAFE_INTEGER, 1736955450),
        nologo: Validator.validateBoolean(params.nologo, 'nologo', true),
        private: Validator.validateBoolean(params.private, 'private', false),
        width: Validator.validateNumber(params.width, 'width', 1, 2048, 350),
        height: Validator.validateNumber(params.height, 'height', 1, 2048, 195),
        enhance: Validator.validateBoolean(params.enhance, 'enhance', true)
      };
    } catch (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
  }

  /**
   * Constructs the API URL with the provided parameters
   * @param {Object} params - The validated parameters
   * @returns {string} - The constructed URL
   */
  constructUrl(params) {
    const queryParams = new URLSearchParams({
      model: params.model,
      seed: params.seed,
      nologo: params.nologo,
      private: params.private,
      width: params.width,
      height: params.height,
      enhance: params.enhance
    }).toString();

    const encodedPrompt = encodeURIComponent(params.prompt);
    return `${this.baseUrl}/${encodedPrompt}?${queryParams}`;
  }

  /**
   * Generates an image based on the provided parameters
   * @param {Object} params - The parameters for image generation
   * @returns {Promise<Buffer>} - The generated image as a buffer
   */
  async generateImage(params) {
    const validatedParams = this.validateParams(params);
    const url = this.constructUrl(validatedParams);
    
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'image/*'
        }
      });

      if (!response.headers['content-type']?.includes('image/')) {
        throw new Error('Response is not an image');
      }

      return Buffer.from(response.data);
    } catch (error) {
      if (error.response) {
        throw new Error(`API error: ${error.response.status} - ${error.response.statusText}`);
      }
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }
}

module.exports = PollinationsImageGenerator;
