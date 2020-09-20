import cv2

def convert_image_to_mp4(image, output_filename, fps = 20.0) :
  paths = [image]
  frame_array = []
  for path in paths:
      img = cv2.imread(path)
      print(img.shape)
      height, width, _ = img.shape
      size = (width, height)
      frame_array.append(img)
  out = cv2.VideoWriter(
    output_filename,
    cv2.VideoWriter_fourcc(*'H264'),
    fps, size
  )
  for i in range(len(frame_array)):
    out.write(frame_array[i])
  out.release()
