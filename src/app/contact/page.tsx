// src/app/contact/page.tsx
const Contact = () => {
    return (
      <div>
        <h1>Contact Me</h1>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  };
  
  export default Contact;