
import { useEffect, useState } from 'react';
import { ICleanedFeed, IRawFeed, IFeedSnapshot } from 'src/types/feed.type';
import { countDecimalDigits } from 'src/utility/number';
import { cleanFeedData, groupByTickSize } from 'src/utility/feed';
import { PUBLIC_BOOK_FEED, PUBLIC_BOOK_FEED_SNAPSHOT } from 'src/constants/api-constants';

interface SocketMessage {
  event: string;
  feed: string;
  product_ids: string[]
}

interface WebSocketState {
  socket: WebSocket | null;
  error: unknown;
  data: ICleanedFeed | null
}

const useFeed = (url: string, ticker: string, tickSize: number) => {
  const [rawFeedData, setRawFeedData] = useState<IRawFeed>();
  const [cleanedFeedData, setCleanedFeedData] = useState<ICleanedFeed>();
  
  const [feed, setFeed] = useState<WebSocketState>({
    socket: null,
    error: null,
    data: null,
  });

  const initSocket = () => {
    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      setFeed({ ...feed, socket: websocket });
    };

    websocket.onmessage = (event) => {
      const data: IFeedSnapshot = JSON.parse(event.data);
      const decimalPlace = countDecimalDigits(tickSize);

      // Handle incoming messages here
      switch (data.feed) {
        case PUBLIC_BOOK_FEED_SNAPSHOT: {
          const dateStamp = new Date();

          const rawFeed = {
            ...data,
            asks: cleanFeedData(data.asks, dateStamp, decimalPlace),
            bids: cleanFeedData(data.bids, dateStamp, decimalPlace),
          };

          setRawFeedData(rawFeed); // TODO: use this later

          const cleanedFeed = groupByTickSize({
            asks: data.asks,
            bids: data.bids,
            ticker: ticker, // Get from props
            tickSize: tickSize,// Get from props
            dateStamp,
            decimalPlace, 
          });

          setCleanedFeedData(cleanedFeed); // TODO: use this later
          
          setFeed({ ...feed, data: cleanedFeed });
          break;
        }
        case PUBLIC_BOOK_FEED: {
          // Handle change data in here
          break;
        }
    }
  }

    websocket.onclose = () => {
      setFeed({ ...feed, socket: null });
    };

    websocket.onerror = (error) => {
      setFeed({ ...feed, error: 'Socket failed' });
    };

    return websocket;
  };

  const closeSocket = (ws: WebSocket) => {
    ws.close();
  };

  const emit = (message: SocketMessage) => {
    if (feed.socket && feed.socket.readyState === WebSocket.OPEN) {
      feed.socket.send(JSON.stringify(message));
    }
  };
  
  useEffect(() => {
    const websocket = initSocket();

    return () => {
      closeSocket(websocket);
    };
  }, [url]);

  return {
    feed,
    emit,
  };
};

export default useFeed;

