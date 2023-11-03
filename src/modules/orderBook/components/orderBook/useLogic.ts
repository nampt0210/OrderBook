import { useEffect } from "react";
import { BASE_URL, PI_XBTUSD, DEFAULT_TICKER_SIZE, PUBLIC_BOOK_FEED, SUBSCRIBE_EVENT } from "src/constants/api-constants";
import useFeed from "src/hooks/useFeed";

const useLogic = () => {
  const {
    feed: { data, socket },
    emit
  } = useFeed( BASE_URL, PI_XBTUSD, DEFAULT_TICKER_SIZE)

  useEffect(() => {
    if (socket) {
      // Send a message when the WebSocket is open
      emit({
        event: SUBSCRIBE_EVENT,
        feed: PUBLIC_BOOK_FEED,
        product_ids: [PI_XBTUSD]
      })
    }
  }, [socket])


  return {
    data
  }
}

export default useLogic;