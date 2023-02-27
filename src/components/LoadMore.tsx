import { ShowToast } from "@/utils/message";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import React, { FC, useState } from "react";
import { sleep } from "antd-mobile/es/utils/sleep";

const LoadMore: FC<any> = ({
  refreshData, // 刷新接口
  loadDataByPage, // 加载更多接口
  children,
}) => {
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    loadDataByPage(
      () => {
        // await sleep(1000)
        // ShowToast('更多数据加载成功')
        setHasMore(true);
      },
      () => {
        // await sleep(1000)
        ShowToast("没有更多数据了");
        setHasMore(false);
      }
    );
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        refreshData();
        await sleep(1000);
      }}
    >
      {children}
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        threshold={500}
      ></InfiniteScroll>
    </PullToRefresh>
  );
};

export default LoadMore;
