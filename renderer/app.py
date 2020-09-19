from PIL import Image, ImageDraw, ImageFont

example_text_source = '''미국의 기업인. 페이팔의 전신이 된 온라인 결제 서비스 회사 x.com, 로켓 제조회사 겸 민간 우주기업 스페이스X를 창업했고, 전기자동차 회사 테슬라의 CEO도 맡고 있다. 현재 직함은 테슬라의 대표 이사와 스페이스X의 CEO이며, 솔라시티의 회장도 맡고 있다.

미래 지향적인 기업인으로 유명하다. 현재도 유망한 산업이나 중소기업에 적극 투자하고 있다. 특히 인공지능에 큰 관심이 있어, 안전한 인공지능 개발 관련 비영리 조직에 7백만 달러를 지원하기도 했다. 그가 남긴 유명한 메시지 중에는 '현시대 인류의 가장 큰 위협은 인공지능이 될 것'이라고 말한 바 있다.

그에 대해 더 자세히 알고 싶다면 김영사에서 번역 출간된 '일론 머스크'를 읽어보면 좋다. 머스크 본인은 물론 다양한 주변 인물들과의 인터뷰를 토대로 상세히 잘 쓰여진 전기이다.
'''

def render_text_to_image(text_source, output_file_path):
  image = Image.new("RGBA", (1000, 1000), (255,255,255))
  draw = ImageDraw.Draw(image)
  font = ImageFont.truetype('./resources/NanumMyeongjo.ttf', 60)

  draw.text((10, 0), text_source, (0,0,0), font=font)
  image.save(output_file_path)

if __name__ == '__main__':
  render_text_to_image(example_text_source, 'example.png')
