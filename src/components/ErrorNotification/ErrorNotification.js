import React, { useEffect } from 'react';
import { notification, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {clearError} from '../../redux/actions';

const ErrorNotification = props => {
  const { data, hasConfigError, clearErrors } = props;

  const handleCloseNotification = () => {
    clearErrors();
  };

  useEffect(() => {
    if (hasConfigError) {
        message.open({
          type: 'error',
            onClose: handleCloseNotification,
            content: data
        });
    //   notification.open({
    //     onClose: handleCloseNotification,
    //     message: data
    //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  

  return <></>;
};

const mapStateToProps = ({AuthenticationReducer}) => {
    return {
        hasConfigError: AuthenticationReducer.ErrorOccurred,
        data: AuthenticationReducer.errorMessage,
    }
}

const mapDispathToProps = dispatch =>
  bindActionCreators({ clearErrors: clearError }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ErrorNotification);
