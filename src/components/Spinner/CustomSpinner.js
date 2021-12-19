import React from 'react';
import {Spin} from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
const antIcon = <Loading3QuartersOutlined style={{ fontSize: 40, color: '#5cb85c' }} spin />;

const CustomSpinner = ({children, loading}) => {
    return (
        <Spin spinning={loading} indicator={antIcon}>
            {children}
        </Spin>
    );
};
export default CustomSpinner;