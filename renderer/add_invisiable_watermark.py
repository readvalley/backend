from PIL import Image

def add_invisiable_watermark(image_path, watermark_object_id):
  image = Image.open(image_path)
  watermark_object_id_as_number = int(watermark_object_id, 16)
  watermark_object_id_as_binary = [int(x) for x in bin(watermark_object_id_as_number)[2:]]
  print(watermark_object_id_as_binary)

  pixels = image.load()
  print(image.size)
  row_count = 0
  for y in range(image.size[1]):
    row = []
    is_not_white_row = False
    for x in range(image.size[0]):
      current_pixel = pixels[x, y]
      if (current_pixel != (255, 255, 255, 255)):
        is_not_white_row = True
        break
      row.append([x, y])
    if is_not_white_row:
      continue

    for index, binary_value in enumerate(watermark_object_id_as_binary):
      color = (252, 252, 252, 255) if binary_value else (255, 255, 255, 255)
      [x, y] = row[index]
      image.putpixel((x, y), color)
    row_count += 1

  image.save(image_path)

if __name__ == '__main__':
  add_invisiable_watermark('example-0.png', '0x507f1f77bcf86cd799439011')
