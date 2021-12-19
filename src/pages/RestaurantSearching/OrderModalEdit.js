import React from "react";
import { Modal, Form, Input, Radio, Avatar, Checkbox } from "antd";
import ByAddress from "../../styles/images/byaddress.png";
import ItemCounter from "./ItemCounter";
import QuantityCounter from "./QuantityCounter";

const OrderModalEdit = ({ onOrderEdit, menu, currentOrder, editOrder, onCancel, isEdit}) => {
  
const [form] = Form.useForm();

const setIntial = (name) => {
    form.setFieldsValue({
      [name]: currentOrder[name] ? currentOrder[name]: "",
    });
};

  let quantity = isEdit && currentOrder.quantity ? currentOrder.quantity : 1 ;
  let addon = menu.addon ? menu.addon.map((i) => ({
    name: i.name,
    price: i.price,
    quantity: 0
  })) : [];
  if(currentOrder.addons) {
    const currentAddonObj = Object.assign({}, ...(currentOrder.addons.map(item => ({ [item.name]: item.quantity }) )));
    addon = addon.map(item => currentAddonObj[item.name]
      ?
      { name: item.name, price: item.price , quantity : currentAddonObj[item.name]} : item);
  }

  const onCancelEdit = () => {
    onCancel();
    form.resetFields();

  };
  
  const getQuantity = value => {
    quantity = value;
  }
const onIncrement = item => {
  addon = addon.map(el => el.name === item.name ? item : el);
};
const onDecrement = item => {
  addon = addon.map(el => el.name === item.name ? item : el);
};
  return (
    <>
      <Modal
        className="order-modal"
        visible={isEdit}
        okText="Add To Cart"
        cancelText="Cancel"
        onCancel={onCancelEdit}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              // values.size.quantity = quantity;
              const price = JSON.parse(menu.size).find(item => item.size === values.size).price;
              const addons = addon.filter(i => i.quantity !== 0);
              const addon_bill = addons.map(item=> item.quantity*item.price).reduce((a, b) => a + b, 0);
              const item_bill = parseFloat(quantity) * parseFloat(price);
              const order = {
                item_name: menu.food_name,
                size: values.size,
                price: price,
                quantity: quantity,
                special_instructions:values.special_instructions,
                ingredients: values.ingredients,
                addons,
                flavors: values.flavors,
                item_bill,
                addon_bill,
                package_fee: menu.package_fee ? menu.package_fee : 0,
                total_bill: item_bill + addon_bill + parseFloat(menu.package_fee ? menu.package_fee : 0),
                uuid: currentOrder.uuid,
              }
                editOrder(order);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <div className="food-pic-and-description">
          <div className="food-picture">
            <Avatar src={ByAddress} />
          </div>
          <div className="description-with-heading">
            <h2>{menu.food_name}</h2>
            <p>{menu.description}</p>
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          name="form_in_modal"
          // initialValues={{
          //   ['special_instructions']: '',
          //   ['ingredients']: []
          // }}
        >
          <p className="price-size">Size and Prize</p>
          {menu.size ? (
            <Form.Item
              name="size"
              rules={[
                {
                  required: true,
                  message: "Please select select",
                },
              ]}
              initialValue={setIntial('size')}
            >
              <Radio.Group>
                {JSON.parse(menu.size).map((i) => (
                  <Radio value={i.size}>
                    <span className="size-of-item">{`${i.size}`}</span>
                    <span className="price-of-item">{`${i.price}`} CHF</span></Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          <div className="items-counters">
          <h2 className="quantity">Quantity</h2>
            <QuantityCounter isEdit={isEdit} quantity={1} initialValue={currentOrder.quantity ? currentOrder.quantity : 1} getQuantity={getQuantity} />
          </div>
          <h2 className="special-instructions">Special Instructions</h2>
          <Form.Item
          name="special_instructions"
          initialValue={setIntial('special_instructions')}
          >
            <Input type="textarea" />
          </Form.Item>
          <p className="price-size">Flavours</p>
          {menu.flavors && menu.flavors.split(',').length > 0 ? <Form.Item
            name="flavors"
            className="collection-create-form_last-form-item"
            initialValue={setIntial('flavors')}
          >
            <Radio.Group className="flavor-group">
              {menu.flavors.split(',').map((i) => (
                <Radio value={i}>
                  {i}
                </Radio>
              ))}
              </Radio.Group>
          </Form.Item> : 'No Flavours'}
          <p className="price-size">Ingredients</p>
          <Form.Item
            name="ingredients"
            className="collection-create-form_last-form-item"
            initialValue={setIntial('ingredients')}
          >
            <Checkbox.Group  options={menu.ingredients ? menu.ingredients.split(",") : []} />
          </Form.Item>
        </Form>
        <h2 className="adons">Sides, Drinks & Extras</h2>
        {
          addon.map(i => <ItemCounter
            item={i}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            isEdit={isEdit}
            // initialValue={currentOrder.addons ? 
            // currentOrder.addons.find(item=> item.name === i.name).quantity : 0}
            />)
        }
      </Modal>
    </>
  );
};

export default OrderModalEdit;
