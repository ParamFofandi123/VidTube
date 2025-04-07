import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumnail1 from "../../assets/thumbnail1.png";
import thumnail2 from "../../assets/thumbnail2.png";
import thumnail3 from "../../assets/thumbnail3.png";
import thumnail4 from "../../assets/thumbnail4.png";
import thumnail5 from "../../assets/thumbnail5.png";
import thumnail6 from "../../assets/thumbnail6.png";
import thumnail7 from "../../assets/thumbnail7.png";
import thumnail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
export const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {

    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then(response=>response.json())
      .then((data) => setData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, [category])
  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>
              {item.snippet.title}
            </h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow() }</p>
          </Link>
        )
      })}
    </div>
  );
};

export default Feed;
