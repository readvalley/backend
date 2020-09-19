from PIL import Image, ImageDraw, ImageFont

def split_text_into_segments(text: str, segments: int):
  lines = []
  line = ''
  count = 0
  for i in range(0, len(text)):
    if text[i] == '\n':
      lines.append(line)
      count = 0
      line = ''

    count += 1
    line += text[i]

    if segments == count:
      lines.append(line)
      count = 0
      line = ''
  return lines

def render_text_to_images(text_source, output_filename_prefix):
  IMAGE_SIZE = 1000
  FONT_SIZE = 60

  letter_in_a_row = int(IMAGE_SIZE / FONT_SIZE * 1.2)
  lines_in_a_image = int(IMAGE_SIZE * 1.5 / FONT_SIZE)

  text_lines = [
    line.strip()
    for line in split_text_into_segments(text_source, letter_in_a_row)
  ]

  pages = [
    '\n'.join(text_lines[i:i+lines_in_a_image]).strip()
    for i in range(0, len(text_lines), lines_in_a_image)
  ]

  output_files = []

  for page_index, text_source in enumerate(pages):
    image = Image.new('RGBA', (IMAGE_SIZE, int(IMAGE_SIZE * 1.5)), (255,255,255))
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype('./resources/NanumMyeongjo.ttf', FONT_SIZE)
    draw.text((10, 0), text_source, (0,0,0), font=font)

    output_filename = f'{output_filename_prefix}-{page_index}.png'
    image.save(output_filename)
    output_files.append(output_filename)

  return output_files
