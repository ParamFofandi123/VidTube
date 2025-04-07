import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumnail1 from "../../assets/thumbnail1.png";
import thumnail2 from "../../assets/thumbnail2.png";
import thumnail3 from "../../assets/thumbnail3.png";
import thumnail4 from "../../assets/thumbnail4.png";
import thumnail5 from "../../assets/thumbnail5.png";
import thumnail6 from "../../assets/thumbnail6.png";
import thumnail7 from "../../assets/thumbnail7.png";
import thumnail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

export const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items) 
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((item,index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
