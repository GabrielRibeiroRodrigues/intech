import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const name = formData.get('nome') as string
  const email = formData.get('email') as string
  const message = formData.get('mensagem') as string

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: 'Todos os campos são obrigatórios.' },
      { status: 400 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_HOST_USER,
      to: process.env.EMAIL_HOST_USER,
      subject: `Contato do site - ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
