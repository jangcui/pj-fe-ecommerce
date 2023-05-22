import { Layout, Menu } from 'antd'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import {
   AiOutlineBell,
   AiOutlineBgColors,
   AiOutlineDashboard,
   AiOutlineMenuFold,
   AiOutlineMenuUnfold,
   AiOutlineShoppingCart,
} from 'react-icons/ai'
import { BiCategory, BiCategoryAlt, BiColorFill } from 'react-icons/bi'
import { FaBlog, FaBlogger, FaClipboardList, FaListAlt, FaTrashAlt } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { RiCoupon2Line, RiCoupon3Line, RiCoupon4Fill, RiProductHuntLine } from 'react-icons/ri'
import { SiBlogger, SiBrandfolder, SiProducthunt } from 'react-icons/si'
import { TbBrandShopee } from 'react-icons/tb'
import { Route, Routes, useNavigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout

import Image from '~/components/Image/Image'
import Button from '~/layouts/components/Button'
import styles from './Admin.module.scss'
import { Blog, BlogList } from './admin-pages/Blogs'
import Dashboard from './admin-pages/Dashboard'

import ChangeTitle from '~/components/ChangeTitle'
import { BlogCateList, BlogCategory } from './admin-pages/BlogCategories'
import { Brand, BrandList } from './admin-pages/Brands'
import Color from './admin-pages/Colors/Color'
import ColorList from './admin-pages/Colors/ColorList'
import { Coupon, CouponList } from './admin-pages/Coupon'
import Customers from './admin-pages/Customers'
import { EnquiresList, Enquiry } from './admin-pages/Enquires'
import { Order, OrderList } from './admin-pages/Order'
import { ProdCategoriesList, ProdCategory } from './admin-pages/ProductCategories'
import { Product, ProductList } from './admin-pages/Products'
import { BlogsTrash, CustomerTrash, ProductsTrash } from './admin-pages/Trash'

const cx = classNames.bind(styles)

const Admin: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false)

   const navigate = useNavigate()
   const getAdminFromLocalStorage: string | null = localStorage.getItem('ADMIN')
   const admin = getAdminFromLocalStorage ? JSON.parse(getAdminFromLocalStorage) : null

   useEffect(() => {
      if (!admin) {
         navigate('/admin/login')
      }
   })

   return (
      <>
         <ChangeTitle title={'Admin'} />

         <Layout className={cx('wrapper')}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
               <div className={cx('logo')}>
                  <h2>Dev Conner</h2>{' '}
               </div>
               <Menu
                  theme="dark"
                  className={cx('menu')}
                  mode="inline"
                  defaultSelectedKeys={[' ']}
                  onClick={({ key }) => {
                     if (key === 'signout') {
                        return
                     } else {
                        navigate(key)
                     }
                  }}
                  items={[
                     {
                        key: '',
                        icon: <AiOutlineDashboard className={cx('icon')} />,
                        label: 'Dashboard',
                     },
                     {
                        key: 'customer',
                        icon: <FiUsers className={cx('icon')} />,
                        label: 'Customers',
                     },
                     {
                        key: 'catalog',
                        icon: <AiOutlineShoppingCart className={cx('icon')} />,
                        label: 'Catalog ',
                        children: [
                           {
                              key: 'product',
                              icon: <RiProductHuntLine className={cx('icon')} />,
                              label: 'Add Product',
                           },
                           {
                              key: 'product-list',
                              icon: <SiProducthunt className={cx('icon')} />,
                              label: 'Product List',
                           },
                           {
                              key: 'brand',
                              icon: <SiBrandfolder className={cx('icon')} />,
                              label: 'Brand',
                           },
                           {
                              key: 'brand-list',
                              icon: <TbBrandShopee className={cx('icon')} />,
                              label: 'Brand List ',
                           },
                           {
                              key: 'category',
                              icon: <BiCategoryAlt className={cx('icon')} />,
                              label: 'Category',
                           },
                           {
                              key: 'category-list',
                              icon: <BiCategory className={cx('icon')} />,
                              label: 'Category List',
                           },
                           {
                              key: 'color',
                              icon: <BiColorFill className={cx('icon')} />,
                              label: 'Color',
                           },
                           {
                              key: 'color-list',
                              icon: <AiOutlineBgColors className={cx('icon')} />,
                              label: 'Color List',
                           },
                        ],
                     },
                     {
                        key: 'orders',
                        icon: <FaClipboardList className={cx('icon')} />,
                        label: 'Orders',
                     },
                     {
                        key: 'blog',
                        icon: <FaBlogger className={cx('icon')} />,
                        label: 'Blogs',
                        children: [
                           {
                              key: 'blog',
                              icon: <FaBlog className={cx('icon')} />,
                              label: 'Add Blog',
                           },
                           {
                              key: 'blog-list',
                              icon: <FaBlog className={cx('icon')} />,
                              label: 'Blog List',
                           },
                           {
                              key: 'blog-category',
                              icon: <SiBlogger className={cx('icon')} />,
                              label: 'Add Blog Category',
                           },
                           {
                              key: 'blog-category-list',
                              icon: <SiBlogger className={cx('icon')} />,
                              label: 'Blog Category List',
                           },
                        ],
                     },
                     {
                        key: 'marketing',
                        icon: <RiCoupon2Line className={cx('icon')} />,
                        label: 'Marketing',
                        children: [
                           {
                              key: 'coupon',
                              icon: <RiCoupon4Fill className={cx('icon')} />,
                              label: 'Add Coupon',
                           },
                           {
                              key: 'coupon-list',
                              icon: <RiCoupon3Line className={cx('icon')} />,
                              label: 'Coupon List',
                           },
                        ],
                     },
                     {
                        key: 'trash',
                        icon: <FaTrashAlt className={cx('icon')} />,
                        label: 'Trash',
                        children: [
                           {
                              key: 'trash/product',
                              icon: <SiProducthunt className={cx('icon')} />,
                              label: 'Product Trash',
                           },
                           {
                              key: 'trash/blog',
                              icon: <FaBlog className={cx('icon')} />,
                              label: 'Blog trash',
                           },
                           {
                              key: 'trash/customer',
                              icon: <FiUsers className={cx('icon')} />,
                              label: 'Customer trash',
                           },
                        ],
                     },
                     {
                        key: 'enquiries',
                        icon: <FaListAlt className={cx('icon')} />,
                        label: 'Enquires',
                     },
                  ]}
               />
            </Sider>

            <Layout className={cx('site-layout')}>
               <Header className={cx('header')}>
                  <Button text className={cx('trigger')} onClick={() => setCollapsed(!collapsed)}>
                     {collapsed ? (
                        <AiOutlineMenuUnfold className={cx('icon')} />
                     ) : (
                        <AiOutlineMenuFold className={cx('icon')} />
                     )}
                  </Button>
                  <div className={cx('admin')}>
                     <span className={cx('count')}>4</span>
                     <AiOutlineBell className={cx('icon')} />
                     <Button text className={cx('btn-dop')}>
                        <Image
                           className={cx('img')}
                           src={
                              'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/336386449_1196902617672774_7617690085192071281_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PQy6UljUSWwAX92zLP0&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAteS8YPjUvwMC4hOGOrR9E2-5kR8eECftuKc3XB5MRiA&oe=6443BD5E'
                           }
                        />
                        <div className={cx('option')}>
                           <span></span>
                           <span></span>
                           <span></span>
                        </div>
                     </Button>
                     <div className={cx('wrap-name')}>
                        <span className={cx('name')}>Phan Huy Tung</span>
                        <span className={cx('email')}>majdjtu@gmail.com</span>
                     </div>
                  </div>
               </Header>
               <Content className={cx('content')}>
                  <Routes>
                     <Route path="" element={<Dashboard />} />
                     <Route path="customer" element={<Customers />} />
                     <Route path="orders" element={<OrderList />} />
                     <Route path="order/:orderId" element={<Order />} />
                     <Route path="product" element={<Product />} />
                     <Route path="product/:productId" element={<Product />} />
                     <Route path="product-list" element={<ProductList />} />
                     <Route path="color" element={<Color />} />
                     <Route path="color/:colorId" element={<Color />} />
                     <Route path="color-list" element={<ColorList />} />
                     <Route path="coupon" element={<Coupon />} />
                     <Route path="coupon/:couponId" element={<Coupon />} />
                     <Route path="coupon-list" element={<CouponList />} />
                     <Route path="blog" element={<Blog />} />
                     <Route path="blog/:blogId" element={<Blog />} />
                     <Route path="blog-list" element={<BlogList />} />
                     <Route path="brand" element={<Brand />} />
                     <Route path="brand/:brandId" element={<Brand />} />
                     <Route path="brand-list" element={<BrandList />} />
                     <Route path="category" element={<ProdCategory />} />
                     <Route path="category/:categoryId" element={<ProdCategory />} />
                     <Route path="category-list" element={<ProdCategoriesList />} />
                     <Route path="blog-category" element={<BlogCategory />} />
                     <Route path="blog-category/:blogCateId" element={<BlogCategory />} />
                     <Route path="blog-category-list" element={<BlogCateList />} />
                     <Route path="enquiry/:enqId" element={<Enquiry />} />
                     <Route path="enquiries" element={<EnquiresList />} />
                     <Route path="trash/product" element={<ProductsTrash />} />
                     <Route path="trash/blog" element={<BlogsTrash />} />
                     <Route path="trash/customer" element={<CustomerTrash />} />
                  </Routes>
               </Content>
            </Layout>
         </Layout>
      </>
   )
}

export default Admin
