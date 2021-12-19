import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, } from 'antd';

// style sheet
import './ModalWithForm.css';

const ModalWithForm = props => {
  const {
    formData, // form's schema due to which the form is created
    formValues, // form values passed through props
    createField, // gets called when creating a field
    editField, // gets called chen editing a field
    visible, // bool value which decides modal's open or close state
    isEdit,
    title,
    onCancel,
    additionalData,
    formProps,
    buttonText,
    onSave,
    onEdit,
    ...modalProps
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue } = form;
  useEffect(() => {
    if (isLoaded) {
      Object.keys(formValues).forEach(key => {
        if (key !== 'uuid') {
          setFieldsValue({ [key]: formValues[key] });
        }
      });
    } else {
      setIsLoaded(true);
    }
  }, [formValues, isLoaded, setIsLoaded, setFieldsValue, resetFields]);

  // const onAddClick = () => {
  //   form.validateFields((err, values) => {
  //     if (!err) {
  //       if (isEdit) {
  //         const { uuid } = formValues;
  //         editField({ record: { ...values, uuid } });
  //       } else createField(values, additionalData);
  //       resetFields();
  //       onCancel();
  //       setIsLoaded(false);
  //     }
  //   });
  // };

  const onCancelClick = () => {
    onCancel();
    resetFields();
  };
  const onFinish = values => {
    resetFields();
    onCancel();
    if (isEdit) {
      // const { uuid } = formValues;
      // editField({ record: { ...values, uuid } });
      onEdit({
        id: formValues.id,
        user_id: formValues.user_id,
        ...values
      });
      onCancel();
    } else createField(values);
  };
  return (
    <Modal
      className="modal-with-form"
      wrapClassName="custom-form-modal"
      visible={visible}
      title={title}
      onCancel={onCancelClick}
      okText="Add"
      centered
      cancelText="Cancel"
      footer={null}
      closable={false}
      {...modalProps}
    >
      <Form
        form={form}
        hideRequiredMark
        colon={false}
        className="modal-form"
        onFinish={onFinish}
        validateTrigger="onSubmit" 
      >
        {
          formData.map(formItem => 
            (<Form.Item
              key={formItem.name}
              name={formItem.name}
              rules={formItem.rules}
              label={formItem.heading}
              className={formItem.className}
              valuePropName={formItem.valuePropName}
            >
              {formItem.component}
            </Form.Item>
            )   
          )
        }
      <div className="modal-action-buttons">
        <Button onClick={onCancelClick} className="custom-cancel-btn">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" className="custom-save-btn">
          Save
        </Button>
      </div>
      </Form>
    </Modal>
  );
};

ModalWithForm.defaultProps = {
  formData: [],
  formValues: {},
  visible: false,
  isEdit: false,
  formProps: {},
  buttonText: 'Add',
  additionalData: {},
  createField: () => {},
  editField: () => {},
  onCancel: () => {},
};

export default ModalWithForm;
