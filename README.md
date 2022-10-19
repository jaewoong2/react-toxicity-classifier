# 유니버셜 센텐스 모델을 이용한 나쁜 말 확인 서비스

개발기간: 22/1009 ~ 22/1019

![image](https://user-images.githubusercontent.com/63512217/196638384-4be6285c-21d4-4558-bb66-8012b458d5ba.png)

![image](https://user-images.githubusercontent.com/63512217/196638245-f6e3208c-35cb-42d0-bf99-8820f6fe9448.png)

### 실행 및 사용 법

```bash
git clone https://github.com/jaewoong2/22-graduation
yarn
yarn dev
```

### 환경 변수 세팅

```jsx
// .env
VITE_NAVER_CLIENT_ID = 네이버_개발자_등록후_발급되는_프로젝트_ID
VITE_NAVER_CLIENT_PASSWORD = 네이버_개발자_등록후_발급되는_프로젝트_비밀번호
```

```jsx
// vite.config.ts
{
...
server: {
    proxy: {
      '/api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
...
}
```

- NAVER openAPI 는 클라이언트에서 호출하게 되면 CORS 에러가 뜨는 이슈를 해결 하기위해 `proxy server` 사용
- `[localhost:5173](http://localhost:5173)` 에서 `/api` 로 호출하게 되는 API 요청의 Origin을 API 서버의 Origin과 동일하게 하여 SOP를 위반하지 않도록 하여 CORS 에러 해결

### 디렉토리 구조

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂Layout
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂atoms
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜LoadingIcon.tsx
 ┃ ┃ ┗ 📜Message.tsx
 ┃ ┗ 📂pages
 ┃ ┃ ┗ 📂Chat
 ┃ ┃ ┃ ┣ 📂blocks
 ┃ ┃ ┃ ┃ ┣ 📜MessageForm.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Messages.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Predictions.tsx
 ┃ ┃ ┃ ┣ 📂context
 ┃ ┃ ┃ ┃ ┣ 📜ChatContext.ts
 ┃ ┃ ┃ ┃ ┗ 📜ChatContextProvider.tsx
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┣ 📜useChatActionContext.ts
 ┃ ┃ ┃ ┃ ┗ 📜useChatValueContext.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useMessage.ts
 ┃ ┣ 📜usePapago.ts
 ┃ ┣ 📜useScrolldown.ts
 ┃ ┗ 📜useToxicityPrecition.ts
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜env.d.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

### 기술 스택

`vite` `React` `Typescript` `React-Query` `TensorFlow JS` `Tailwind CSS`

### 활용

`Naver Papago API`

### 데이터 캐싱

1. 네이버 API 요청의 제한된 건수 _(1일 1만건)_
2. TensorflowJS 의 긴 필터링 시간

네이버 API 와 TensorflowJS 의 한계로 인해 데이터 캐싱을 하게 되었다.

1. Map 자료구조에 key(한글 문장), value(영어 문장) 을 등록
2. `translate(한글문장)` 함수 호출 시
   Map 자료구조의 key 에 한글 문장이 있으면 그대로 value 인 영어 문장을 return
   없으면 api 호출
3. Map 자료구조 선언시 `useRef` 를 사용 하여 선언 하였다
   - **useState를 사용하지 않은 이유**: useState 를 통하여 선언을 하게 되면, 캐시가 추가되거나 변경 될 때마다 리렌더링이됨 이를 방지하기 위하여 변경될 때 리렌더링을 일으키지 않는 useRef 를 통하여 선언
   - **customHook 밖에서 선언하지 않은 이유**: 커스텀 훅을 선언한 컴포넌트가 사라지면 해당 캐시도 지워져야 하는데 밖에서 선언을 하게 되면 컴포넌트의 라이프사이클과 상관 없이 캐시를 계속해서 갖고 있기 때문에, useRef 를 사용하면 컴포넌트의 라이프 사이클에 종속됨

### Design Pattern

1. **Atomic Design Pattern**
   1. `atoms: 상태를 Props 로 받는 가장 기초적인 Component`
   2. `blocks: 상태를 생성 하거나, 조작하는 컴포넌트로 atoms 및 blocks 컴포넌트를 사용한다`
   3. `pages: blocks 들로 이루어진 컴포넌트`
2. `전역상태를 위한` **Context API**
   1. `ContextAPI` 를 사용하여 `상태 변수`, 상태를 조작 시키는 `액션 함수` 등을 분리 하였음.
      1. 장점:
         1. 변수만을 사용하는 컴포넌트 와 액션 함수만을 사용하는 컴포넌트가 분리되어 리렌더링 최적화를 할 수 있다는 장점이 있다.
         2. Props-Driling 을 해결 할 수 있다
      2. 단점: 보일러 플레이트 코드가 많다
3. `UI 로직과 비지니스 로직을 분리하기 위한` **MVI Pattern**
   1. 하나의 의도를 갖는 `Custom Hook` 을 구현, 해당 Custom Hook 을 사용하여 상태를 불러오거나 조작 한다.
   2. 컴포넌트 의존성이 없는 로직을 구현 하여 다양한 컴포넌트에서 사용 할 수 있는 의도를 갖는 `Custom Hoo`k 을 제작

### Hooks

1. `**useMessage.ts**`
   - `input` 태그에 작성되는 문자를 등록하는 함수, 등록된 모든 문자열 과 그에 해당하는 예측값 (`Tensorflow JS` 를 통해 분류가 된 값들), 로딩 상태, 번역된 모든 문자열 을 return 한다
2. `**usePapago.ts**`
   - 파파고 API 를 사용하는 custom hook 이다. 한글 문자열을 매개변수로 받고, 번역된 값을 return 하는 함수를 포함하여 useMutation의 반환값들을 반환한다.
3. `**useToxicityPrecition.ts**`
   - Tensorflow JS 를 이용하는 커스텀 훅, `예측 값 / 예측 함수` 등을 반환한다
4. `**useScrolldown.ts**`
   - 커스텀 훅 선언 시, `ref` 와 `trigger 배열` 을 넣어주면, trigger의 의존 배열안에 넣은 값이 변경 될 때마다 `ref` 가 가리키고 있는 `HTML DOM` 의 스크롤을 맨 아래로 내린다.

### ETC.

| 라벨링          | 라벨링 (한국어) |
| --------------- | --------------- |
| identity_attack | 인신공격 정도   |
| insult          | 모욕성 정도     |
| obscene         | 외설 정도       |
| severe_toxicity | 심한 말 정도    |
| sexual_explicit | 성적 암시 정도  |
| threat          | 위협적인 정도   |
| toxicity        | 못된말 정도     |

| 0~20%    | 😃  |
| -------- | --- |
| 20%~30%  | 😕  |
| 30%~50%  | 😕  |
| 50%~80%  | 😨  |
| 80%~100% | 🤬  |

### 나쁜 말 모음

#### 🤬

1. 이 바보야
2. 넌 정말 못생겼어
3. 넌 멍청이야
4. 너 정말 한심하다
5. 너 미쳤어?
6. 너 진짜 미쳤어? 진짜 멍청하다
7. 너는 진짜 황당한 사람이야
8. shit
9. 너 진짜 한심하다

#### 😨

1. Hate you
2. 너 진짜 이상해
