import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, Avatar, Checkbox } from "antd";
import ItemCounter from "./ItemCounter";
import QuantityCounter from "./QuantityCounter";

const OrderModal = ({
  onCreate,
  menu,
}) => {
  const [form] = Form.useForm();
  const [visiblity, setVisibility] = useState(false);
  let quantity = 1;
  let addon = menu.addon
    ? menu.addon.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: 0,
      }))
    : [];
  const onCancel = () => {
    setVisibility(false);
    form.resetFields();
  };
  const onAddItemClick = () => {
    setVisibility(true);
  };
  const getQuantity = (value) => {
    quantity = value;
  };
  const onIncrement = (item) => {
    addon = addon.map((el) => (el.name === item.name ? item : el));
  };
  const onDecrement = (item) => {
    addon = addon.map((el) => (el.name === item.name ? item : el));
  };
  return (
    <>
        <div className="image-holder">
          <img src={menu.featured_image} />
        </div>
        <div className="text-holder">
            <h2>{menu.food_name}</h2>
            <span className="ingredients-of-food-item">{menu.ingredients}</span>
            {/* <div className="button-image-container">
              <Button
                type="default"
                className="plus-button"
                onClick={onAddItemClick}
              >
                <i className="fas fa-plus-circle"></i>
              </Button>
            </div> */}
            <div>
            {menu.size ? (
              <span className="price-of-item">
                CHF {JSON.parse(menu.size)[0].price}
              </span>
            ) : (
              <></>
            )}</div>
          </div>
          <div className="price-holder">
            <button
                type="default"
                className="plus-button-food-item"
                onClick={onAddItemClick}
              >
                <i class="fas fa-plus"></i>
              </button>
          </div>
      <Modal
        className="order-modal"
        visible={visiblity}
        okText="Add To Cart"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              // values.size.quantity = quantity;
              const price = JSON.parse(menu.size).find(
                (item) => item.size === values.size
              ).price;
              const addons = addon.filter((i) => i.quantity !== 0);
              const addon_bill = addons
                .map((item) => item.quantity * item.price)
                .reduce((a, b) => a + b, 0);
              const item_bill = parseFloat(quantity) * parseFloat(price);
              const order = {
                item_name: menu.food_name,
                size: values.size,
                price: price,
                quantity: quantity,
                special_instructions: values.special_instructions,
                ingredients: values.ingredients,
                flavors: values.flavors,
                addons,
                item_bill,
                addon_bill,
                package_fee: menu.package_fee ? menu.package_fee : 0,
                total_bill:
                  item_bill +
                  addon_bill +
                  parseFloat(menu.package_fee ? menu.package_fee : 0),
              };
              onCreate(order);
              setVisibility(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
          // setVisibility(false);
        }}
      >
        <div className="food-pic-and-description">
          <div className="food-picture">
            <Avatar shape="square" src={menu.featured_image} />
          </div>
          <div className="description-with-heading">
            <h2>{menu.food_name}</h2>
            <p>{menu.Description}</p>
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          name="form_in_modal"
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
            >
              <Radio.Group className="size-group">
                {JSON.parse(menu.size).map((i) => (
                  <Radio value={i.size}>
                    <span className="size-of-item">{`${i.size}`}</span>
                    <span className="price-of-item">{`${i.price}`} CHF</span>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}

             <p className="price-size">Flavours</p>
          {menu.flavors && menu.flavors.split(',').length > 0 ? <Form.Item
            name="flavors"
            className="collection-create-form_last-form-item"
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
          {/* {menu.ingredients && menu.ingredients && JSON.parse(menu.ingredients).length > 0 ? <Form.Item
            name="ingredients"
            className="collection-create-form_last-form-item"
          >
            <Checkbox.Group options={JSON.parse(menu.ingredients)} />
          </Form.Item> : 'No Ingredients'} */}
           {menu.ingredients && menu.ingredients && menu.ingredients.split(",").length > 0 ? <Form.Item
            name="ingredients"
            className="collection-create-form_last-form-item"
          >
            <Checkbox.Group options={menu.ingredients.split(",")} />
          </Form.Item> : 'No Ingredients'}
          
          <h2 className="special-instructions">Special Instructions</h2>
          <Form.Item name="special_instructions">
            <Input type="textarea" />
          </Form.Item>
          <div className="items-counters">
            <h2 className="quantity">Quantity</h2>
            <QuantityCounter quantity={1} getQuantity={getQuantity} />
          </div>
       
       
        </Form>
        {/* <h2 className="adons">Sides, Drinks & Extras</h2>
        {addon.map((i) => (
          <ItemCounter
            item={i}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))} */}
      </Modal>
    </>
  );
};

export default OrderModal;
