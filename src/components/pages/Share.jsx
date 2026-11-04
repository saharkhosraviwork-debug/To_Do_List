import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import AddButton from "../public/FloatingButton.jsx";

import {
  ArrowLeft,
  Bell,
  Search,
  Mail,
  Phone,
  X,
  ChevronDown,
} from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "فاطمه محمدی",
    phone: "09115657844",
    image: "/image/person1.svg",
  },
  {
    id: 2,
    name: "مریم عزیزی",
    phone: "09123652588",
    image: "/image/person1.svg",
  },
  {
    id: 3,
    name: "علی رستمی",
    phone: "09139602325",
    image: "/image/person2.svg",
  },
  {
    id: 4,
    name: "معصومه علیزاده",
    phone: "09389688166",
    image: "/image/person1.svg",
  },
  {
    id: 5,
    name: "سارا محمدی",
    phone: "09135525288",
    image: "/image/person1.svg",
  },
  {
    id: 6,
    name: "امیر اسلامی",
    phone: "09172327203",
    image: "/image/person2.svg",
  },
];

export default function Share({ showModal, setShowModal }) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [activeTab, setActiveTab] = useState("messages");
  const [showContacts, setShowContacts] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [messagesList, setMessagesList] = useState(() => {
    const savedMessages = localStorage.getItem("shareMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [callsList, setCallsList] = useState(() => {
    const savedCalls = localStorage.getItem("shareCalls");
    return savedCalls ? JSON.parse(savedCalls) : [];
  });

  // ذخیره پیام‌ها
  useEffect(() => {
    localStorage.setItem("shareMessages", JSON.stringify(messagesList));
  }, [messagesList]);

  // ذخیره تماس‌ها
  useEffect(() => {
    localStorage.setItem("shareCalls", JSON.stringify(callsList));
  }, [callsList]);

  // ساعت سیستم
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // انیمیشن مودال
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 10);

      return () => clearTimeout(timer);
    }

    setIsModalOpen(false);
  }, [showModal]);

  // باز کردن مودال
  const openModal = () => {
    setMessage("");
    setSelectedContact("");
    setShowContacts(false);
    setShowModal(true);
  };

  // بستن مودال
  const closeModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
    setMessage("");
    setSelectedContact("");
    setShowContacts(false);
  };

  const selectContact = (contactId) => {
    setSelectedContact(contactId);
    setShowContacts(false);
  };

  const selectedContactData = contacts.find(
    (contact) => contact.id === Number(selectedContact)
  );

  const sendMessage = () => {
    if (!selectedContactData || message.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      contact: selectedContactData,
      text: message.trim(),
      time: getCurrentTime(),
    };

    setMessagesList((prev) => [newMessage, ...prev]);
    closeModal();
  };

  const callContact = () => {
    if (!selectedContactData) return;

    const newCall = {
      id: Date.now(),
      contact: selectedContactData,
      time: getCurrentTime(),
    };

    setCallsList((prev) => [newCall, ...prev]);
    closeModal();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchText("");
  };

  const searchValue = searchText.trim().toLowerCase();

  // فیلتر پیام‌ها بر اساس نام یا شماره
  const filteredMessages = messagesList.filter((item) => {
    const name = item.contact.name.toLowerCase();
    const phone = item.contact.phone;

    return name.includes(searchValue) || phone.includes(searchText.trim());
  });

  // فیلتر تماس‌ها بر اساس نام یا شماره
  const filteredCalls = callsList.filter((item) => {
    const name = item.contact.name.toLowerCase();
    const phone = item.contact.phone;

    return name.includes(searchValue) || phone.includes(searchText.trim());
  });

  return (
    <div className="relative flex flex-col flex-1 min-h-0 w-full bg-white">
      <div className="relative bg-blue text-white px-5 pt-5 pb-6 rounded-bl-[55px] shrink-0 h-[210px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleSearch} className="cursor-pointer">
              {showSearch ? <X size={21} /> : <Search size={21} />}
            </button>

            <button className="cursor-pointer">
              <Bell size={21} />
            </button>
          </div>

          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeft size={21} />
          </button>
        </div>

        <h2 className="text-center mt-4 text-[16px] font-semibold">دوستان</h2>

        {/*  قسمت تب‌ها  */}
        <div className="flex items-center bg-[#253D78] rounded-[6px] p-2 mt-10">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 py-2 rounded-md text-[13px] transition cursor-pointer ${
              activeTab === "contacts"
                ? "bg-[#405993] text-white"
                : "text-white/70"
            }`}
          >
            تماس‌ها
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-2 rounded-md text-[13px] transition cursor-pointer ${
              activeTab === "messages"
                ? "bg-[#405993] text-white"
                : "text-white/70"
            }`}
          >
            پیام‌ها
          </button>
        </div>
      </div>

      {/* کادربرای  جست‌وجو */}
      {showSearch && (
        <div className="px-4 pt-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="جست‌وجو کنید..."
            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue"
          />
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-1 pb-15">
        {activeTab === "messages" &&
          filteredMessages.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 py-2 px-2 border-b border-gray-100 rounded-xl transition ${
                searchValue !== "" ? "bg-blue/10" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.contact.image}
                  alt={item.contact.name}
                  className="w-[48px] h-[48px] rounded-full object-cover shrink-0"
                />

                <div className="text-right">
                  <p className="text-[13px] text-black font-medium">
                    {item.contact.name}
                  </p>

                  <p className="text-[12px] text-gray-400 mt-1 truncate">
                    {item.text}
                  </p>
                </div>
              </div>

              <span className="text-[12px] text-gray-300 shrink-0">
                {item.time}
              </span>
            </div>
          ))}

        {activeTab === "contacts" &&
          filteredCalls.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 py-2 px-2 border-b border-gray-100 rounded-xl transition ${
                searchValue !== "" ? "bg-blue/10" : ""
              }`}
            >
              <div className="flex items-center gap-3 ">
                <img
                  src={item.contact.image}
                  alt={item.contact.name}
                  className="w-[48px] h-[48px] rounded-full object-cover shrink-0"
                />

                <div className="text-right ">
                  <p className="text-[14px] text-black font-medium">
                    {item.contact.name}
                  </p>

                  <p className="text-[12px] text-gray-400 mt-1">
                    {item.contact.phone}
                  </p>
                </div>
              </div>

              <span className="text-[12px] text-gray-300 shrink-0">
                {item.time}
              </span>
            </div>
          ))}

        {searchValue !== "" &&
          ((activeTab === "messages" && filteredMessages.length === 0) ||
            (activeTab === "contacts" && filteredCalls.length === 0)) && (
            <p className="text-center text-sm text-gray-400 mt-8">
              مخاطبی با این مشخصات پیدا نشد.
            </p>
          )}
      </div>

      {!showModal && (
        <AddButton
          icon={activeTab === "messages" ? Mail : Phone}
          size={22}
          onClick={openModal}
        />
      )}

      {/* مودال */}
      {showModal && (
        <div
          className="absolute inset-0 z-50 bg-black/40 flex items-end overflow-hidden"
          onClick={closeModal}
        >
          <div
            className={`bg-white w-full rounded-t-3xl p-5 transform transition-transform duration-300 ease-out ${
              isModalOpen ? "translate-y-0" : "translate-y-full"
            } ${activeTab === "contacts" ? "min-h-[280px]" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[15px]">
                {activeTab === "messages" ? "ارسال پیام" : "تماس با مخاطب"}
              </h3>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowContacts(!showContacts)}
                className="relative w-full border border-gray-300 bg-input rounded-[18px] p-3 text-sm"
              >
                <ChevronDown
                  size={19}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${
                    showContacts ? "rotate-180" : ""
                  }`}
                />

                <span className="block text-right text-gray-800">
                  {selectedContactData
                    ? selectedContactData.name
                    : "انتخاب مخاطب"}
                </span>
              </button>

              {/* فهرست مخاطبان */}
              {showContacts && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => selectContact(contact.id)}
                      className="w-full flex items-center justify-between gap-3 px-3 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={contact.image}
                          alt={contact.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />

                        <span className="text-[12px] text-gray-800 whitespace-nowrap">
                          {contact.name}
                        </span>
                      </div>

                      <span className="text-[11px] text-gray-400 shrink-0">
                        {contact.phone}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {activeTab === "messages" && (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام را وارد کنید"
                className="w-full border border-gray-300 bg-input rounded-[18px] p-2.5 mt-4 outline-none text-sm resize-none"
                rows={3}
              />
            )}

            {activeTab === "messages" ? (
              <button
                type="button"
                onClick={sendMessage}
                className="w-full bg-blue text-white rounded-[18px] p-2.5 mt-5 cursor-pointer"
              >
                ارسال
              </button>
            ) : (
              <button
                type="button"
                onClick={callContact}
                className="w-full bg-blue text-white rounded-[18px] p-2.5 mt-5 cursor-pointer"
              >
                تماس
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
