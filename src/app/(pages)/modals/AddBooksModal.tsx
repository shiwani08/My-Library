"use client";

import { useEffect } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { addBook, updateBook } from "@/store/features/books/booksSlice";

interface BookForDuplicateCheck {
  title?: string;
  author?: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "add" | "edit";
  bookId?: string;
  /** List of existing books to check for duplicates when adding. If provided, duplicate check runs inside the modal. */
  existingBooks?: BookForDuplicateCheck[];
  initialValues?: {
    title: string;
    author: string;
    status: string;
    image_url: string;
  };
}

export default function AddBookModal({
  isOpen,
  onClose,
  type,
  bookId,
  existingBooks,
  initialValues,
}: AddBookModalProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // Update form fields when initialValues or modal opens
  useEffect(() => {
    if (isOpen) {
      if (type === "edit" && initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, type, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (type === "add") {
        const titleNorm = String(values.title ?? "").trim().toLowerCase();
        const authorNorm = String(values.author ?? "").trim().toLowerCase();
        const isDuplicate =
          Array.isArray(existingBooks) &&
          existingBooks.some(
            (b) =>
              String(b.title ?? "").trim().toLowerCase() === titleNorm &&
              String(b.author ?? "").trim().toLowerCase() === authorNorm
          );
        if (isDuplicate) {
          message.warning("Book is already present.");
          return;
        }
        await dispatch(addBook(values)).unwrap();
      } else if (type === "edit" && bookId) {
        await dispatch(updateBook({ bookId, bookData: values })).unwrap();
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={type === "add" ? "Add New Book" : "Edit Book"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width="min(100vw - 2rem, 520px)"
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Title"
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
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select book status">
            <Select.Option value="to-be-read">To Be Read</Select.Option>
            <Select.Option value="currently-reading">Currently Reading</Select.Option>
            <Select.Option value="have-read">Have Read</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
        >
          <Input placeholder="Enter image URL (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}