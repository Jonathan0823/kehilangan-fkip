import axios from "axios";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";

interface Notification {
  author: {
    image: string;
  };
  title: string;
  description: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const post = async () => {
      try {
        const result = await axios.get("/api/postList");
        setNotifications(result.data);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else {
          throw new Error(String(e));
        }
      }
    };
    post();
  }, []);

  return (
    <div className="relative">
      <button
        name="notification"
        title="Notifications"
        onClick={() => setIsOpen(!isOpen)}
        className="  p-2 rounded-full focus:outline-none"
      >
        <FaBell size={25} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="py-2">
            <div className="px-4 py-2 border-b">Notifikasi</div>
            <ul className="max-h-48 overflow-y-auto">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-4 py-2 flex items-center space-x-3"
                >
                  <Image
                    width={32}
                    height={32}
                    src={notification.author.image}
                    className="h-8 w-8 rounded-full"
                    alt="Profile"
                  />
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
