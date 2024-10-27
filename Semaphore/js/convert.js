const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const semaphoreImages = {
  'A': 'images/Alp.png',
  'B': 'images/Bra.png',
  'C': 'images/Cha.png',
  'D': 'images/Del.png',
  'E': 'images/Ech.png',
  'F': 'images/Fox.png',
  'G': 'images/Gol.png',
  'H': 'images/Hot.png',
  'I': 'images/Ind.png',
  'J': 'images/Jul.png',
  'K': 'images/Kil.png',
  'L': 'images/Lim.png',
  'M': 'images/Mik.png',
  'N': 'images/Nov.png',
  'O': 'images/Osc.png',
  'P': 'images/Pap.png',
  'Q': 'images/Que.png',
  'R': 'images/Rom.png',
  'S': 'images/Sie.png',
  'T': 'images/Tan.png',
  'U': 'images/Uni.png',
  'V': 'images/Vic.png',
  'W': 'images/Whi.png',
  'X': 'images/Xra.png',
  'Y': 'images/Yan.png',
  'Z': 'images/Zul.png',
  ' ': 'images/Rea.png'
};

async function createAnimatedGIF(text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const frames = [];
  const delay = 500; // 500ms delay between frames

  canvas.width = 100;
  canvas.height = 100;

  for (let char of text.toUpperCase()) {
    if (semaphoreImages[char]) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = semaphoreImages[char];
      await new Promise((resolve) => {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          frames.push(canvas.toDataURL());
          resolve();
        };
      });
    }
  }

  return createGIF(frames, delay);
}

async function convertToSemaphore() {
  const input = document.getElementById('inputText').value.toUpperCase();
  const outputStill = document.getElementById('outputStill');
  const outputAnimated = document.getElementById('outputAnimated');
  outputStill.innerHTML = '';
  outputAnimated.innerHTML = '';

  // Create still frame collage
  for (let char of input) {
    if (semaphoreImages[char]) {
      const img = document.createElement('img');
      img.src = semaphoreImages[char];
      img.alt = char === ' ' ? 'Space' : char;
      img.style.width = '150px';
      img.style.height = '150px';
      outputStill.appendChild(img);
    }
  }

  // Create animated GIF
  try {
    const animatedGIFUrl = await createAnimatedGIF(input);
    const gifImg = document.createElement('img');
    gifImg.src = animatedGIFUrl;
    outputAnimated.appendChild(gifImg);
    console.log('Animated GIF added to the DOM');
  } catch (error) {
    console.error('Error creating animated GIF:', error);
    outputAnimated.textContent = 'Error creating animated GIF';
  }
}

function createGIF(frames, delay, readyDelayMultiplier = 0.5) {
  return new Promise((resolve, reject) => {
    const gif = new GIF({
      workers: 4,
      workerScript: 'js/gif.worker.js',
      quality: 10,
      width: 100,
      height: 100
    });

    let previousChar = null;
    let frameCount = 0;
    async function addFrame(img, isReady = false) {
      return new Promise((resolveFrame) => {
          gif.addFrame(img, { delay: isReady ? delay * readyDelayMultiplier : delay });
          console.log(`Added ${isReady ? 'ready' : 'character'} frame ${++frameCount}`);
          resolveFrame();
      });
  }
  async function processFrames() {
    let previousChar = null;
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const img = new Image();
        img.src = frame;
        await new Promise((resolveLoad) => {
            img.onload = resolveLoad;
        });
        console.log('Image loaded:', frame);

        // Add the character frame
        await addFrame(img);

        // Check if we need to add a ready stance
        if (i < frames.length - 1 && frame === frames[i + 1]) {
            const readyImg = new Image();
            readyImg.src = "js/th.jpeg"; // Use the 'Rea.png' image
            await new Promise((resolveReady) => {
                readyImg.onload = resolveReady;
            });
            console.log('Ready image loaded');
            await addFrame(readyImg, true);
        }

        previousChar = frame;
    }

      
  
      console.log('All frames added, rendering GIF...');
      gif.render();
  }

    gif.on('progress', (p) => {
      console.log(`GIF rendering progress: ${(p * 100).toFixed(2)}%`);
    });

    gif.on('finished', (blob) => {
      console.log('GIF creation finished');
      const url = URL.createObjectURL(blob);
      console.log('Generated URL:', url);
      resolve(url);
    });

    processFrames().catch(reject);
  });
}
