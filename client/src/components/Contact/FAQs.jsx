import React from "react";

const FAQs = () => {
  const faqs = [
    {
      question: "What are the visiting hours?",
      answer:
        "General visiting hours are from 8:00 AM to 8:00 PM daily. ICU and special care units may have different visiting hours. Please check with the nursing station for specific unit policies.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "We accept most major insurance plans. Please contact our financial services department at (555) 123-4567 to verify your coverage and benefits before your visit.",
    },
    {
      question: "How do I request medical records?",
      answer:
        "Medical records can be requested through our Health Information Management department. You can call (555) 123-4567 or visit our website to download the medical records request form.",
    },
  ];

  return (
    <div className="px-4 py-10 mx-auto bg-(--color-bg) ">
      <div className="md:w-6/10 flex flex-col gap-4 my-8 px-4 mx-auto">
        <h2 className="font-bold text-3xl text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-8 justify-center items-center">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-2xl bg-(--color-surface)"
            >
              <h3 className="font-bold md:font-medium">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
