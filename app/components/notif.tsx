import axios from "axios";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { timeAgo } from "@/lib/utils";

interface Notification {
  author: {
    name: string;
    image: string;
  };
  title: string;
  createdAt: string;
  image?: string;
}


export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [comments, setComments] = useState<[]>([]);
  const notif = async () => {
    const result = await axios("/api/postList");

    const data = await axios.get(`/api/comments/gerAll`);
    setComments(data.data);
    console.log(comments);
    const sortedNotifications = result.data.sort(
      (a: Notification, b: Notification) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setNotifications(sortedNotifications);
  };
  useEffect(() => {
    notif();
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full focus:outline-none"
        title="Open notifications"
      >
        <FaBell size={25} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-sky-300 rounded-lg w-full min-h-dvh md:min-h-screen max-w-md p-4 relative shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
            >
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Notifikasi
            </h2>

            <ul>
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-4 py-3 flex items-center justify-between rounded-lg mb-2 bg-white"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      width={40}
                      height={40}
                      src={notification.author.image}
                      className="h-10 w-10 rounded-full object-cover"
                      alt={notification.author.name}
                    />
                    <div>
                      <p className="text-sm font-medium">
                        <span className="font-bold">
                          {notification.author.name}
                        </span>{" "}
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {timeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>

                  {notification.image && (
                    <Image
                      width={40}
                      height={40}
                      src={notification.image}
                      className="h-12 w-12 rounded-lg object-cover ml-3"
                      alt="Item"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
