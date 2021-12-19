import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';

const Activation = props => {
  return (
    <>
      {Object.keys(props.pack).length !== 0 ?
        <div className="activation">
          <div className="tick-mark">
            <i className="far fa-check-circle"></i>
          </div>
        <div className="greetings">
          <h2>Congratulations!</h2>
          <div className="greeting-messages">
            <p>Congratulation for signing up.</p>
            <p>You can now use our Application as a Merchant. Thank You.</p>
            <Button className="back-to-home" onClick={()=>{
              props.history.push('/');
            }}>
              <i className="fas fa-long-arrow-alt-left"></i> <span>back to home</span>
            </Button>
          </div>
        </div>
      </div> : <div className="activation">
      <div className="tick-mark">
        <i className="far fa-check-circle"></i>
      </div>
      <div className="greetings">
        <h2>Congratulations!</h2>
        <div className="greeting-messages">
          <p>Congratulation for signing up. Please wait while
            our administrator validated your request.</p>
          <p>You will receive email once your merchant has been approved. Thank You.</p>
          <Button className="back-to-home" onClick={()=>{
            props.history.push('/');
          }}>
            <i className="fas fa-long-arrow-alt-left"></i> <span>back to home</span>
          </Button>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default withRouter(Activation);
