# 이메일 연락 기능 설정 (Resend + Vercel)

연락 폼 제출 시 이름, 전화번호, 이메일이 당신의 이메일로 전달되도록 설정하는 방법입니다.

## 1. Resend 가입 및 API 키 발급

1. https://resend.com 에서 무료 가입
2. **API Keys** 메뉴에서 새 API 키 생성
3. 생성된 키 복사 (예: `re_xxxxxxxxxxxx`)

> Resend 무료 플랜: 월 3,000통 발송 가능. 테스트용 `onboarding@resend.dev` 발신 주소 사용 시 본인 이메일로만 발송 가능.

## 2. Vercel 배포

1. https://vercel.com 에서 가입/로그인
2. **Vercel CLI** 또는 **Git 연동**으로 프로젝트 배포

### CLI로 배포

```bash
npm install -g vercel
cd c:\Users\kwnmj\cursor_practice
npm install
vercel
```

### 환경 변수 설정 (Vercel 대시보드)

배포 후 Vercel 프로젝트 **Settings → Environment Variables**에서 다음 변수를 추가하세요.

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | Resend에서 발급한 API 키 |
| `RECIPIENT_EMAIL` | `your@email.com` | 문의 내용을 받을 본인 이메일 |

변수 추가 후 **Redeploy** 해주세요.

## 3. 동작 확인

1. 배포된 사이트 URL로 접속 (예: `https://your-project.vercel.app`)
2. "사자성어/한문 공부가 하고싶다면 연락주세요" 버튼 클릭
3. 폼에 테스트 데이터 입력 후 보내기
4. `RECIPIENT_EMAIL`로 설정한 주소로 메일 수신 확인

---

## 로컬에서 테스트하기

```bash
npm install
vercel dev
```

브라우저에서 `http://localhost:3000` 접속 후 동일하게 테스트할 수 있습니다.

로컬 환경 변수는 `.env.local` 파일에 설정하세요:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RECIPIENT_EMAIL=your@email.com
```

---

## 운영 시 도메인 인증 (선택)

기본 `onboarding@resend.dev`로도 발송 가능하지만, 본인 도메인을 인증하면 발신 주소를 `contact@yourdomain.com` 형태로 사용할 수 있습니다. Resend 대시보드에서 **Domains** 메뉴를 통해 설정할 수 있습니다.
