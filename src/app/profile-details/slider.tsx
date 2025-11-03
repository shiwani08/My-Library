"use client";
import { Drawer } from "antd";
import { useEffect } from "react";

export default function UserDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      console.log("Avatar clicked — opening user drawer!");
    }
  }, [open]);

  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <p>
        <strong>User:</strong> Hermione Granger
      </p>
    </Drawer>
  );
}
