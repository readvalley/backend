# 📘 Backend service for Readvalley

## Main DRM Logic
1. User uploads article as plaintext
2. Render article as images, cropped to regular sizes

<img src="./docs/image-render-0.png" width="256"><img src="./docs/image-render-1.png" width="256">

3. Add invisible image watermarks

<img src="./docs/watermark-black.png?v=2" width="256"><img src="./docs/watermark-invisable.png?v=2" width="256">

4. Pack each image as MPEG-CENC content
5. Upload the encryption key to the blockchain, etc.
