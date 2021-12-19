import React, {useState, useEffect} from 'react';
import {Select, Input, Button, message, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, CREDIT, SAVE_CREDIT, GET_CREDIT_CARD, UPDATE_CREDIT, DELETE_CREDIT } from '../../../redux/actions';
import { connect } from 'react-redux';
import './CreditCard.css';
import { saveCredit } from '../../../services/User';

const creditActions = asyncActionGenerator(CREDIT);
const saveActions = asyncActionGenerator(SAVE_CREDIT);
const getCreditCardActions = asyncActionGenerator(GET_CREDIT_CARD);
const updateActions = asyncActionGenerator(UPDATE_CREDIT);
const deleteActions = asyncActionGenerator(DELETE_CREDIT);
const CreditCard = props => {
  const {addCredit, editCredit, data, deleteCredit, saveCredit, getCreditCards, user,
  updateCredit,isGettingCredit } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({});
  const handleOnSave = values => {
    saveCredit({
      user_id: user.id,
      ...values
    })
  }
  const handleOnEdit = values => {
    updateCredit(values);
  }
  const handleModal = () => {
    setModalVisible(true);
  }
  const onCancel = () =>{
   setModalVisible(false);
   setIsEdit(false);
   setFormValues({});
  }
  const handleEdit = record => {
    setFormValues(record);
    setIsEdit(true);
    setModalVisible(true);
  }
  const handleDelete = record => {
    deleteCredit(record)
  }
  const onAddAddress = values => {
    addCredit(values);
    setIsEdit(false);
    setModalVisible(false);
  };

  const onKeyPress = (e) => {
    const specialCharRegex = new RegExp("[0-9]");
    const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!specialCharRegex.test(pressedKey)) {
       e.preventDefault();
       return false;
    }
 }
 const onSaveClick = () => {
  if(data.length === 0) {
    message.error("Enter Credit.");
    return;
  }
  console.log(data);
}
  const { Option } = Select;
  const formSchema = [
    {
      name: 'Card_name',
      heading: 'Card Name',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your card name',
       }
     ],
      component: <Input />,
    },
    {
      name: 'Credit_Card_Number',
      heading: 'Card Number',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your card number',
       }
     ],
      component: <Input
        onKeyPress={onKeyPress}
        maxLength="16"
     />,
    },
    {
      name: 'Exp_month',
      heading: 'Exp. month',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please select expiry month',
       }
     ],
      component:<Select>
      {
        [1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(
        <Option value={`0${item}`} key={item}>{item > 9 ? `${item}` : `0${item}`}</Option>)
        )
      }
    </Select>,
    },
    {
      name: 'Exp_year',
      heading: 'Exp. year',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please select expiry year',
       }
     ],
      component:<Select>
      {
        [0,1,2,3,4,5,6,7,8,9,10,11,12].map(item=>(
        <Option value={`${2020 + item}`} key={item}>{`${2020 + item}`}</Option>)
        )
      }
    </Select>,
    },
    {
      name: 'Billing_Address',
      heading: 'Billing Address',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your billing address',
       }
     ],
      component: <Input />,
    },
    {
      name: 'CVV',
      heading: 'CVV',
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your cvv',
       }
     ],
      component: <Input />,
    },
  ];
  useEffect(()=>{
    if(user) getCreditCards({
      user_id : user.id,
    })
  },[getCreditCards, user])

  return (
    <Spin spinning={isGettingCredit}>
    <div className="credit-tab">
      <Button className="add-new-button" onClick={()=>{handleModal()}}>Add New</Button>
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">Card Name</th>
              <th className="location-head">Card Number</th> 
              <th className="default-head">Expiration</th>
            </tr>
            </thead>
              {
                data.length > 0 ? data.map(item=> (
                  <tr>
                    <td>{`${item.Card_name}`}
                    <div className="options">
                    <Button type="link" className="options-button" onClick={()=>handleEdit(item)}>
                      <span className="iconify" data-icon="bx:bxs-edit" data-inline="false"></span>
                    </Button>
                    <Button type="link" className="options-button" onClick={()=>handleDelete(item)}>
                      <span className="iconify" data-icon="ant-design:delete-filled" data-inline="false">
                      </span>
                    </Button>
                    </div>
                    </td>
                    <td>{item.Credit_Card_Number}</td>
                    <td>{`${item.Exp_month}-${item.Exp_year}`}</td>
                  </tr>
                )) : null
              }
        </table>
      </div>
      <Button className="save-new-button" onClick={()=>{onSaveClick()}}>Save</Button>
      <ModalWithForm
        visible={modalVisible}
        onCancel={onCancel}
        formData={formSchema}
        createField={onAddAddress}
        formValues={formValues}
        editField={editCredit}
        isEdit={isEdit}
        onSave={handleOnSave}
        onEdit={handleOnEdit}
      />
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  data: state.ProfileReducer.creditCards,
  user: state.AuthenticationReducer.loginResponse.user,
  isGettingCredit : state.ProfileReducer.isGettingCredit,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addCredit: creditActions.add,
    editCredit: creditActions.edit,
    deleteCredit: deleteActions.request,
    saveCredit: saveActions.request,
    getCreditCards: getCreditCardActions.request,
    updateCredit: updateActions.request, 
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(CreditCard);
