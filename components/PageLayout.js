import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    UploadOutlined,
    FileFilled,
    LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Content, Sider } = Layout;

// Pre-defined Components
import { WindowDimensionContext } from '../contexts/WindowDimensions';
import UploadModal from './UploadModal';

const PageLayout = (props) => {
    const WindowDimension = useContext(WindowDimensionContext);
    const { width, isMobileXSView } = WindowDimension;

    // Local States
    const [siderKey, setSiderKey] = useState('');
    const [isSiderCollapsed, setSiderCollapsed] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const urlPath = router.pathname;

        switch (urlPath) {
            case '/':
                setSiderKey(0);
                break;
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
    }, [router]);

    // responsive design
    const contentStyleWidth = width < 480 ? { width: 'calc(100vw - 32px)' } : {};

    const MyAvatar = useCallback(() => {
        return <Avatar size={width < 480 || isSiderCollapsed ? 64 : 100} icon={<UserOutlined />} />;
    }, [width, isSiderCollapsed]);

    const handleItemClick = (props) => {
        const { key } = props;
        if (key === '1') setShowUploadModal(true);
    };

    return (
        <Layout style={{ overflowX: 'hidden' }}>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth={width > 480 ? 80 : '0'} // enable responsive hidden sider for mobile view
                onBreakpoint={(broken) => {
                    console.log('broken', broken);
                }}
                collapsed={isSiderCollapsed}
                onCollapse={(collapsed, type) => {
                    setSiderCollapsed(collapsed);
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
                    }}
                >
                    <MyAvatar />
                    <span
                        style={{
                            marginTop: 20,
                            padding: '0 10px',
                            marginBottom: 50,
                            textAlign: 'center',
                        }}
                    >
                        Junnel Teves
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
                <Content
                    style={{
                        ...contentStyleWidth,
                        margin: isMobileXSView ? '24px 16px 0' : '0 16px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            textAlign: 'left',
                            minHeight: '100vh',
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
            </Layout>
        </Layout>
    );
};

export default PageLayout;
