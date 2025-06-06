import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot, recaptchaToken } = await req.json();

    // Verificar el honeypot
    if (honeypot) {
      return NextResponse.json({ error: "Solicitud detectada como spam." }, { status: 400 });
    }

    // Validar reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // <--- PON AQUÍ TU CLAVE SECRETA
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      }
    );
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json({ error: "Falló la verificación reCAPTCHA." }, { status: 400 });
    }
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // 🔹 Obtiene la variable desde Vercel
        pass: process.env.EMAIL_PASS, // 🔹 Obtiene la variable desde Vercel
      },
    });

    await transporter.sendMail({
      from: `"Contacto Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // 🔹 Obtiene la variable desde Vercel
      subject: "Un mensaje del sitio!",
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });

    return NextResponse.json({ message: "Thank you for reaching out, I will get back to you shortly." }, { status: 200 });
  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
