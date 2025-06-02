"use client";
import PageContainer from '@/components/container/PageContainer';
import { getNotifications } from '@/lib/queries/getNotifications';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading/Loading';
import Error from '@/components/error/Error';
import NoData from '@/components/no-data/NoData';
import { formatDistanceToNowStrict } from 'date-fns';

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
        <p className="text-base font-semibold text-[#4c4c4c] mb-6">Total {notifications?.length} Notifications</p>
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
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification?._id}
                    className="bg-white flex justify-between items-center p-4 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-gray-800">{notification?.title}</p>
                      <p className="text-sm text-gray-600">{notification?.description}</p>

                    </div>
                    <span className="text-xs text-gray-400">
                      {notification?.createdAt ? formatDistanceToNowStrict(new Date(notification.createdAt), { addSuffix: true }) : ''}
                    </span>
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