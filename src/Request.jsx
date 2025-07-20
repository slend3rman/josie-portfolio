import React, { useState } from "react";

export default function Request() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    insta: "",
    description: "",
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((f) => ({
      ...f,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend
  }

  return (
    <section id="request" className="py-10 px-2 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Painting</h2>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold">Thank you for your request!</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Name*</label>
            <input name="name" required className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Email*</label>
            <input name="email" type="email" required className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Instagram (optional)</label>
            <input name="insta" className="w-full border rounded px-3 py-2" value={form.insta} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Request Description*</label>
            <textarea name="description" required className="w-full border rounded px-3 py-2" rows={3} value={form.description} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Image (optional)</label>
            <input name="image" type="file" accept="image/*" className="w-full" onChange={handleChange} />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit Request</button>
        </form>
      )}
    </section>
  );
}
