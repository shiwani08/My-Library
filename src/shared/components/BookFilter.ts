// "use client";
// import { Button, Input, Select, Space, Segmented } from "antd";
// import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

// const READING_STATUS_OPTIONS = [
//   { value: "to-be-read", label: "To be read" },
//   { value: "currently-reading", label: "Currently reading" },
//   { value: "have-read", label: "Have read" },
// ];

// interface BookFiltersProps {
//   uniqueAuthors: string[];
//   titleFilter: string;
//   authorFilter: string | null;
//   statusFilter: string | null;
//   viewMode: "grid" | "list";
//   onTitleChange: (v: string) => void;
//   onAuthorChange: (v: string | null) => void;
//   onStatusChange: (v: string | null) => void;
//   onViewModeChange: (v: "grid" | "list") => void;
//   onAddBook: () => void;
// }

// export default function BookFilters({
//   uniqueAuthors, titleFilter, authorFilter,
//   statusFilter, viewMode, onTitleChange,
//   onAuthorChange, onStatusChange, onViewModeChange, onAddBook,
// }: BookFiltersProps) {
//   return (
//     <div>
//     <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
//       <Space wrap size="small" className="w-full sm:w-auto">
//         <Input
//           placeholder="Filter by title"
//           value={titleFilter}
//           onChange={(e) => onTitleChange(e.target.value)}
//           allowClear
//         />
//         <Select
//           placeholder="Filter by author"
//           value={authorFilter}
//           onChange={(v) => onAuthorChange(v ?? null)}  // ← fix
//           allowClear
//           style={{ minWidth: 180 }}
//           options={uniqueAuthors.map((a) => ({ value: a, label: a }))}
//         />
//         <Select
//           placeholder="Filter by status"
//           value={statusFilter}
//           onChange={(v) => onStatusChange(v ?? null)}  // ← fix
//           allowClear
//           style={{ minWidth: 180 }}
//           options={READING_STATUS_OPTIONS}
//         />
//         <Segmented
//           value={viewMode}
//           onChange={(v) => onViewModeChange(v.toString() as "grid" | "list")}  // ← fix
//           options={[
//             { value: "grid", label: "Grid", icon: <AppstoreOutlined /> },
//             { value: "list", label: "List", icon: <UnorderedListOutlined /> },
//           ]}
//         />
//       </Space>
//       <Button
//         type="primary"
//         onClick={onAddBook}
//         className="w-full sm:w-auto shrink-0 sm:mr-6"
//       >
//         + Add Book
//       </Button>
//     </div>
//     </div
// );