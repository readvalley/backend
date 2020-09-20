import os
import sys
from render_text_to_images import render_text_to_images
from add_invisiable_watermark import add_invisiable_watermark
from convert_image_to_mp4 import convert_image_to_mp4

def render(params):
  book_id, user_id, key, kid, text_source = params
  images = render_text_to_images(text_source, book_id)
  print(images)

  key = key[2:34].upper()
  kid = kid[2:34].upper()
  print(key)

  for image in images:
    add_invisiable_watermark(image, user_id)
    video_filename = image.replace('png', 'mp4')
    convert_image_to_mp4(image, video_filename)

    os.system(f'mp4fragment {video_filename} video-fragmented.mp4')
    os.system(
      f'mp4encrypt --method MPEG-CENC --key 1:{key}:random'
      f' --property 1:KID:{kid}'
      f' --key 2:{key}:random'
      f' --property 2:KID:{kid}'
      f' --global-option mpeg-cenc.eme-pssh:true video-fragmented.mp4 {video_filename}')

    stream_name = 'streams/' + video_filename.replace('.mp4', '')
    os.system(f'mp4dash -o {stream_name} {video_filename}')

if __name__ == '__main__':
  params = [sys.argv[i] for i in range(1, 6)]
  render(params)
