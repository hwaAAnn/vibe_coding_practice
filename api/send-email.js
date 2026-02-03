import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email } = req.body || {};

  if (!name || !phone || !email) {
    return res.status(400).json({ error: '이름, 전화번호, 이메일을 모두 입력해주세요.' });
  }

  const recipientEmail = process.env.RECIPIENT_EMAIL;
  if (!recipientEmail) {
    console.error('RECIPIENT_EMAIL 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY 환경변수가 설정되지 않았습니다.');
    return res.status(500).json({ error: '서버 설정 오류입니다.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: '사자성어 퀴즈 <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: '[사자성어 퀴즈] 공부 신청 문의',
      html: `
        <h2>사자성어/한문 공부 신청이 접수되었습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>전화번호:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <hr>
        <p style="color:#666;font-size:12px;">사자성어 뜻 맞추기 퀴즈 웹사이트에서 발송됨</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: '이메일 전송에 실패했습니다.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Send email error:', err);
    return res.status(500).json({ error: '이메일 전송에 실패했습니다.' });
  }
}
