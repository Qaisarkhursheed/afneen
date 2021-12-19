import React, {useState, useEffect} from 'react';
import {Rate, Input,  Button, Spin } from 'antd';
import ModalWithForm from '../../../components/ModalWithForm/ModalWithForm';
import { bindActionCreators } from 'redux';
import { asyncActionGenerator, GET_RATING, EDIT_RATING, DELETE_RATING} from '../../../redux/actions';
import { connect } from 'react-redux';
import { withNamespaces } from "react-i18next";

const getRatingActions = asyncActionGenerator(GET_RATING);
const editRatingActions = asyncActionGenerator(EDIT_RATING);
const deleteRatingActions = asyncActionGenerator(DELETE_RATING);

const Rating = props => {
  const {
    user,
    ratings,
    isGettingRating,
    isDeletingRating,
    isEditingRating,
    getRating,
    editRating,
    deleteRating,
    t
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState({});
 
  const handleOnEdit = values => {
    editRating(values);
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
    deleteRating(record)
  }
  const onAddAddress = values => {
    // addCredit(values);
    setIsEdit(false);
    setModalVisible(false);
  };

  const formSchema = [
    {
      name: 'rating',
      heading: <div>{t("Rating")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please select rating.',
       }
     ],
      component: <Rate />,
    },
    {
      name: 'comments',
      heading: <div>{t("Comments")}</div>,
      type: 'text',
      rules: [
       {
       required: true,
       message: 'Please enter a comment',
       }
     ],
      component: <Input.TextArea />,
    },
  ];
  useEffect(()=>{
    if(user) getRating({
      user_id : user.id,
    })
  },[getRating, user])

  return (
    <Spin spinning={
        isGettingRating ||
        isDeletingRating ||
        isEditingRating}>
    <div className="credit-tab">
      {/* <Button className="add-new-button" onClick={()=>{handleModal()}}>Add New</Button> */}
      <div className="address-table-box">
        <table className="address-table">
          <thead>
            <tr>
              <th className="address-head">{t("Rating")}</th>
              <th className="location-head">{t("Comments")}</th> 
              <th className="default-head">{t("Restaurant Name")}</th>
            </tr>
            </thead>
              {
                ratings.length > 0 ? ratings.map(item=> (
                  <tr>
                    <td>
                    <Rate disabled value={item.rating ? item.rating : 0} />
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
                    <td>{item.comments}</td>
                    <td>{item.merchant_name}</td>
                  </tr>
                )) : null
              }
        </table>
      </div>
      {/* <Button className="save-new-button" onClick={()=>{onSaveClick()}}>Save</Button> */}
      <ModalWithForm
        visible={modalVisible}
        onCancel={onCancel}
        formData={formSchema}
        createField={onAddAddress}
        formValues={formValues}
        editField={editRating}
        isEdit={isEdit}
        // onSave={handleOnSave}
        onEdit={handleOnEdit}
      />
    </div>
    </Spin>
  );
};
const mapStateToProps = state=>({
  user: state.AuthenticationReducer.loginResponse.user,
  ratings: state.ProfileReducer.ratings,
  isGettingRating: state.ProfileReducer.isGettingRating,
  isDeletingRating: state.ProfileReducer.isDeletingRating,
  isEditingRating: state.ProfileReducer.isEditingRating,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRating: getRatingActions.request,
    editRating: editRatingActions.request,
    deleteRating: deleteRatingActions.request, 
  }, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(withNamespaces()(Rating));
