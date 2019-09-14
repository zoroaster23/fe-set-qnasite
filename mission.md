## 미션설명

Amazon.com 의 prime 서비스의 일부 기능을 개발한다.

<https://www.amazon.com/amazonprime?_encoding=UTF8&%2AVersion%2A=1&%2Aentries%2A=0>

구현대상은 Slide 되는 UI이다.



## 기능요구사항

### 기획서

<https://docs.google.com/presentation/d/10rNnUqZlv5SYdnSWNIZ0fjGVsA2BJj7TN5BabRkV1c8/edit?usp=sharing>

- 미니 슬라이드 UI ([page 3](https://docs.google.com/presentation/d/10rNnUqZlv5SYdnSWNIZ0fjGVsA2BJj7TN5BabRkV1c8/edit#slide=id.g5d24e4b57f_0_0))

- 메인 카드형 슬라이드 UI ([page 4-7](https://docs.google.com/presentation/d/10rNnUqZlv5SYdnSWNIZ0fjGVsA2BJj7TN5BabRkV1c8/edit#slide=id.g5d45fc2566_0_5))

  



## 기술요구사항

### 일반공통

- PC 기준 웹 화면을 개발한다. Mobile Web을 고려하지 않는다.
- 크롬브라우저를 기준으로 개발한다. 
- 라이브러리를 사용할 수 없다. (jQuery, React, Vue, lodash, bootstrap, materialUI등등)



### HTML

- HTML5 Layout 태그를 사용한다(header, footer 등)
- 의미에 맞는 적절한 태그를 선택해서 사용한다. 
- W3C Validator 를 통과하도록 한다.



### CSS

- PC웹 화면을 기준으로 모든 엘리먼트의 크기는 임의로 결정한다.
- 의미적으로 같은 엘리먼트들은 같은 넓이와 크기를 갖도록 한다.
- padding 과 margin을 일관된 크기로 사용한다.
- CSS 클래스 이름 규칙을 스스로 정하고, 이를 지키며 개발한다.
- flexbox 속성을 적극 이용한다.
- px대신 em단위를 사용한다.
- css파일을 여러개의 모듈로 나눠서 개발한다. 공통 CSS파일이 있다면 공통관리한다.



### JavaScript

- 전역변수와 중복코드를 최소화 한다.

- 함수는 동사+명사로 구성한다. 변수는 명사를 사용한다.

- 객체는 여러개를 만든다.

- prototype 패턴을 한번 이상 사용한다.

- ES Classes 패턴을 한번 이상 사용한다.

- ES 2015 문법을 적극 사용한다.

- 표준 DOM API를 사용한다.

- event delegation을 활용한다.

- 애니메이션은 requestAnimationFrame 또는 CSS transition을 사용한다.

- 주어진 JSON 데이터를 fetch 요청을 통해서 불러서 사용한다.

  

### 추가요구사항(선택)

- 재사용되는 공통 슬라이드 컴포넌트 개발
  - 미니슬라이드와 메인카드슬라이드의 슬라이드 기능을 재사용할 수 있도록 공통슬라이드 컴포넌트를 개발한다. 