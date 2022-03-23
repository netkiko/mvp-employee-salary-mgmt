import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWindowSize, useWindowWidth, useWindowHeight } from '@react-hook/window-size';
import { Avatar, AutoComplete, Image, Input, Layout, Menu, Switch } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    FileFilled,
    LogoutOutlined,
} from '@ant-design/icons';

const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

import UploadModal from './UploadModal';

const PageLayout = (props) => {
    const [siderKey, setSiderKey] = useState('');
    const [isSiderCollapsed, setSiderCollapsed] = useState(false);
    const [window, setWindow] = useState({ width: -1, height: -1 });
    const [showUploadModal, setShowUploadModal] = useState(false);

    const router = useRouter();

    const [width, height] = useWindowSize();
    useEffect(() => {
        setWindow({ width: width, height: height });

        return () => {
            // cleanup
        };
    }, [width, height]);

    useEffect(() => {
        console.log('siderKey', siderKey);
        return () => {
            // cleanup
        };
    }, [siderKey]);

    useEffect(() => {
        console.log('useEffect fired by useRouter');
        const urlPath = router.pathname;

        switch (urlPath) {
            case '/':
                setSiderKey(0);
                break;
            // case '/profile':
            //     setSiderKey(1);
            //     break;
            case '/reports':
                setSiderKey(2);
                break;
            case '/files':
                setSiderKey(3);
                break;
            case '/profile':
                setSiderKey(4);
                break;
        }
        return () => {
            // cleanup
        };
    }, [router]);

    const contentStyleWidth =
        // responsive design
        window.width < 480 ? { width: 'calc(100vw - 32px)' } : {};

    const MyAvatar = useCallback(() => {
        return (
            <Avatar
                size={window.width < 480 || isSiderCollapsed ? 64 : 100}
                icon={<UserOutlined />}
            />
        );
    }, [window.width, isSiderCollapsed]);

    const handleItemClick = (props) => {
        const { item, key, keyPath, domEvent } = props;
        // console.log('item', item, 'key', key, 'keyPath', keyPath, 'domEvent', domEvent);
        console.log('key', key);
        if (key === '1') {
            console.log('key', key);
            setShowUploadModal(true);
        }
    };

    return (
        <Layout>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth={window.width > 480 ? '80' : '0'} // enable responsive hidden sider for mobile only
                onBreakpoint={(broken) => {
                    console.log('broken', broken);
                }}
                collapsed={isSiderCollapsed}
                onCollapse={(collapsed, type) => {
                    setSiderCollapsed(collapsed);
                    console.log('collapsed', collapsed, 'type', type);
                }}
            >
                <div
                    className="logo"
                    style={{
                        height: 'auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginTop: 40,
                        // whiteSpace: 'nowrap',
                    }}
                >
                    <MyAvatar />
                    <span style={{ marginTop: 20, marginBottom: 50, textAlign: 'center' }}>
                        Long User Name
                    </span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[siderKey.toString()]}
                    onClick={handleItemClick}
                >
                    <Menu.Item key="0">
                        <Link href="/">
                            <a>
                                <div>
                                    <HomeOutlined />
                                    <span className="nav-text">Employee List</span>
                                </div>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <div>
                            <UploadOutlined />
                            <span className="nav-text">Upload Employee List</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/reports">
                            <a>
                                <div>
                                    <FileFilled />
                                    <span className="nav-text">Reports</span>
                                </div>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/files">
                            <a>
                                <div>
                                    <UserOutlined />
                                    <span className="nav-text">File Maintenance</span>
                                </div>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link href="/profile">
                            <a>
                                <div>
                                    <UserOutlined />
                                    <span className="nav-text">User Profile</span>
                                </div>
                            </a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <div>
                            <LogoutOutlined />
                            <span className="nav-text">Logout</span>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className={'site-layout-sub-header-background'} style={{ padding: 0 }}>
                    <div
                        className="logo"
                        style={{
                            height: 64,
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        Main Logo
                    </div>
                </Header> */}
                <Content // you may want to change these
                    style={{
                        ...contentStyleWidth,
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            minHeight: 'calc(100vh - 158px)',
                        }}
                    >
                        {showUploadModal && (
                            <UploadModal
                                showUploadModal={showUploadModal}
                                setShowUploadModal={setShowUploadModal}
                            />
                        )}
                        {props.children}
                    </div>
                </Content>
                {/* <Footer style={{ ...contentStyleWidth, textAlign: 'center' }}>
                    Footer Text
                    <p>
                        width: {window.width}, height: {window.height}
                    </p>
                </Footer> */}
            </Layout>
        </Layout>
    );
};

export default PageLayout;