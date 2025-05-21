import PageContainer from '@/components/container/PageContainer';
import { notifications } from '@/data/data';
import React from 'react';



const NotificationPage = () => {
  return (
    <PageContainer>
        <h1 className="text-xl font-medium text-[#4c4c4c] mb-2">Notifications</h1>
      <div className="p-6">
        <p className="text-base font-semibold text-[#4c4c4c] mb-6">Total {notifications.length} Notifications</p>

        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-white flex justify-between items-center p-4 rounded-md shadow-sm text-[#4c4c4c]">
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default NotificationPage;
