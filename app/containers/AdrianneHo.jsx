import React, { Component } from 'react';
import Title from '../components/Articles/Title.jsx'
import Intro from '../components/Articles/Intro.jsx'
import ParagraphImg from '../components/Articles/ParagraphImg.jsx'
import BottomTitle from '../components/Articles/BottomTitle.jsx'
import Paragraph from '../components/Articles/Paragraph.jsx'
import Video from '../components/Articles/Video.jsx'
import CarouselImg from '../components/Articles/CarouselImg.jsx'
import img18 from '../images/bottom-end.png';

//centimeter
const article13 = "http://resources.2ccm.net/article/001/" +  "article-001-013.JPG";

//first carousel
const img1 = "http://resources.2ccm.net/article/001/" +  "article-001-011.jpg";
const img2 = "http://resources.2ccm.net/article/001/" +  "article-001-010.jpg";
const img3 = "http://resources.2ccm.net/article/001/" +  "article-001-005.jpg";
const img4 = "http://resources.2ccm.net/article/001/" +  "article-001-001.jpg";

//second carousel
const img5 = "http://resources.2ccm.net/article/001/" +  "article-001-008.jpg";
const img6 = "http://resources.2ccm.net/article/001/" +  "article-001-012.jpg";
const img7 = "http://resources.2ccm.net/article/001/" +  "article-001-007.jpg";
const img8 = "http://resources.2ccm.net/article/001/" +  "article-001-004.jpg";
const img9 = "http://resources.2ccm.net/article/001/" +  "article-001-009.jpg";
const img10 = "http://resources.2ccm.net/article/001/" +  "article-001-003.jpg";


//poster carousel
const imgPoster1 = "http://resources.2ccm.net/article/001/" +  "article-poster-001.jpg";
const imgPoster2 = "http://resources.2ccm.net/article/001/" +  "article-poster-002.jpg";
const imgPoster3 = "http://resources.2ccm.net/article/001/" +  "article-poster-003.jpg";
const imgPoster4 = "http://resources.2ccm.net/article/001/" +  "article-poster-004.jpg";
const imgPoster5 = "http://resources.2ccm.net/article/001/" +  "article-poster-005.jpg";
const imgPoster6 = "http://resources.2ccm.net/article/001/" +  "article-poster-006.jpg";
const imgPoster7 = "http://resources.2ccm.net/article/001/" +  "article-poster-007.jpg";
const imgPoster8 = "http://resources.2ccm.net/article/001/" +  "article-poster-008.jpg";
const imgPoster9 = "http://resources.2ccm.net/article/001/" +  "article-poster-009.jpg";
const imgPoster10 = "http://resources.2ccm.net/article/001/" +  "article-poster-010.jpg";
const imgPoster11 = "http://resources.2ccm.net/article/001/" +  "article-poster-011.jpg";
const imgPoster12 = "http://resources.2ccm.net/article/001/" +  "article-poster-012.jpg";
const imgPoster13 = "http://resources.2ccm.net/article/001/" +  "article-poster-013.jpg";
const imgPoster14 = "http://resources.2ccm.net/article/001/" +  "article-poster-014.jpg";
const imgPoster15 = "http://resources.2ccm.net/article/001/" +  "article-poster-015.jpg";
const imgPoster16 = "http://resources.2ccm.net/article/001/" +  "article-poster-016.jpg";
const imgPoster17 = "http://resources.2ccm.net/article/001/" +  "article-poster-017.jpg";
const imgPoster18 = "http://resources.2ccm.net/article/001/" +  "article-poster-018.jpg";
const imgPoster19 = "http://resources.2ccm.net/article/001/" +  "article-poster-019.jpg";
const imgPoster20 = "http://resources.2ccm.net/article/001/" +  "article-poster-020.jpg";
const imgPoster21 = "http://resources.2ccm.net/article/001/" +  "article-poster-021.jpg";
const imgPoster22 = "http://resources.2ccm.net/article/001/" +  "article-poster-022.jpg";

const imgArray = [img1, img2, img3, img4,];
const imgArray2 = [img5, img6, img7, img8, img9, img10,];

const imgPosterArray = [imgPoster1, imgPoster11, imgPoster3, imgPoster4, imgPoster5, imgPoster6, imgPoster7, imgPoster8, imgPoster9,imgPoster10, imgPoster2,]
const imgPosterArray2= [imgPoster12, imgPoster17, imgPoster14, imgPoster15, imgPoster16, imgPoster13, imgPoster18, imgPoster19, imgPoster20, imgPoster21, imgPoster22,]

export default class AdrianneHo extends Component {

  render() {
    return (
      <div className="page page-2ccm-article">
        <Title titleValue="Adrianne Ho x 2ccm URBAN LOOKBOOK" />

        <Intro introValue="这次我们做了点提升2ccm品牌的大事儿。- 厘米哥" />

        <Video videoLink="http://video.2ccm.net/video/2ccm-adrianne-ho-android-phone.mp4" poster="http://video.2ccm.net/video/2ccm-adrianne-ho-poster.jpg" >
          <BottomTitle bottomTitleValue="Adrianne Ho x 2ccm URBAN LOOKBOOK" />
        </Video>

        <Paragraph paragraphValue="经过九年的发展，2ccm 迎来全面升级，我们不仅是微博 @2ccm，也是欧洲实体店 Centimeter。我们不仅有淘宝店铺「2ccm厘米哥」，也发布了首款独立App。" />

        <ParagraphImg paragraphImg={article13}>
          <BottomTitle bottomTitleValue="欧洲实体店 Centimeter" />
        </ParagraphImg>

        <Paragraph paragraphValue="我们邀请到「穿搭女神」Adrianne Ho 出镜，为季度新品打造全新性感特辑与概念影片。除了能让你看到我们精心搭配的型录之外，还代表了我们的 “Update” 态度：购物体验升级、店铺形象升级和视觉风格升级。" />

        <CarouselImg imgArray={imgArray}/>

        <Paragraph paragraphValue="潮流网站 HYPEBEAST 亦专篇报道：“围绕「Upgrade」的主题，采用「Lo-Fi」与「Hi-Fi」两种截然不同的风格交替呈现，通过古典韵味满载的欧式宫廷酒店，与前卫感十足的 Cyberpunk 空间行成了强烈视觉反差感。而一向以街头造型示人的 Adrainne Ho，也身着精选时尚奢品展现了自己非同寻常的一面，为大家呈现了一组动静结合的「次世代」视觉大片。”" />

        <CarouselImg imgArray={imgArray2}/>

        <Paragraph paragraphValue="发布新季度 LOOKBOOK 后，为 2ccm 打 call 的活动更是异常火爆，在这里也挑选了一些奉上。" />

        <CarouselImg imgArray={imgPosterArray}/>

        <CarouselImg imgArray={imgPosterArray2}/>

        <div className="article-end">
          <img src={img18} className="article-end-logo" height="18"/>
        </div>
      </div>
    );
  }
}
