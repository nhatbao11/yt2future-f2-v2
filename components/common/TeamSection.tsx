import MemberCard from '../partials/MemberCard';

export default function TeamSection() {
  return (
    <section className="py-24 max-w-360 mx-auto px-6 md:px-12 bg-white">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">
          Core Founders
        </h2>
        <div className="w-16 h-1.5 bg-yellow-500 mx-auto mt-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        <MemberCard
          name="Trần Minh Nhật"
          role="Founder"
          image="/Nhat.jpg"
          field="thị trường chứng khoán"
        />
        <MemberCard
          name="Phạm Phương Nga"
          role="Co-Founder"
          image="/Nga.jpg"
          field="thị trường Crypto"
        />
        <MemberCard
          name="Nguyễn Nhất Bảo"
          role="Co-Founder"
          image="/Bao.jpg"
          field="kinh tế vĩ mô"
        />
      </div>
    </section>
  );
}