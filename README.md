# Pollinations Image Generator

A Node.js package for generating images using the Pollinations AI API.

[![Node.js Package](https://github.com/Guru322/Pollination-sdk/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/Guru322/Pollination-sdk/actions/workflows/npm-publish-github-packages.yml)

## Installation

```bash
npm install pollinations-sdk
```

## Usage

```javascript
const PollinationsImageGenerator = require('pollinations-sdk');
const fs = require('fs').promises;

const generator = new PollinationsImageGenerator();

async function generateImage() {
  const params = {
    prompt: 'a beautiful sunset on the beach',
    model: 'flux',
    seed: 1736955450,
    nologo: true,
    private: false,
    width: 350,
    height: 195,
    enhance: true
  };

  try {
    const imageBuffer = await generator.generateImage(params);
    await fs.writeFile('generated-image.jpg', imageBuffer);
    console.log('Image generated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateImage();
```

## API Reference

### Parameters


- `prompt` (string, required): The text prompt for image generation
- `model` (string): The model to use (default: 'flux')
- `seed` (number): Random seed for generation (default: 1736955450)
- `nologo` (boolean): Remove logo from image (default: true)
- `private` (boolean): Set image privacy (default: false)
- `width` (number): Image width in pixels (default: 350, max: 2048)
- `height` (number): Image height in pixels (default: 195, max: 2048)
- `enhance` (boolean): Enable image enhancement (default: true)

### Methods

#### generateImage(params)
Returns a Promise that resolves with the image buffer.


## Credits

- [Pollinations Ai](https://pollinations.ai/) 

- [Pollinations Ai Github](https://github.com/pollinations-ai/pollinations.ai)

## License

MIT
