import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import {
  AntDesignOutlined,
  FireOutlined,
  PicCenterOutlined,
} from '@ant-design/icons';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import StoreLayoutContainer from 'layouts/store/store.layout';
import {
  getCategoyList,
  getProductListFearture,
  getSliderList,
} from './service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateFormat, MoneyFormat } from 'components/format';
import axios from 'axios';
import axiosClient from 'util/axiosClient';
import { getBlogList } from '../blog/service';
import Paragraph from 'antd/lib/skeleton/Paragraph';


const HomePage = () => {
  //redux
  const user = useSelector((state) => state.user);
  console.log(user);

  //Hook
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sliders, setSliders] = useState();
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  //Method
  const getSliders = () => {
    getSliderList({ limit: 10 })
      .then((result) => {
        setSliders(result);
      })
      .catch((e) => console.log(e));
  };
  const getPosts = () => {
    getBlogList({
      limit: 4,
      sortedBy: 'updatedAt_desc',
      status: true,
      featured: true,
    })
      .then((result) => {
        const posts = result.posts;
        console.log(result);
        for (const post of posts) {
          post.thumbnail = 'url(' + post.thumbnail + ')';
        }
        setPosts(posts);
      })
      .catch((e) => console.log(e));
  };
  const getProducts = () => {
    getProductListFearture({ perPage: 10, page: 1 })
      .then((result) => {
        console.log('result', result);
        setProducts(result?.list);
      })
      .catch((e) => console.log(e));
  };
  const getCategories = () => {
    getCategoyList()
      .then((result) => {
        setCategories(result?.categories);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Effect
  useEffect(() => {
    getProducts();
    getCategories();
    getSliders();
    getPosts();
  }, []);

  console.log(posts);
  return (
    <>
      {/* <WrapperConentContainer className="home-sliders">
        { <Row style={{ height: '100%' }}>
          <Col className="slider-main" span={16}>
            <Carousel style={{ width: '98.5%' }} autoplay>
              {sliders &&
                sliders.map((slider) => (
                  <a
                    style={{ borderRadius: '10px', display: 'block' }}
                    href={slider.backlink}
                  >
                    <Image
                      preview={false}
                      style={{ borderRadius: '10px' }}
                      height={'35vh'}
                      src={slider.image.img}
                    />
                  </a>
                ))}
            </Carousel>
          </Col>
          <Col className="slider-sides" span={8}>
            <Row style={{ height: '100%' }} gutter={[0, 10]}>
              <Col className="slider-side" span={24}>
                <a href={sliders && sliders[0]?.backlink}>
                  <img src={sliders && sliders[0]?.image?.img} />
                </a>
              </Col>
              <Col className="slider-side slider-side-bottom" span={24}>
                <a href={sliders && sliders[1]?.backlink}>
                  <img src={sliders && sliders[1]?.image?.img} />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>  */}

      <WrapperConentContainer className="home-sliders">
        {
          <Row style={{ height: '100%' }} justify="center">
            <h1
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '22px',
              }}
            >
              HỆ THỐNG SHOP CỬA HÀNG THỨC ĂN CHO CHIM CẢNH
            </h1>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
              }}
            >
              Chào mừng đến với hệ thống cửa hàng thức ăn chim cảnh! Chúng tôi
              tự hào là một hệ thống cửa hàng đáng tin cậy và chuyên nghiệp
              chuyên cung cấp thực phẩm chất lượng cao cho chim cảnh yêu quý của
              bạn. Với đội ngũ nhân viên giàu kinh nghiệm và yêu thương động
              vật, chúng tôi cam kết mang đến cho bạn những sản phẩm tốt nhất để
              nuôi dưỡng và chăm sóc sức khỏe cho các loài chim cảnh.
            </p>

            <Col className="slider-main" span={24}>
              {/* Chèn video từ YouTube vào đây */}
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/lrwAgmZYi_s"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer;
         autoplay; clipboard-write; 
         encrypted-media; gyroscope;
          picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </Col>
          </Row>
        }
      </WrapperConentContainer>
      {/* <Row className="home-posts">
        <Col span={16} offset={4}>
          <a onClick={() => navigate(`/blog/${posts && posts[0]._id}`)}>
            <div
              className="post-lasted"
              style={{
                // backgroundImage: `linear-gradient(to right, #23252627, #41434525), url(${
                //   posts && posts[0].thumbnail
                // })`,

                backgroundImage: posts ? posts[0].thumbnail : undefined,
              }}
            >
              <div className="post-content">
                <Typography.Title level={3} className="post-title">
                  {posts && posts[0].title}
                </Typography.Title>
                <Typography.Text className="post-info">
                  Bởi <a href="#">{posts && posts[0].author}</a> -{' '}
                  <DateFormat>{posts && posts[0].updatedAt}</DateFormat>
                </Typography.Text>
              </div>
            </div>
          </a>
        </Col>
      </Row> */}
      {/* <Row className="home-posts-feature">
        <Col span={16} offset={4}>
          <Row justify="space-between" style={{ height: '100%' }}>
            {posts &&
              posts.map((post, index) => (
                <Col flex={'24.5%'}>
                  <a onClick={() => navigate(`/blog/${post?._id}`)}>
                    <div
                      className="post-lasted"
                      style={{
                        backgroundImage: post?.thumbnail,
                      }}
                    >
                      <div className="post-content post-feature">
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 2,
                            // expandable: true,
                          }}
                          className="post-title-feature"
                        >
                          {post?.title}
                        </Typography.Paragraph>
                        <Typography.Text className="post-info post-info-feature">
                          Bởi <a href="#">{post?.author}</a> -{' '}
                          <DateFormat>{post?.updatedDate}</DateFormat>
                        </Typography.Text>
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
          </Row>
        </Col>
      </Row> */}
      <WrapperConentContainer className="home-categories">
        {/* <Row className="categories-content">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
            }}
          >
            <AntDesignOutlined
              style={{
                fontSize: '32px',
                marginRight: '5px',
                color: '#3f6600',
              }}
            />
            Danh mục sản phẩm
          </h2>
          <Divider style={{ margin: '18px 0' }} />
          <Row justify="space-evenly" style={{ width: '100%' }}>
            {categories.map((item, index) => (
              <Col span={2}>
                <a onClick={() => navigate(`/product-list/${item._id}`)}>
                  <Card
                    className="custom-card"
                    hoverable={false}
                    bordered={false}
                    cover={
                      <img
                        style={{
                          width: '70%',
                          height: '110px',
                          objectFit: 'cover',
                          margin: '0 auto',
                        }}
                        alt="example"
                        src={dataListCates[index].imgLink}
                      />
                    }
                  >
                    <a
                      style={{ color: '#646464', fontSize: '1.5rem' }}
                      href={`/product-list/${item._id}`}
                    >
                      {item.name}
                    </a>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </Row> */}
      </WrapperConentContainer>
      <WrapperConentContainer className="home-products-featured">
        <Row className="products-content">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
            }}
          >
            <FireOutlined
              style={{
                fontSize: '21px',
                padding: '4px',
                marginRight: '5px',
                color: 'red',
                border: '3px solid red',
                borderRadius: '100%',
              }}
            />
            CÁC SẢN PHẨM BÁN CHẠY
          </h2>
          <Divider style={{ margin: '18px 0' }} />
          <Row justify="space-evenly">
            {products.map((item) => (
              <Col flex={'22%'} style={{ marginBottom: '30px' }}>
                <Card
                  className="product-card"
                  hoverable={false}
                  bordered={false}
                  cover={
                    <a onClick={() => navigate(`/product-detail/${item._id}`)}>
                      <img
                        style={{
                          width: '100%',
                          height: '190px',
                          // objectFit: 'cover',
                          margin: '0 auto',
                        }}
                        
                        alt="example"
                        src={
                          item.image
                        }
                      />
                    </a>
                  }
                >
                  <Typography.Paragraph
                    className="home-product-title"
                    ellipsis={{
                      rows: 2,
                      // expandable: true,
                    }}
                  >
                    <a onClick={() => navigate(`/product-detail/${item._id}`)}>
                      {item.productName}
                    </a>
                  </Typography.Paragraph>
                  <Typography.Text className="product-price">
                    <MoneyFormat>{item.price}</MoneyFormat>
                  </Typography.Text>
                  <Rate className="product-rate" value={4} />
                </Card>
              </Col>
            ))}
          </Row>
          {/* <Row style={{ width: '100%' }}>
            <Col style={{ textAlign: 'center' }} span={24}>
              <Button danger>Xem thêm</Button>
            </Col>
          </Row> */}
        </Row>
      </WrapperConentContainer>
    </>
  );
};

export default HomePage;
