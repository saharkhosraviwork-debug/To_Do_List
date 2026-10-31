
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // بررسی معتبر بودن ایمیل یا شماره موبایل
  const validatePhone = (value) => {
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return phoneRegex.test(value) || emailRegex.test(value);
  };

  // تغییر مقدار نام
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);

    setErrors({
      ...errors,
      fullname: "",
    });
  };

  // تغییر مقدار ایمیل یا شماره
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPhone(value.slice(0, 11));
    } else {
      setPhone(value);
    }

    setErrors({
      ...errors,
      phone: "",
    });
  };

  // بررسی اطلاعات هنگام ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname =
        "*لطفاً نام و نام خانوادگی خود را وارد کنید.";
    }

    if (!phone.trim()) {
      newErrors.phone =
        "*لطفاً ایمیل یا شماره تلفن خود را وارد کنید.";
    } else if (!validatePhone(phone.trim())) {
      newErrors.phone = "ایمیل یا شماره موبایل معتبر نیست.";
    }

    setErrors(newErrors);

    // اگر اطلاعات معتبر باشند، انتقال به صفحه Home
    if (Object.keys(newErrors).length === 0) {
      navigate("/home", {
        state: {
          fullname: fullname.trim(),
        },
      });
    }
  };

  return (
    <>
      {/* سربرگ صفحه ورود */}
      <div className="bg-blue relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-bl-[55px]">
        <h1 className="relative z-10 text-[20px] font-bold text-white">
          ورود به پنل برنامه ریزی
        </h1>

        <p className="relative z-10 mt-3 text-[13px] leading-6 text-icon">
          جهت ورود ثبت نام کنید
        </p>
      </div>

      {/* فرم ورود */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-[85%] mt-[22px] flex flex-col gap-[15px] mx-auto"
      >
        {/* نام و نام خانوادگی */}
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
            className={`h-11 w-full flex items-center rounded-[18px] border bg-input pr-[40px] pl-3 text-[12px] text-black outline-none transition focus:ring-2 focus:ring-blue-100 ${
              errors.fullname
                ? "border-danger"
                : "border-gray-300 focus:border-[#10245c]"
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

        {/* ایمیل یا شماره تلفن */}
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
            className={`h-11 w-full flex items-center rounded-[18px] border bg-input pr-[40px] pl-3 text-[12px] text-black outline-none transition focus:ring-2 focus:ring-blue-100 ${
              errors.phone
                ? "border-danger"
                : "border-gray-300 focus:border-[#10245c]"
            }`}
          />

          <div className="h-4">
            {errors.phone && (
              <p className="mt-0.5 text-[10px] text-danger">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* دکمه تأیید */}
        <button
          type="submit"
          className="h-11 w-full rounded-[18px] bg-blue text-[18px] text-white transition cursor-pointer hover:bg-[#193777]"
        >
          تایید
        </button>
      </form>

      {/* شبکه‌های اجتماعی */}
      <div className="mt-12 flex justify-center gap-[28px]">
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer"
          className="flex h-13 w-13 items-center justify-center rounded-[16px] border border-gray-300 text-blue-900"
        >
          <FaTwitter size={28} />
        </a>

        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="flex h-13 w-13 items-center justify-center rounded-[16px] border border-gray-300 text-pink-500"
        >
          <FaInstagram size={28} />
        </a>
      </div>
    </>
  );
}
