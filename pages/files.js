import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

import PageLayout from '../components/PageLayout';

const files = (props) => {
    return (
        <PageLayout>
            <Title level={3}>File Maintenance</Title>
        </PageLayout>
    );
};

export default files;
