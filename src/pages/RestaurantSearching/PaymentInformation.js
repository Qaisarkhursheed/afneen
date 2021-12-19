import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Form, Input, Radio, Button, Avatar, Select } from 'antd';
import ByAddress from '../../styles/images/byaddress.png';
import { 
    asyncActionGenerator, 
    CREATE_ORDER, 
    ORDER, 
    ORDER_METHOD, 
    INFORMATION,
    BILL
 } from '../../redux/actions';
import Cart from './Cart';


const creatOrderActions = asyncActionGenerator(CREATE_ORDER);
const orderActions = asyncActionGenerator(ORDER);
const addOrderMethodAction = asyncActionGenerator(ORDER_METHOD);
const addInofrmationAction = asyncActionGenerator(INFORMATION);
const addFinalOrder = asyncActionGenerator(BILL);

const PaymentInformation = props => {
    const { 
        sub_total,
        orderMethod,
        orders,
        address,
        cards,
        deleteOrder,
        user,
        isAuthenticated,
        addOrderMethod,
        onSuccess,
        addInofrmation,
        history,
        menu,
        addBill,
        isCheckedout,
        voucher_discount
    } = props;
    const totalWithTax = sub_total + ((sub_total/100) * parseFloat(menu.tax));
    const totalWithDiscount = totalWithTax - ((sub_total/100) * parseFloat(menu.discount));
    const totalWithVoucher = totalWithDiscount - ((sub_total/100) * voucher_discount);
    const total = sub_total > parseFloat(menu.free_delivery_above) 
    ? totalWithVoucher : 
    totalWithVoucher + parseFloat(menu.delivery_charges);
    console.log(totalWithTax,
        totalWithDiscount,
        totalWithVoucher,
        total);
   let defaultAddress;  
    if(address) {
        defaultAddress = address.find(item=>item.default === 1);
        defaultAddress = defaultAddress ? defaultAddress : address[0];
    }
    const [form] = Form.useForm();
    const [order_Method, setOrder_Method] = useState("");
    const [type, setType] = useState('');
    const payemntMethod = {
        Delivery: [
            // {
            //     value: "COD",
            //     label: "Cash on Delivery",
            // },
            {
                value: "Paypal",
                label: "Paypal"
            },
            // {
            //     value: "PayOnDelivery",
            //     label: "Pay On Delivery"
            // },
            {
                value: "Card",
                label: "Card"
            },
        ],
        PickUp: [
            // {
            //     value: "COP",
            //     label: "Cash on Pckup",
            // },
            {
                value: "Paypal",
                label: "Paypal"
            },
            {
                value: "Card",
                label: "Card"
            },
            // {
            //     value: "PayOnDelivery",
            //     label: "Pay On Delivery"
            // },
        ],
        DineIn: [
            {
                value: "PIP",
                label: "Pay in Person",
            },
            {
                value: "Paypal",
                label: "Paypal"
            },
            // {
            //     value: "PayOnDelivery",
            //     label: "Pay On Delivery"
            // },
            {
                value: "Card",
                label: "Card"
            },
        ],
    };

    const onFinish = values => {
        console.log(values);
        // addInofrmation(values);
        // onSuccess();
        history.push('/confirm-order')
        addBill({
            ...values,
            user_id: user ? user.id : undefined,
            merchant_id: menu.id,
            Name:values.first_name,
            Telephone:values.phone_number,
            Address:values.Address,
            Location_Name:values.Location_Name,
            Order_type: orderMethod,
            Food_name:  JSON.stringify(orders.map(item=> { return {
                name: item.item_name,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
            }})),
            Merchant_Name: menu.restaurant_name,
            Sub_Total: sub_total,
            Tax: menu.tax,
            delivery_charges: menu.delivery_charges,
            Packaging: menu.packaging_fee,
            Discount:  voucher_discount ? `Voucher Discount: ${voucher_discount}` : 0,
            Total: total,
            Deliver_to: values.Address,
            Payment_type: values.Payment_type,
            Contact_Number: values.phone_number,
            // Reference_number: '121'
        })
    }


    // 'Name' =>'required|max:55',
    // 'Merchant_Name' =>'required|max:55',
    // 'Telephone' =>'max:55',
    // 'Address' =>'max:55',
    // 'Tax_number' =>'max:55',
    // 'Order_type' =>'max:55',
    // 'Payment_type' =>'max:55',
    // 'Reference_number' =>'max:55',
    // 'Date' =>'max:55',
    // 'Deliver_Date' =>'max:55',
    // 'Deliver_to' =>'max:55',
    // 'Delivery_Instruction' =>'max:55',
    // 'Location_Name' =>'max:55',
    // 'Contact_Number' =>'max:55',
    // 'Food_name' =>'max:55',
    // 'Quantity' =>'max:55',
    // 'Price' =>'max:55',
    // 'Discount' =>'max:55',
    // 'Sub_Total' =>'max:55',
    // 'Delivery_Food' =>'max:55',
    // 'Packaging' =>'max:55',
    // 'Tax' =>'max:55',
    // 'Total' =>'max:55',
    // 'Payment_Ref' =>'max:55',
    // 'Card_Number' =>'max:55',
    // 'Expiration_month' =>'max:55',
    // 'Expiration_year' =>'max:55',
    // 'CVV' =>'max:55',
    // 'isViewed' =>'max:55',
    // 'card_name'=>'max:55',
    // 'merchant_id'=>'max:55',
    // 'user_id'=>'max:55',


    const onOptionSelect = e => {
        setType(e.target.value);
    }
    const onDeleteClick = item => {
        deleteOrder(item);
    }
    const onDeliverySelect = value => {
        addOrderMethod(value);
        setOrder_Method(value);
      }
    const onCheckoutCLicked = () => {
        // onSuccess();
    }
    useEffect(()=>{
        if(isAuthenticated) {
            form.setFieldsValue({
                first_name : user['first_name'],
                last_name: user['last_name'],
                phone_number: user['phone_number'],
                email: user['email'],
                Address: defaultAddress['Address'],
                Country: defaultAddress['Country'],
                City: defaultAddress['City'],
                State: defaultAddress['State'],
                Zip_code: defaultAddress['Zip_code'],
                Location_Name: defaultAddress['Location_Name'],
            });
        }
    },[form,isAuthenticated,defaultAddress])

    return (
        <div className="payment-information-section">
            <div className="payment-information-container-section">
                <div className="form-with-payment">
                    <h3 className="delivery-info-heading">Delivery information</h3>
                    <p>Delivery Fee {menu.delivery_charges}</p>
                    <p>Delivery Estimation {menu.delivery_estimation}</p>
                    <p>Distance Covered {menu.distance_covered}</p>
                    {/* <p>{current.restaurant_name}</p>
                    <p>{current.restaurant_name}</p> */}
                    <h3 className="delivery-info-heading" >Address</h3>
                    <div className="customer-information">
                        <Form
                            form={form}
                            colon={false}
                            name="order"
                            onFinish={onFinish}
                            hideRequiredMark
                            validateTrigger="onSubmit"
                            >
                            <Form.Item
                                name="first_name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name',
                                    whitespace: true,
                                },
                                ]}
                            >
                                <Input placeholder="First Name"/>
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name',
                                    whitespace: true,
                                },
                                ]}
                            >
                                <Input placeholder="Last Name"/>
                            </Form.Item>
                            <Form.Item
                                name="phone_number"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                                ]}
                                >
                                <Input placeholder="Phone Number"/>
                            </Form.Item>
                            <Form.Item
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
                            <Input placeholder="Email"/>
                        </Form.Item>

                        { 
                        orderMethod === 'Delivery' ? <>
                        <Form.Item
                                name="Address"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your address',
                                },
                            ]}
                            >
                            <Input placeholder="Address" />
                        </Form.Item>
                        <Form.Item
                                name="Country"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Country',
                                },
                            ]}
                            >
                            <Input placeholder="Country" />
                        </Form.Item>
                        <Form.Item
                                name="City"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your City',
                                },
                            ]}
                            >
                            <Input placeholder="City" />
                        </Form.Item>
                        <Form.Item
                                name="State"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your State',
                                },
                            ]}
                            >
                            <Input placeholder="State"/>
                        </Form.Item>
                        <Form.Item
                                name="Zip_code"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your State',
                                },
                            ]}
                            >
                            <Input placeholder="Zip Code" />
                        </Form.Item>
                        <Form.Item
                                name="Location_Name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Location name',
                                },
                            ]}
                            >
                            <Input placeholder="Location Name" />
                        </Form.Item>
                        <Form.Item
                                name="appartment"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your appartment or house number',
                                },
                            ]}
                            >
                            <Input placeholder="Apartment suite, unit number or Company name"/>
                        </Form.Item>
                        </> : null
                        }
                        {/* {
                            orderMethod === 'DineIn' ?
                            <>
                                    <Form.Item
                                name="appartment"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your appartment or house number',
                                },
                            ]}
                            >
                            <Input placeholder="Apartment suite, unit number or Company name"/>
                        </Form.Item>
                            </>
                            : null
                        } */}
                        <h3 className="delivery-info-heading" >Payment Information</h3>
                        <Form.Item
                            name="Payment_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a method',
                                },
                            ]}
                        >
                            <Radio.Group onChange={onOptionSelect}>
                                {
                                    orderMethod !== '' ? payemntMethod[orderMethod].map(item=>
                                        <Radio value={item.value}>{item.label}</Radio>) : null
                                }
                            </Radio.Group>
                        </Form.Item>
                        {
                            type === 'COD' || type === 'PIP' || type === 'COP' ?
                            <Form.Item
                            name="change"
                            rules={[
                            {
                                required: true,
                                message: 'How much Change',
                            },
                            ]}
                            >
                            <Input placeholder="Change"/>
                            </Form.Item>
                            : type === 'PayOnDelivery' ?
                            <Form.Item
                            name="card_method"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a card',
                                },
                            ]}
                            >
                            <Radio.Group className="master-visa-maestro" >
                                    <Radio value="Master">
                                    <span> <Avatar src={ByAddress} />Master</span>
                                </Radio>
                                    <Radio value="Visa">
                                    <span> <Avatar src={ByAddress} />Visa</span>
                                </Radio>
                                    <Radio value="Maestro">
                                    <span> <Avatar src={ByAddress} />Maestro</span>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    : null
                    }
                    {isCheckedout ? <Button type="primary"
                        className="give-margin-right checkout-button"
                        htmlType="submit"
                        onClick={onCheckoutCLicked}
                        disabled={orders.length === 0}
                    >
                        Checkout
                    </Button> : null}
                    </Form>
                </div>
            </div>
            <div className="order-info-container">
            <Cart />
            </div>
         </div>
    </div>
    )
};

const mapStateToProps = state => ({
    sub_total: state.RestaurantReducer.sub_total,
    orderMethod: state.RestaurantReducer.orderMethod,
    orders: state.RestaurantReducer.orders,
    address: state.AuthenticationReducer.loginResponse.address,
    cards: state.AuthenticationReducer.loginResponse.card_info,
    user: state.AuthenticationReducer.loginResponse.user,
    isAuthenticated: state.AuthenticationReducer.isAuthenticated,
    menu: state.RestaurantReducer.menu,
    isCheckedout: state.RestaurantReducer.isCheckedout,
    voucher_discount: state.RestaurantReducer.voucher_discount,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators({
  creatOrder: creatOrderActions.add,
  deleteOrder: orderActions.delete,
  addOrderMethod: addOrderMethodAction.add,
  addInofrmation: addInofrmationAction.add,
  addBill: addFinalOrder.add,
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PaymentInformation));
