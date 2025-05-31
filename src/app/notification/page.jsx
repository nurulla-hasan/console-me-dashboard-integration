"use client";
import PageContainer from '@/components/container/PageContainer';
import { getNotifications } from '@/lib/queries/getNotifications';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading/Loading';
import Error from '@/components/error/Error';
import NoData from '@/components/no-data/NoData';

const NotificationPage = () => {

  const {
    data: notificationsApiResponse, 
    isLoading,
    isError
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  const notifications = notificationsApiResponse?.data || []; 

  return (
    <PageContainer>
      <h1 className="text-xl font-medium text-[#4c4c4c] mb-2">Notifications</h1>
      <div className="p-6">
        <p className="text-base font-semibold text-[#4c4c4c] mb-6">Total {notifications.length} Notifications</p>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error itemName="notifications" />
        ) : (
          <>
            {notifications.length === 0 ? (
              <div className="flex justify-center items-center">
                <NoData message="No notifications available yet." />
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <div key={index} className="bg-white flex justify-between items-center p-4 rounded-md shadow-sm text-[#4c4c4c]">
                    <p className="text-sm">{notification?.message}</p>
                    {/* Assuming notification?.time exists, otherwise handle it */}
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notification?.time}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default NotificationPage;