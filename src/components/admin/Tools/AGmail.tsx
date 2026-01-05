"use client";

import React from "react";
import ABackButton from "./ABackButton";

const AGmail = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const recipients: string[] = [];
    form.querySelectorAll<HTMLInputElement>(".recipient").forEach((input) => {
      const val = input.value.trim();
      if (val) recipients.push(val);
    });

    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!recipients.length)
      return alert("Please enter at least one recipient.");
    if (!subject) return alert("Subject is required.");
    if (!message) return alert("Message is required.");

    const finalForm = new FormData();
    recipients.forEach((r) => finalForm.append("recipients[]", r));
    finalForm.append("subject", subject);
    finalForm.append("message", message);

    // Append attachments
    const attachmentInputs = form.querySelectorAll<HTMLInputElement>(
      'input[name="attachments[]"]'
    );
    attachmentInputs.forEach((input) => {
      if (input.files?.[0]) {
        finalForm.append("attachment", input.files[0]);
      }
    });

    const response = await fetch("/api/admin/tools/gmail", {
      method: "POST",
      headers: {
        "x-auth-secret": process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET || "",
      },
      body: finalForm,
    });

    if (response.ok) {
      alert("Email sent");
      form.reset();

      // Reset recipients
      const recipientContainer = document.getElementById("recipients");
      if (recipientContainer) {
        recipientContainer.innerHTML = "";
        recipientContainer.appendChild(createRecipientInput());
      }

      // Reset attachments
      const attachmentContainer = document.getElementById("attachments");
      if (attachmentContainer) {
        attachmentContainer.innerHTML = "";
        attachmentContainer.appendChild(createAttachmentInput());
      }
    } else {
      alert("Email not sent!");
    }
  };

  const createRecipientInput = (): HTMLElement => {
    const wrapper = document.createElement("div");
    wrapper.className = "recipient-wrapper flex gap-2 mt-2 items-center";

    const input = document.createElement("input");
    input.type = "email";
    input.name = "recipient";
    input.placeholder = "recipient@example.com";
    input.required = true;
    input.className =
      "recipient flex-1 bg-neutral-800 text-white p-3 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-500";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.innerText = "✕";
    removeBtn.className =
      "text-red-500 hover:text-red-700 px-2 font-bold text-xl";
    removeBtn.onclick = () => {
      const parent = wrapper.parentElement;
      if (parent && parent.children.length > 1) {
        parent.removeChild(wrapper);
      }
    };

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    return wrapper;
  };

  const createAttachmentInput = (): HTMLElement => {
    const wrapper = document.createElement("div");
    wrapper.className = "attachment-wrapper flex gap-2 mt-2 items-center";

    // Add a flex-1 wrapper to contain the input responsively
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "flex-1 min-w-0";

    const input = document.createElement("input");
    input.type = "file";
    input.name = "attachments[]";
    input.className =
      "w-full bg-neutral-900 text-white p-2 rounded border border-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-700 file:text-white hover:file:bg-sky-800";

    inputWrapper.appendChild(input);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.innerText = "✕";
    removeBtn.className =
      "text-red-500 hover:text-red-700 px-2 font-bold text-xl shrink-0";
    removeBtn.onclick = () => {
      const parent = wrapper.parentElement;
      if (parent && parent.children.length > 1) {
        parent.removeChild(wrapper);
      }
    };

    wrapper.appendChild(inputWrapper);
    wrapper.appendChild(removeBtn);
    return wrapper;
  };

  const addRecipient = () => {
    const container = document.getElementById("recipients");
    container?.appendChild(createRecipientInput());
  };

  const addAttachment = () => {
    const container = document.getElementById("attachments");
    container?.appendChild(createAttachmentInput());
  };

  return (
    <div className="w-full px-4 py-6 md:max-w-2xl mx-auto">
    <ABackButton />
      <div className="mb-8 flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <path fill="#EA4335" d="M24 24L4 12v24l20-12z" />
          <path fill="#FBBC05" d="M24 24l20 12V12L24 24z" />
          <path fill="#34A853" d="M4 12l20 12L44 12H4z" />
          <path fill="#4285F4" d="M4 36l20-12 20 12H4z" />
        </svg>
        <h1 className="text-3xl font-bold tracking-wide flex flex-wrap">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>m</span>
          <span style={{ color: "#FBBC05" }}>a</span>
          <span style={{ color: "#34A853" }}>i</span>
          <span style={{ color: "#EA4335" }}>l</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Recipients */}
        <div className="w-full">
          <label className="block text-sm text-neutral-400 mb-1">
            Recipients
          </label>
          <div id="recipients" className="space-y-2">
            <div className="recipient-wrapper flex gap-2 items-center">
              <input
                type="email"
                name="recipient"
                required
                placeholder="recipient@example.com"
                className="recipient flex-1 bg-neutral-800 text-white p-3 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addRecipient}
            className="text-sm text-sky-400 hover:underline mt-2 cursor-pointer"
          >
            + Add another recipient
          </button>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            required
            placeholder="Enter subject"
            className="w-full bg-neutral-800 text-white p-3 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Message</label>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="Write your message..."
            className="w-full bg-neutral-800 text-white p-3 rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
          ></textarea>
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Attachments (optional)
          </label>
          <div id="attachments" className="space-y-2">
            {/* First permanent file input (no ✕ button) */}
            <div className="attachment-wrapper flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <input
                  type="file"
                  name="attachments[]"
                  className="w-full bg-neutral-900 text-white p-2 rounded border border-neutral-600
            file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
            file:bg-sky-700 file:text-white hover:file:bg-sky-800"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={addAttachment}
            className="text-sm text-sky-400 hover:underline mt-2 cursor-pointer"
          >
            + Add another file
          </button>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-900 cursor-pointer active:bg-sky-950 border border-sky-700 text-white px-6 py-3 rounded-md font-medium transition w-full sm:w-auto"
          >
            Send Email
          </button>
        </div>
      </form>
      {/* Security Notice */}
      <div className="mt-8 p-4 bg-neutral-900/50 border border-neutral-700 rounded-lg">
        <h3 className="text-sm font-medium text-neutral-300 mb-1 flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Security Notice
        </h3>
        <p className="text-xs text-neutral-400">
          This tool sends emails through your admin account. All messages are logged for security purposes.
          Do not share sensitive information via this interface.
        </p>
      </div>
    </div>
  );
};

export default AGmail;
