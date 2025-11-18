import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useBookOperations } from "@/app/customHooks/bookOperations.tsx/crudBooks";

const { Option } = Select;

type AddBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
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
  type = "add",
  bookId,
  initialValues,
}: AddBookModalProps) {
  const [form] = Form.useForm();
  const { addBook, updateBook } = useBookOperations();

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

      if (type === "edit" && bookId) {
        // Edit existing book
        await updateBook(bookId, values);
      } else {
        // Add new book
        await addBook(values);
      }

      form.resetFields();
      onClose();
    } catch (err) {
      console.error(`Error ${type}ing book:`, err);
      // Error message already handled in the hook
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
