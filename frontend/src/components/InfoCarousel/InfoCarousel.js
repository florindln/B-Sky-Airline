import React, { useState } from "react";
import "./InfoCarousel.css";
import Carousel from "react-elastic-carousel";

function InfoCarousel(props) {
  const [items, setItems] = useState([
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ]);

  return (
    <div>
      {/* <Carousel>
        { <img src="https://picsum.photos/50" alt="" />
        <img src="https://picsum.photos/50" alt="" />
        <img src="https://picsum.photos/50" alt="" /> }
        {items.map(item => <div key={item.id}>{item.title}</div>)}
      </Carousel>
       */}
      <Carousel
        // itemsToShow={}
        onChange={(currentItem, pageIndex) =>
          // alert(pageIndex)
          props.onSelectPic(pageIndex)
        }
      >
        <div class="text-white" style={{opacity:"0.9"}}><h3>Explore new places</h3></div>
        <div class="text-danger" style={{opacity:"0.9"}}><h3>Travel with your friends and family</h3></div>
        <div class="text-success"><h3>Incredible destinations</h3></div>
      
      </Carousel>
    </div>
  );
}

export default InfoCarousel;
