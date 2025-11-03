# Ant Design Modules Used

This document describes the Ant Design components integrated into the project and their typical use cases.
      
### ✅ Summary
      
| Component | Use Case | Example Usage |
|------------|-----------|----------------|
| `Menu` | Page navigation | Navbar for sections |
| `Card` | Display book info | BookCard layout |
| `Tag` | Status badges | Book status like Wishlist or Finished |
| `Layout` |  |  |
| `Header` |  |  |
| `Typography` |  |  |
| `Form` |  |  |
| `Autocomplete` |  |  |
| `Modal` |  |  |

      
All these components help maintain a consistent, polished, and responsive UI using Ant Design’s robust system.

---

## 1. 🧭 Menu

**Import:**
```tsx
import { Menu } from 'antd';
```

**Purpose:**  
Used for creating navigation bars or side menus. It supports items, submenus, and icons.  
In this project, it’s used to build the navigation bar for switching between pages such as Home, Library, Wishlist, and Currently Reading.

**Example:**
```tsx
<Menu
  mode="horizontal"
  items={[
    { label: 'Home', key: 'home' },
    { label: 'Library', key: 'library' },
    { label: 'Wishlist', key: 'wishlist' },
  ]}
/>
```

---

## 2. 🃏 Card

**Import:**
```tsx
import { Card } from 'antd';
```

**Purpose:**  
The `Card` component provides a structured and aesthetic container for displaying grouped information — such as book covers, titles, and authors in your BookCard component.

**Example:**
```tsx
<Card
  hoverable
  className="book-card"
  cover={<img src="/cover.jpg" alt="Book Cover" />}
>
  <Card.Meta title="Book Title" description="Author Name" />
</Card>
```

---

## 3. 🏷️ Tag

**Import:**
```tsx
import { Tag } from 'antd';
```

**Purpose:**  
The `Tag` component is used to highlight statuses, categories, or labels.  
In this project, it visually represents the book’s reading status (`Currently Reading`, `Finished`, `Wishlist`) with different colors.

**Example:**
```tsx
<Tag color="gold">Wishlist</Tag>
```

---

## 4. 💠 Icons

**Import:**
```tsx
import { HomeOutlined, BookOutlined, ReadOutlined } from '@ant-design/icons';
```

**Purpose:**  
Icons enhance visual understanding and aesthetics. They are used inside components like `Menu` and `Breadcrumb` to indicate sections (e.g., Home, Library, Reading).

**Example:**
```tsx
<Menu
  items={[
    { label: 'Home', key: 'home', icon: <HomeOutlined /> },
    { label: 'Library', key: 'library', icon: <BookOutlined /> },
  ]}
/>
```

---