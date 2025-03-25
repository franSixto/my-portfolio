import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // 🔹 Obtiene la variable desde Vercel
        pass: process.env.EMAIL_PASS, // 🔹 Obtiene la variable desde Vercel
      },
    });

    await transporter.sendMail({
      from: `"Contacto Web" <${process.env.EMAIL_USER}>`,
      to: "tu-email@ejemplo.com",
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });

    return NextResponse.json({ message: "Mensaje enviado con éxito" }, { status: 200 });
  } catch (error) {
    console.error("Error en API:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
