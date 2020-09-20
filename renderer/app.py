example_text_source = '''미국의 기업인. 페이팔의 전신이 된 온라인 결제 서비스 회사 x.com, 로켓 제조회사 겸 민간 우주기업 스페이스X를 창업했고, 전기자동차 회사 테슬라의 CEO도 맡고 있다. 현재 직함은 테슬라의 대표 이사와 스페이스X의 CEO이며, 솔라시티의 회장도 맡고 있다.

미래 지향적인 기업인으로 유명하다. 현재도 유망한 산업이나 중소기업에 적극 투자하고 있다. 특히 인공지능에 큰 관심이 있어, 안전한 인공지능 개발 관련 비영리 조직에 7백만 달러를 지원하기도 했다. 그가 남긴 유명한 메시지 중에는 '현시대 인류의 가장 큰 위협은 인공지능이 될 것'이라고 말한 바 있다.

그에 대해 더 자세히 알고 싶다면 김영사에서 번역 출간된 '일론 머스크'를 읽어보면 좋다. 머스크 본인은 물론 다양한 주변 인물들과의 인터뷰를 토대로 상세히 잘 쓰여진 전기이다.

기행과 혁신적인 행보로 기업 CEO 중에서도 인지도와 인기가 높다. 스티브 잡스를 빼고 애플을 논할 수 없듯이 일론 머스크를 빼면 테슬라와 스페이스X를 논할 수 없다.

1971년 남아프리카 공화국 프리토리아에서 엔지니어인 아버지와 모델인 어머니 사이에서 태어났다. 어렸을 때부터 컴퓨터에 관심이 있어 독학으로 프로그래밍 언어를 배우고, 12살 때에는 Blastar라는 이름의 게임을 동생과 함께 만들고 이를 게임 잡지에 500달러(현재 가치로 1200달러)에 판매했다.
'''

import cv2
from render_text_to_images import render_text_to_images
from add_invisiable_watermark import add_invisiable_watermark

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
    cv2.VideoWriter_fourcc(*'MP4V'),
    fps, size
  )
  for i in range(len(frame_array)):
    out.write(frame_array[i])
  out.release()

if __name__ == '__main__':
  images = render_text_to_images(example_text_source, 'example')
  print(images)

  for image in images:
    add_invisiable_watermark(image, '0x507f1f77bcf86cd799439011')
    convert_image_to_mp4(image, image.replace('png', 'mp4'))
