import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const Reciept = props => {
    return (
        <div className="payment-information-section">
            <div className="receipt-container">
                <div className="activation">
                    <div className="tick-mark">
                        <i className="far fa-check-circle"></i>
                    </div>
                    <div className="greetings">
                        <h2>Order Status</h2>
                        <div className="greeting-messages">
                        
                        <Button className="back-to-home" onClick={()=>{
                            props.history.push('/');
                        }}>
                            <i className="fas fa-long-arrow-alt-left"></i> <span>back to home</span>
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
    orderInformation: state.RestaurantReducer.orderInformation,
    
});

export default connect(mapStateToProps,null)(withRouter(Reciept));

