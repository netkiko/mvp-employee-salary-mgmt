import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

import PageLayout from '../components/PageLayout';

const reports = (props) => {
    return (
        <PageLayout>
            <Title level={3}>Reports</Title>
        </PageLayout>
    );
};

export default reports;
