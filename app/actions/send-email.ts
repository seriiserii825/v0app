"use server"

import nodemailer from "nodemailer"

export type SendEmailState = {
  success: boolean
  error?: string
}

export async function sendContactEmail(
  formData: FormData
): Promise<SendEmailState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = (formData.get("phone") as string) || ""
  const message = formData.get("message") as string
  const file = formData.get("file") as File | null

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields." }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const attachments: nodemailer.SendMailOptions["attachments"] = []

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    attachments.push({ filename: file.name, content: buffer })
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <h2 style="font-family:sans-serif">New Contact Form Submission</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${name}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${phone || "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;margin-top:16px;color:#333">${message.replace(/\n/g, "<br>")}</p>
        ${file && file.size > 0 ? `<p style="font-family:sans-serif;color:#666;font-size:13px">📎 Attachment: ${file.name}</p>` : ""}
      `,
      attachments,
    })

    return { success: true }
  } catch (err) {
    console.error("SMTP error:", err)
    return { success: false, error: "Failed to send email. Please try again." }
  }
}
