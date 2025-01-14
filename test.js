const PollinationsImageGenerator = require('./index');
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