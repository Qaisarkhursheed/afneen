import React, {useState, useEffect} from 'react';
import {  Button, Input, Select, Checkbox, message, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, ADDRESS, SAVE_ADDRESS, GET_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from '../../../redux/actions';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import './AddressBook.css';
import { withNamespaces } from "react-i18next";

const addressActions = asyncActionGenerator(ADDRESS);
const saveActions = asyncActionGenerator(SAVE_ADDRESS);
const editActions = asyncActionGenerator(UPDATE_ADDRESS);
const getAddressActions = asyncActionGenerator(GET_ADDRESS);
const deleteActions = asyncActionGenerator(DELETE_ADDRESS);

const AddressBook = props => {
  const {
    addAddress,
    editAddress,
    data,
    deleteAddress,
    saveAddress,
    user,
    getAddress,
    updateAddress,
    isSavingAddress,
    t
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleOnSave = values => {
    saveAddress({
      user_id: user.id,
      ...values
    })
  }
  const handleOnEdit = values => {
    updateAddress(values);
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
    deleteAddress({ id:record.id , user_id: record.user_id});
  }
  const onAddAddress = values => {
    addAddress(values);
    setIsEdit(false);
    setModalVisible(false);
  };
  const onSaveClick = () => {
    if(data.length === 0) {
      message.error("Enter Address.");
      return;
    }
    console.log({
      user_id: user.id,
      data
    });
  }
  const { Option } = Select;
  const formSchema = [
    {
      name: 'Address',
      heading: <div>{t("Address")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your address',
       }
     ],
      component: <Input />,
    },
    {
      name: 'City',
      heading: <div>{t("City")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your city name',
       }
     ],
      component: <Input />,
    },
    {
      name: 'State',
      heading: <div>{t("State")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your state',
       }
     ],
      component: <Input />,
    },
    {
      name: 'Zip_code',
      heading: <div>{t("Zip Code")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please input your Zip code',
       }
     ],
      component: <Input />,
    },
    {
      name: 'Location_Name',
      type: 'text',
      heading: <div>{t("Location Name")}</div>,
      rules: [
       {
       required: true,
       message: 'Please input your location name',
       }
     ],
      component: <Input />,
    },
    {
      name: 'Country',
      heading: <div>{t("Country")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please select Country',
       }
     ],
      component:<Select>
      <Option value="Switzerland">Switzerland</Option>
      <Option value="Pakistan">Pakistan</Option>
    </Select>,
    },
    {
      name: 'Default',
      valuePropName:"checked",
      component:
      <Checkbox value="default">
        {t("Default")}
      </Checkbox>,
    },
  ];
  useEffect(()=>{
    if(user) getAddress({
      user_id: user.id
    })
  }, [getAddress, user]);
  return (
    <Spin spinning={isSavingAddress} >
    <div className="address-tab">
      <Button className="add-new-button" onClick={()=>{handleModal()}}>{t("Add New")}</Button>
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Address")}</th>
              <th className="location-head">{t("Location Name")}</th> 
              <th className="default-head">{t("Default")}</th>
            </tr>
            </thead>
              {
                data.length > 0 ? data.map(item=> (
                  <tr>
                    <td>{`${item.Address} ${item.City} ${item.State} ${item.Zip_code}`}
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
                    <td>{item.Location_Name}</td>
                    <td>{item.Default ?
                      <span><i className="fa fa-check" aria-hidden="true"></i></span>
                      // <span class="iconify" data-icon="subway:tick" data-inline="false"></span>
                      :
                      <span><i className="fa fa-times" aria-hidden="true"></i></span> 
                      // <span class="iconify" data-icon="icomoon-free:cross" data-inline="false"></span>
                    }
                    </td>
                  </tr>
                )) : null
              }
        </table>
      </div>
      <Button className="save-new-button" onClick={()=>{onSaveClick()}}>{t("Save")}</Button>
      <ModalWithForm
        visible={modalVisible}
        onCancel={onCancel}
        formData={formSchema}
        createField={onAddAddress}
        onSave={handleOnSave}
        onEdit={handleOnEdit}
        formValues={formValues}
        editField={editAddress}
        isEdit={isEdit}
      />
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  data: state.ProfileReducer.address,
  user: state.AuthenticationReducer.loginResponse.user,
  isSavingAddress: state.ProfileReducer.isGettingAddress,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addAddress: addressActions.add,
    editAddress: addressActions.edit,
    deleteAddress: deleteActions.request,
    getAddress: getAddressActions.request,
    saveAddress: saveActions.request,
    updateAddress: editActions.request,
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(AddressBook));
