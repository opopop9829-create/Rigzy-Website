import { useEffect, useState } from 'react';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

export default function YouTubeGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string>('');
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelHandle = 'OLLIDZ21'; // from provided URL

  useEffect(() => {
    if (!apiKey) {
      setError('YouTube API key missing');
      return;
    }
    const fetchChannelId = async () => {
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${channelHandle}&type=channel&maxResults=1`
      );
      const channelData = await channelRes.json();
      if (!channelData.items?.[0]?.id?.channelId) {
        setError('Unable to resolve channel ID');
        return;
      }
      return channelData.items[0].id.channelId as string;
    };

    const fetchVideos = async (channelId: string) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=5`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error.message || 'YouTube API error');
        return;
      }
      const vids: VideoItem[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      }));
      setVideos(vids);
    };

    (async () => {
      const channelId = await fetchChannelId();
      if (channelId) {
        await fetchVideos(channelId);
      }
    })();
  }, [apiKey]);

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((v) => (
        <a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-lg border border-zinc-800 hover:border-violet-500 transition-colors"
        >
          <div className="relative pb-[56.25%]">
            <img
              src={v.thumbnail}
              alt={v.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="mt-2 text-sm text-zinc-300 group-hover:text-white transition-colors">
            {v.title}
          </p>
        </a>
      ))}
    </div>
  );
}
