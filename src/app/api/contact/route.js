import nodemailer from 'nodemailer'

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !phone || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (name.length < 2 || name.length > 50) {
      return Response.json({ error: 'Name must be between 2 and 50 characters.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    if (!isValidPhone(phone)) {
      return Response.json({ error: 'Enter a valid phone number.' }, { status: 400 })
    }

    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailAppPassword) {
      return Response.json(
        { error: 'Mail service is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    })

    await transporter.sendMail({
      from: `Phelix Capital <${gmailUser}>`,
      to: 'shobit@phelixcap.in',
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        '',
        'Message:',
        message
      ].join('\n'),
      html: `
        <div style="margin:0;padding:0;background:#f6f1e9;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:680px;margin:0 auto;padding:32px 20px;">
            <div style="background:#09223d;border-radius:24px 24px 0 0;padding:28px 32px;color:#f8f3e9;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#d8b36a;">Phelix Capital</p>
              <h2 style="margin:0;font-size:28px;line-height:1.2;">New enquiry from the website</h2>
            </div>
            <div style="background:#ffffff;border:1px solid #e7dccb;border-top:none;border-radius:0 0 24px 24px;padding:32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;color:#64748b;width:120px;font-size:14px;">Name</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;font-weight:600;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;color:#64748b;font-size:14px;">Email</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;color:#64748b;font-size:14px;">Phone</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:15px;">${escapeHtml(phone)}</td>
                </tr>
              </table>

              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:20px;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#af8239;font-weight:700;">Message</p>
                <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <div style="margin-top:28px;padding-top:18px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;line-height:1.6;">
                This message was submitted from the Phelix Capital website contact form.
              </div>
            </div>
          </div>
        </div>
      `
    })

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unable to send email.' },
      { status: 500 }
    )
  }
}