export default function TeamReviewCTA() {
  return (
    <section className="py-20 bg-[#f8f7f4]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 md:p-16 text-center">
          <div className="text-4xl text-[#d89b2b]">✦</div>

          <h2 className="mt-6 text-4xl font-bold text-[#1d2233]">
            Want to Rate Our Team?
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Sign in and complete a booking to share your experience.
          </p>

          <button className="mt-8 inline-flex items-center justify-center rounded-full bg-[#d89b2b] px-8 py-4 text-white font-semibold hover:opacity-90 transition-opacity">
            Sign In to Review
          </button>
        </div>
      </div>
    </section>
  );
}