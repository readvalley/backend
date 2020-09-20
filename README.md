# 📘 Backend service for Readvalley

## Requirements

- Python3 >= 3.8.2
- PIL
- OpenCV
- [Bento4](https://github.com/axiomatic-systems/Bento4)

## POST book/register
Register information for Book

## POST book/publish/:bookId  ⇒ Main DRM Logic
1. User uploads book article as plaintext
2. Render article as images, cropped to regular sizes

<img src="./docs/images/image-render-0.png" width="256"><img src="./docs/images/image-render-1.png" width="256">

3. Add invisible image watermarks

<img src="./docs/images/watermark-black.png?v=2" width="256"><img src="./docs/images/watermark-invisable.png?v=2" width="256">

4. Convert each image as one-frame MP4 video
5. Pack each video as MPEG-CENC content, using kid & key
6. generate MPEG-DASH streams
7. Upload the kid, key to database
8. Call the contract function `addBook` for blockchain register
9. Update field `isPublished` for BookModel

## GET book/:bookId ⇒ DRM Viewer Logic
1. Giveout stream path, base64-encoded(without padding characters) kid & key
2. Render with dash.js, autopause mediaplayer to enable reading
