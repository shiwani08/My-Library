import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

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
  type?: "add" | "edit";
  bookId?: string;
  initialValues?: {
    title: string;
    author: string;
    status: string;
    image_url: string;
  };
};

export default function AddBookModal({
  isOpen,
  onClose,
  onAddBook,
  type = "add",
  bookId,
  initialValues,
}: AddBookModalProps) {
  const [form] = Form.useForm();

  // Set initial values when modal opens in edit mode
  useEffect(() => {
    if (isOpen && type === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (isOpen && type === "add") {
      form.resetFields();
    }
  }, [isOpen, type, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let res;
      if (type === "edit" && bookId) {
        // Edit existing book
        res = await fetch(`http://localhost:5000/update-book/${bookId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // Add new book
        res = await fetch("http://localhost:5000/add-book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to ${type} book`);
      }

      const data = await res.json();
      console.log(
        `Book ${type === "edit" ? "Updated" : "Added"} Successfully:`,
        data
      );

      onAddBook(values); // Pass the values back

      form.resetFields();
      onClose();
    } catch (err) {
      console.error(`Error ${type}ing book:`, err);
      message.error(`Failed to ${type} book`);
    }
  };

  return (
    <Modal
      title={type === "edit" ? "Edit Book" : "Add New Book"}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {type === "edit" ? "Update Book" : "Add Book"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="book-form">
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
