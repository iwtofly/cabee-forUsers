import React from 'react';

import Swiper from './swiper.js'
import './swiper.css'


var MySwiper = React.createClass({
  getInitialState: function() {
     return{
      imgs:this.props.imgs
     }
  },
  componentDidMount: function() {
    this.setSwiper();
  },
  setSwiper:function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        loop: true,
        paginationClickable: true,
        lazyLoading : true,
    });    
  },
  render: function() {
    var that = this;
    return (  
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            this.state.imgs.map(function(img) {
              return (
                <div key={img.id} className="swiper-slide">
                  <img data-src={img.thumb} className="swiper-lazy" />
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination">
          {
            this.state.imgs.map(function(img) {
              return <span key={img.id} className="swiper-pagination-bullet"></span>;
            })
          }
        </div>
      </div>
    );
  }
});

export default MySwiper;
