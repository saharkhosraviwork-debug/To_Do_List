import { useState } from "react";
import { User, Mail } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  // بررسی معتبر بودن ایمیل یا شماره موبایل
  const validatePhone = (value) => {
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return phoneRegex.test(value) || emailRegex.test(value);
  };

  // تغییر مقدار نام
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
    setErrors({ ...errors, fullname: "" });
  };

  // تغییر مقدار ایمیل یا شماره
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPhone(value.slice(0, 11));
    } else {
      setPhone(value);
    }

    setErrors({ ...errors, phone: "" });
  };

  // بررسی کردن  اطلاعات هنگام ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "*لطفاً نام و نام خانوادگی خود را وارد کنید.";
    }

    if (!phone.trim()) {
      newErrors.phone = "*لطفاً ایمیل یا شماره تلفن خود را وارد کنید.";
    } else if (!validatePhone(phone.trim())) {
      newErrors.phone = "ایمیل یا شماره موبایل معتبر نیست.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("اطلاعات با موفقیت ثبت شد.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center">
      <section className="w-full max-w-[330px] min-h-[620px] bg-background overflow-hidden rounded-2xl">
        <div className="bg-blue relative flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-bl-[55px]">
          <h1 className="relative z-10 text-[20px] font-bold text-white">
            ورود به پنل برنامه ریزی
          </h1>

          <p className="relative z-10 mt-3 text-[13px] leading-6 text-icon">
            جهت ورود ثبت نام کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6">
          {/*بخش نام و نام خانوادکی */}
          <div className="relative">
            <User
              size={19}
              className="absolute right-3 top-0 flex h-11 items-center text-icon pointer-events-none"
            />

            <input
              type="text"
              value={fullname}
              onChange={handleFullnameChange}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              aria-label="نام و نام خانوادگی"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullname)}
              className={`h-11 w-full  flex items-center rounded-[20px] border bg-input pr-10 pl-3  text-[13px] text-black outline-none transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                errors.fullname
                  ? "border-danger"
                  : "border-gray-300 focus:border-[#10245c] "
              }`}
            />

            <div className="h-4">
              {errors.fullname && (
                <p className="mt-0.5 text-[10px] text-danger">
                  {errors.fullname}
                </p>
              )}
            </div>
          </div>

          {/* بخش واردکردن شماره یا ایمیل */}
          <div className="relative">
            <Mail
              size={19}
              className="absolute right-3 top-0 flex h-11 items-center justify-center text-icon pointer-events-none"
            />

            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="ایمیل / شماره تلفن خود را وارد کنید"
              aria-label="ایمیل یا شماره تلفن"
              autoComplete="email"
              aria-invalid={Boolean(errors.phone)}
              className={`mt-2 h-11 flex items-center w-full rounded-[20px] border bg-input pr-10 pl-3  text-[13px] text-black outline-none transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                errors.phone
                  ? "border-danger"
                  : "border-gray-300 focus:border-[#10245c]"
              }`}
            />

            <div className="h-4">
              {errors.phone && (
                <p className="mt-0.5 text-[10px] text-danger">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* دکمه تأیید */}
          <button
            type="submit"
            className="mt-0.5 h-12 w-full rounded-[20px] bg-blue text-[18px] text-white transition cursor-pointer hover:bg-[#193777]"
          >
            تایید
          </button>
        </form>

        <div className="mt-11 flex justify-center gap-6">
          <a
            href="https://twitter.com/"
            className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-gray-300 text-blue-900"
          >
            <FaTwitter size={28} />
          </a>

          <a
            href="https://instagram.com/"
            className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-gray-300 text-pink-500"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </section>
    </main>
  );
}
