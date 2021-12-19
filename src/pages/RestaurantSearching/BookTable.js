import  React , {useState} from 'react';
import {Form, Input,DatePicker, TimePicker, Button, Spin} from 'antd';
import { connect } from 'react-redux';
import { ADD_TABLE_BOOKING, asyncActionGenerator } from '../../redux/actions';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
// const { RangePicker } = DatePicker;
import moment from 'moment';
import {DatetimePicker} from 'rc-datetime-picker';
import { withNamespaces } from "react-i18next";

const addBookingActions = asyncActionGenerator(ADD_TABLE_BOOKING);
const BookTable = props => {
    const {add, isAddingTableBooking, match,t} = props;
    const [form] = Form.useForm();
    const [calandar, setCalandar] = useState(moment());

    const handlechange = (m)=>{
        setCalandar(m)
    }

    const onFinish = values => {
        add({
            merchant_id: match.params.id,
            guest_name: values.name,
            date_booking: values['date'].format('YYYY-MM-DD'),
            date: values['time'].format('HH:mm:ss'),
            no_of_guests: values.guests,
            mobile: values.mobile,
            notes: values.instructions,
            ref_no: '12'
        });
    };
    return (
        <Spin spinning={isAddingTableBooking}>
            <div className= "book-a-table">
                <h2>Pick Date Of Booking</h2>        
                <div className="book-table-calendar">   
                <DatetimePicker
                moment={calandar}
                onChange={handlechange}
                />
                </div>
            <div className="book-table">

                <Form
                form={form}
                colon={false}
                name="order"
                onFinish={onFinish}
                hideRequiredMark
                validateTrigger="onSubmit"
                >
                    {/* <h2>{t("Booking Information")}</h2> */}
                    <div className="Number-of-guests">
                    <Form.Item
                        name="guests"
                        label={<div>{t("Number of guests")}</div>}
                        rules={[
                        {
                            required: true,
                            message: 'Please input number of guests',
                        },
                        ]}
                        >
                        <Input type="number" />
                    </Form.Item>
                    {/* <Form.Item name="date" label={<div>{t("Pick a Date")}</div>}>
                        <DatePicker />
                    </Form.Item> */}
                    <Form.Item name="time" label={<div>{t("Pick Time")}</div>}>
                        <TimePicker />
                    </Form.Item>
                    </div>
                    <h2 className="Contact-info">{t("Contact Information")}</h2>
                        <Form.Item
                        name="name"
                        label={<div>{t("Name")}</div>}
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Name',
                            whitespace: true,
                        },
                        ]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={<div>{t("Mobile")}</div>}
                    name="mobile"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your number',
                        whitespace: true,
                    },
                    ]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item
                label={<div>{t("Email")}</div>}
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item name="instructions" label={<div>{t("Your Instructions")}</div>}>
                    <Input type="textarea" />
            </Form.Item>
            <Button type="primary"
                className="give-margin-right book-button"
                htmlType="submit"
                >
                {t("Book Table")}
            </Button>
            </Form>
        </div>
        </div>
    </Spin>
    );
};

const mapStateToProps = (state) => ({
    isAddingTableBooking: state.RestaurantReducer.isAddingTableBooking,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        add: addBookingActions.request
      },
      dispatch
    );

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withNamespaces()(BookTable)));
