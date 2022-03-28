import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

import PageLayout from '../components/PageLayout';

const profile = (props) => {
    return (
        <PageLayout>
            <Title level={3}>User Profile</Title>
        </PageLayout>
    );
};

export default profile;
