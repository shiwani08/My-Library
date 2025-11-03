import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

type AddBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: {
    title: string;
    author: string;
    status: string;
    image_url: string;
  }) => void;
};

export default function AddBookModal({ isOpen, onClose, onAddBook }: AddBookModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onAddBook(values);
      console.log("📚 New Book Added:", values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Add New Book"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add Book
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="add-book-form">
        <Form.Item
          label="Book Title"
          name="title"
          rules={[{ required: true, message: "Please enter the book title!" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please enter the author name!" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select book status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="currently-reading">Currently Reading</Option>
            <Option value="have-read">Have Read</Option>
            <Option value="to-be-read">To Be Read</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[{ required: false }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
