# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# SKIES BY NAS
## Digital Subscription Store

**Project Name:** Skies by Nas  
**Project Type:** Digital Subscription Reseller Website  
**Document Version:** 1.0  
**Status:** Initial Product Specification  
**Framework:** Next.js  
**Database:** Supabase PostgreSQL  
**Order Channel:** WhatsApp  
**Primary Language:** Indonesian  
**Currency:** Indonesian Rupiah (IDR)

---

# 1. PROJECT OVERVIEW

## 1.1 Background

Skies by Nas is a digital subscription reseller business that provides premium applications, software subscriptions, and digital products.

The business requires a modern website that allows customers to explore available applications, view product details, check subscription packages, verify product availability, and submit orders through WhatsApp.

The website will also provide an administrative dashboard that allows the business owner to manage products, subscription packages, prices, stock availability, product categories, and customer orders.

The primary objective is to create a professional digital storefront that simplifies product discovery, improves customer experience, and makes order management more organized.

The website must be accessible online without requiring the business owner's personal computer to remain active.

## 1.2 Product Vision

Build a visually distinctive, responsive, and interactive digital subscription store that provides a smooth shopping experience for customers and an efficient management system for the business owner.

The website should feel like a real digital brand, not a generic ecommerce template.

The experience must combine:

- Attractive visual design.
- Clear product information.
- Reliable availability information.
- Simple ordering.
- WhatsApp-based communication.
- Efficient administration.
- Maintainable software architecture.

## 1.3 Business Goals

The project aims to:

1. Establish a professional online presence for Skies by Nas.
2. Display digital subscription products in an organized catalog.
3. Allow customers to understand product features and packages.
4. Display accurate product availability.
5. Simplify customer ordering through WhatsApp.
6. Reduce manual product management.
7. Provide an administrative dashboard.
8. Maintain product and order information in a centralized database.
9. Support future business growth.
10. Provide a consistent and trustworthy customer experience.

## 1.4 Target Users

### Primary User: Customer

Customers who want to:
- Discover premium applications.
- Compare subscription packages.
- Check product availability.
- Understand product descriptions.
- Select subscription duration.
- Add products to a cart.
- Submit an order.
- Contact the business through WhatsApp.

### Secondary User: Store Administrator

The business owner or authorized administrator who wants to:
- Manage products.
- Create subscription packages.
- Update prices.
- Manage stock.
- Update product availability.
- Review customer orders.
- Confirm payments.
- Update order statuses.
- Manage product categories.

---

# 2. PRODUCT SCOPE

## 2.1 Included in Initial Release

The initial release must include:

### Customer Website
- Homepage.
- Product catalog.
- Product search.
- Product categories.
- Product detail pages.
- Subscription package selection.
- Product stock information.
- Shopping cart.
- Checkout form.
- WhatsApp order integration.
- Responsive design.
- Customer-facing order summary.

### Admin Dashboard
- Admin authentication.
- Dashboard overview.
- Product management.
- Product category management.
- Subscription package management.
- Stock management.
- Order management.
- Order status management.
- Product availability management.

### Infrastructure
- Next.js application.
- Supabase PostgreSQL database.
- Server-side data access.
- Secure admin operations.
- Deployment-ready configuration.
- Environment variable documentation.

## 2.2 Out of Scope for Initial Release

The following features are not required for the first version:

- Automatic payment processing.
- Midtrans integration.
- Automatic subscription activation.
- Customer loyalty points.
- Affiliate system.
- Multi-vendor marketplace.
- Customer-to-customer transactions.
- Automated digital account delivery.
- Advanced analytics.
- Subscription renewal automation.
- Automated refund processing.

These features may be considered for future development.

---

# 3. BRAND IDENTITY AND DESIGN DIRECTION

## 3.1 Brand Name

Skies by Nas

The brand should communicate:
- Modernity.
- Soft elegance.
- Reliability.
- Digital convenience.
- Friendly customer experience.
- Premium visual quality.

The website must maintain a consistent brand identity across the homepage, product catalog, product details, checkout, and admin dashboard.

## 3.2 Visual Direction

The design direction is:

**Pastel Premium — Lavender Aesthetic**

The design should feel:
- Elegant.
- Soft.
- Modern.
- Clean.
- Interactive.
- Friendly.
- Visually memorable.

The design must not look like a generic AI-generated ecommerce template.

Avoid excessive decorative elements, repetitive layouts, unnecessary gradients, and generic ecommerce patterns.

## 3.3 Color Palette

Use the provided pastel moodboard as the primary visual reference.

### Primary Colors

Pastel Lilac:
`#B9A5C9`

Lavender:
`#C9B4D8`

Light Lavender:
`#E9DFF0`

### Secondary Colors

Pastel Yellow:
`#FCEEA8`

Smoke Green:
`#A7BCA5`

Cream White:
`#FFFDF9`

### Neutral Colors

White:
`#FFFFFF`

Main Text:
`#30283A`

Secondary Text:
`#81758A`

Border:
`#E9E1EC`

### Color Usage

- Main background: Cream White.
- Primary buttons: Pastel Lilac.
- Secondary buttons: Light Lavender.
- Promotional elements: Pastel Yellow.
- Supporting decorative elements: Smoke Green.
- Product cards: White.
- Primary text: Dark purple-gray.
- Borders: Soft neutral colors.

Use color tokens rather than hardcoded colors throughout the application.

Ensure readable contrast and accessible interactions.

## 3.4 Typography

Use a modern, readable sans-serif typography system.

Typography hierarchy:
- Display heading.
- Page heading.
- Section heading.
- Product title.
- Body text.
- Supporting text.
- Labels.
- Captions.

Use consistent font weights and spacing.

Avoid excessive font families and inconsistent text sizes.

Typography should communicate premium quality without sacrificing readability.

## 3.5 Visual Components

Use:
- Carefully designed product cards.
- Consistent border radius.
- Subtle shadows.
- Balanced whitespace.
- Responsive product grids.
- Clear product availability badges.
- Elegant navigation.
- Soft interactive transitions.
- Consistent button styles.
- Meaningful product imagery.

Do not apply excessive rounded corners to every element.

Use decorative flowers, pastel shapes, or similar elements only when they support the brand identity.

The product catalog must remain easy to scan.

---

# 4. CUSTOMER WEBSITE

# 4.1 Homepage

The homepage is the primary entry point for customers.

Its objective is to introduce the business, communicate its value, and guide customers toward available products.

### Required Sections

#### A. Announcement Bar

Display optional announcements such as:
- New products.
- Promotional information.
- Important store updates.

The announcement must be manageable through configuration or admin functionality.

#### B. Navigation Header

Include:
- Brand logo.
- Home.
- Products.
- Categories.
- Search.
- Shopping cart.
- Contact or WhatsApp action.

The navigation must be responsive.

On mobile, use a suitable mobile navigation pattern.

#### C. Hero Section

Create a visually distinctive hero section.

Include:
- Brand introduction.
- Main headline.
- Supporting description.
- Primary CTA.
- Secondary CTA.
- Relevant visual elements.

Suggested headline:

"Your Favorite Digital Subscriptions, All in One Place."

Suggested supporting text:

"Explore premium digital applications, discover subscription packages, and order your favorite services with ease."

Primary CTA:
"Explore Products"

Secondary CTA:
"Contact Us"

The content should be localized into natural Indonesian when implemented.

Do not use generic placeholder marketing text.

#### D. Product Categories

Display available product categories.

Examples:
- Productivity.
- Design.
- Entertainment.
- Education.
- AI Tools.
- Other categories managed by the administrator.

Categories must be dynamic.

Do not hardcode category lists into the homepage.

#### E. Featured Products

Display selected products.

Each product card must contain:
- Product image.
- Product name.
- Short description.
- Starting price.
- Available subscription duration.
- Stock availability.
- Product detail CTA.

Featured products must be manageable by the administrator.

#### F. Popular Products

Display popular or frequently ordered products when sufficient order data exists.

If no reliable popularity data exists, use manually selected featured products instead.

Do not invent sales statistics.

#### G. Promotional Section

Display optional promotional content.

Promotion content must not imply discounts or offers that are not configured.

#### H. Store Information

Explain the ordering process.

Example:
1. Select your product.
2. Choose a subscription package.
3. Check availability.
4. Submit your order.
5. Confirm the order through WhatsApp.

#### I. FAQ

Provide answers to common questions.

Possible topics:
- How to order.
- How to check product availability.
- How payment works.
- How subscription packages work.
- How customers contact the store.

FAQ content should be editable or configurable.

#### J. Footer

Include:
- Brand identity.
- Navigation links.
- Contact information.
- WhatsApp link.
- Store information.
- Relevant legal or policy links.

---

# 4.2 Product Catalog

The product catalog is the primary product discovery interface.

## Required Features

### Product Listing

Display products in a responsive grid.

Each product must display:
- Product image.
- Product name.
- Short description.
- Category.
- Starting price.
- Subscription package information.
- Stock status.
- Product detail link.

### Search

Customers must be able to search products by:
- Product name.
- Relevant product description.
- Category where appropriate.

Search must provide useful feedback when no products match.

### Category Filter

Customers must be able to filter products by category.

Categories must be retrieved from the database.

### Sorting

Provide useful sorting options:
- Featured.
- Price: lowest to highest.
- Price: highest to lowest.
- Alphabetical.

Sorting must not create inconsistent product information.

### Availability Filter

Allow customers to filter:
- Available products.
- Out-of-stock products, if the store chooses to display them.

The default catalog should prioritize products that can currently be ordered.

### Empty State

When no products match:
- Display a clear message.
- Provide a way to clear filters.
- Suggest returning to the catalog.

---

# 4.3 Product Detail Page

Every product must have its own detail page.

Use a stable product slug.

Example:
`/products/canva-pro`

The actual slug must be generated from the product data.

## Required Product Information

Display:
- Product name.
- Product image.
- Product description.
- Category.
- Features.
- Available subscription packages.
- Package duration.
- Package price.
- Stock availability.
- Ordering instructions.
- Related products where appropriate.

## Subscription Package Selection

Customers must be able to select an available subscription package.

Each package must contain:
- Package name.
- Subscription duration.
- Price.
- Description.
- Availability.

When the customer selects a package:
- Update the selected package state.
- Update the displayed price.
- Update the cart item.
- Update the checkout summary.

The selected package must be clearly visible.

Do not allow customers to select disabled or unavailable packages.

## Product Ordering

Provide:
- Add to Cart.
- Order Now.

Order Now should proceed to checkout with the selected product.

Add to Cart should preserve the selected package.

The product detail page must clearly communicate availability.

---

# 4.4 Product Availability and Stock

Stock information is a core business requirement.

Customers must be able to identify whether a product can currently be ordered.

## Stock Types

The system must support:

### In Stock

The product or package can currently be ordered.

Display:
"Available"

### Low Stock

The product has limited remaining stock.

Display:
"Limited Stock"

The low-stock threshold must be configurable.

Do not display exact stock quantities unless the administrator chooses to make them public.

### Out of Stock

The product or package cannot currently be ordered.

Display:
"Out of Stock"

The customer must not be able to submit a normal order for an unavailable package.

### Temporarily Unavailable

The product may exist in the catalog but is temporarily unavailable.

Display:
"Temporarily Unavailable"

The administrator can restore availability.

## Stock Management

The administrator must be able to:
- Set stock quantity.
- Increase stock.
- Decrease stock.
- Mark a package as unavailable.
- Restore availability.
- Configure low-stock threshold.

Stock must be tracked at the subscription package level when packages have different availability.

For example:

Canva Pro:
- 1 Month: 5 available.
- 3 Months: 2 available.
- 12 Months: Out of stock.

Each package must have its own availability status.

## Stock Validation

Stock must be checked:
1. When displaying product information.
2. When adding products to the cart.
3. When opening checkout.
4. When submitting the order.

The server must perform the final availability check.

Do not rely exclusively on client-side stock information.

## Stock Reservation

For the initial release:
- Do not permanently deduct stock when an item is merely added to the cart.
- Revalidate stock when the order is submitted.
- Use a server-side transaction or equivalent safe operation to create the order and reserve or decrement the appropriate stock.
- Prevent concurrent orders from overselling stock.
- Define how pending orders release stock if they expire or are cancelled.

The reservation duration must be configurable.

If reservation expiry is not implemented in the first release, do not claim that stock is automatically released after a specific time.

## Stock History

The system should record stock changes.

Store:
- Product package.
- Previous stock.
- New stock.
- Change amount.
- Reason.
- Administrator.
- Timestamp.

This helps the business owner understand stock changes.

---

# 4.5 Shopping Cart

The shopping cart allows customers to prepare an order before checkout.

## Required Features

Customers must be able to:
- Add products.
- Remove products.
- Change subscription packages.
- Change quantity where permitted.
- View selected products.
- View package duration.
- View price.
- View subtotal.
- Continue shopping.
- Proceed to checkout.

## Cart Item

Each cart item must include:
- Product ID.
- Product name.
- Product image.
- Package ID.
- Package name.
- Subscription duration.
- Unit price.
- Quantity.

## Cart Behavior

The cart must:
- Preserve selected package information.
- Update totals correctly.
- Prevent invalid quantities.
- Validate product availability.
- Handle removed or unavailable products.
- Persist cart data across page navigation.

Use client-side state management appropriate to the project.

For the initial release, a local persisted cart is acceptable.

However, the cart must not be treated as the authoritative source for product prices or stock.

The server must retrieve trusted product data during checkout.

---

# 4.6 Checkout

Checkout is the final step before submitting an order through WhatsApp.

The checkout process must be simple and mobile-friendly.

## Customer Information

Required fields:
- Customer name.
- WhatsApp number.

Optional field:
- Order notes.

Validate:
- Required fields.
- Phone number format.
- Cart contents.
- Product availability.
- Package availability.
- Quantity.
- Price.

Do not request unnecessary personal information.

## Order Summary

Display:
- Product image.
- Product name.
- Subscription package.
- Subscription duration.
- Quantity.
- Unit price.
- Subtotal.
- Total.

The customer must be able to review the order before submitting.

## Checkout Validation

Before generating an order:
1. Validate customer input.
2. Retrieve current product information.
3. Retrieve current package prices.
4. Check stock.
5. Verify quantities.
6. Calculate the total on the server.
7. Create the order safely.
8. Generate the WhatsApp order message.

Do not trust prices or totals supplied by the browser.

## Order Submission

The checkout button should be:

"Order via WhatsApp"

When clicked:
- Validate the checkout form.
- Validate product availability.
- Create the order.
- Generate the order reference.
- Prepare the order summary.
- Open WhatsApp with the prefilled message.

The WhatsApp message must include:
- Order reference.
- Customer name.
- Customer WhatsApp number.
- Product names.
- Package names.
- Subscription durations.
- Quantities.
- Unit prices.
- Subtotals.
- Total.
- Customer notes.
- Store contact information.

Use URL encoding when constructing the WhatsApp message.

Do not expose private credentials in the generated link.

## WhatsApp Integration

Use the WhatsApp click-to-chat format:

`https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE`

The destination number must be configured centrally.

Do not hardcode the WhatsApp number in multiple components.

The number must use the international format without spaces or unnecessary symbols.

## Order Confirmation

After order submission:
- Display the order reference.
- Display the order summary.
- Explain that the order requires confirmation through WhatsApp.
- Provide a button to reopen WhatsApp if necessary.

Do not claim that payment has been completed.

Do not claim that the product has been activated.

The customer must receive clear information about the next step.

## WhatsApp Failure Handling

If WhatsApp cannot be opened:
- Preserve the order reference.
- Display the order details.
- Provide a retry action.
- Provide a way to copy the order summary.

Do not silently discard the order.

---

# 5. ORDER MANAGEMENT

## 5.1 Order Lifecycle

The initial order lifecycle should support:

1. Pending Confirmation.
2. Awaiting Payment.
3. Paid.
4. Processing.
5. Completed.
6. Cancelled.

The administrator must be able to update order status.

## 5.2 Order Details

Each order must contain:
- Order reference.
- Customer name.
- Customer WhatsApp number.
- Order items.
- Subscription packages.
- Quantities.
- Price snapshots.
- Subtotal.
- Total.
- Notes.
- Order status.
- Payment status.
- Creation timestamp.
- Updated timestamp.

## 5.3 Order History

The administrator must be able to:
- View all orders.
- Search orders.
- Filter by status.
- View order details.
- Update order status.
- Open customer WhatsApp.
- Review order totals.
- Review purchased packages.

## 5.4 Payment Status

Payment must be tracked separately from order status.

Payment statuses:
- Unpaid.
- Awaiting Confirmation.
- Paid.
- Failed.
- Refunded.

The initial release uses manual payment confirmation.

The administrator confirms payment after checking the actual payment received.

Do not automatically mark an order as paid merely because the customer opened WhatsApp.

Do not automatically mark an order as paid when the customer submits checkout.

## 5.5 Order Cancellation

The administrator must be able to cancel an order.

Cancellation must:
- Update order status.
- Record the cancellation.
- Release reserved stock when applicable.
- Preserve order history.

Do not delete orders merely because they are cancelled.

---

# 6. ADMIN DASHBOARD

The admin dashboard is the central management interface for Skies by Nas.

It must be accessible only to authenticated and authorized administrators.

## 6.1 Admin Authentication

Implement secure admin authentication.

Requirements:
- Login.
- Logout.
- Session management.
- Protected admin routes.
- Server-side authorization.
- Secure access to privileged operations.

Do not rely exclusively on hiding the admin interface.

Do not expose service role credentials.

Use Supabase Auth or another verified authentication approach appropriate to the installed project.

## 6.2 Dashboard Overview

Display:
- Total products.
- Available products.
- Out-of-stock packages.
- Total orders.
- Pending orders.
- Paid orders.
- Completed orders.
- Recent orders.
- Low-stock products.

Use real database data.

Do not invent sales statistics.

If data is unavailable, display a meaningful empty state.

## 6.3 Product Management

The administrator must be able to:

### Create Product

Fields:
- Product name.
- Slug.
- Description.
- Product image.
- Category.
- Features.
- Product status.
- Featured status.

### Edit Product

Allow the administrator to update:
- Product name.
- Description.
- Image.
- Category.
- Features.
- Visibility.
- Featured status.

### Delete Product

Provide a safe deletion workflow.

Prefer archiving or soft deletion when products have existing order history.

Do not delete historical order data.

## 6.4 Subscription Package Management

Each product can have multiple subscription packages.

The administrator must be able to:
- Create packages.
- Edit packages.
- Set subscription duration.
- Set package price.
- Set stock quantity.
- Set low-stock threshold.
- Enable or disable packages.
- Mark packages unavailable.

Example:

Product:
Canva Pro

Packages:
- 1 Month.
- 3 Months.
- 6 Months.
- 12 Months.

Package durations and prices must be configurable.

Do not hardcode subscription durations.

## 6.5 Category Management

The administrator must be able to:
- Create categories.
- Edit categories.
- Change category descriptions.
- Change category images where applicable.
- Enable or disable categories.
- Assign products to categories.

Do not require a code deployment for ordinary category changes.

## 6.6 Stock Management

Provide a dedicated stock management interface.

Display:
- Product.
- Package.
- Current stock.
- Low-stock threshold.
- Availability.
- Stock update action.

Allow:
- Stock adjustment.
- Stock restoration.
- Out-of-stock marking.
- Low-stock configuration.

Record stock changes.

## 6.7 Order Management

Provide:
- Order list.
- Order search.
- Status filters.
- Order details.
- Customer information.
- Order items.
- Package information.
- Price snapshots.
- Payment status.
- Order status.
- WhatsApp contact action.

Provide clear status update feedback.

---

# 7. DATABASE REQUIREMENTS

## 7.1 Database

Use Supabase PostgreSQL.

Database requirements:
- Persistent cloud storage.
- Structured relational data.
- Server-side access.
- Secure authorization.
- Data integrity.
- Appropriate indexes.
- Reliable order creation.
- Stock consistency.

The database must not depend on the administrator's computer being online.

## 7.2 Core Tables

### categories

Fields:
- id.
- name.
- slug.
- description.
- image_url.
- is_active.
- created_at.
- updated_at.

### products

Fields:
- id.
- category_id.
- name.
- slug.
- description.
- image_url.
- features.
- is_active.
- is_featured.
- created_at.
- updated_at.

### product_packages

Fields:
- id.
- product_id.
- name.
- duration_value.
- duration_unit.
- price.
- stock_quantity.
- low_stock_threshold.
- is_active.
- created_at.
- updated_at.

### orders

Fields:
- id.
- order_number.
- customer_name.
- customer_phone.
- customer_notes.
- order_status.
- payment_status.
- subtotal.
- total.
- created_at.
- updated_at.

### order_items

Fields:
- id.
- order_id.
- product_id.
- package_id.
- product_name_snapshot.
- package_name_snapshot.
- duration_snapshot.
- unit_price_snapshot.
- quantity.
- subtotal.

Historical order data must remain accurate even if the original product or package changes.

### stock_movements

Fields:
- id.
- package_id.
- previous_quantity.
- new_quantity.
- change_amount.
- reason.
- admin_user_id.
- created_at.

### admin_profiles

Fields:
- id.
- auth_user_id.
- display_name.
- role.
- created_at.
- updated_at.

## 7.3 Database Integrity

Use:
- Foreign keys.
- Appropriate constraints.
- Numeric price validation.
- Non-negative stock validation.
- Unique product slugs.
- Unique order references.
- Appropriate timestamps.

Use transactions or equivalent safe server-side operations for order creation and stock reservation.

Prevent duplicate order creation when practical.

Do not store payment credentials.

Do not store sensitive subscription account credentials in the initial release.

---

# 8. TECHNICAL STACK

## 8.1 Frontend

Use:
- Next.js.
- TypeScript.
- App Router when supported by the installed version.
- Tailwind CSS.
- shadcn/ui where appropriate.
- Lucide React for icons.

The installed Next.js documentation must be reviewed before implementation.

Do not assume APIs from older Next.js versions.

## 8.2 Backend

Use Next.js server-side capabilities for:
- Product data access.
- Checkout validation.
- Order creation.
- Stock validation.
- Admin operations.

Use Supabase PostgreSQL as the persistent database.

## 8.3 State Management

Use local React state for simple interactions.

Use Zustand when shared cart state requires it.

Persist the customer cart where appropriate.

Do not use client-side cart data as the authoritative source of price or stock.

## 8.4 Validation

Use server-side validation for:
- Checkout.
- Customer input.
- Product package selection.
- Quantity.
- Stock.
- Price.
- Order status transitions.

Use the project's existing validation library if available.

Do not install unnecessary dependencies.

## 8.5 Hosting

The application should be deployable to a suitable Next.js hosting platform.

The database must be hosted separately or through an integrated cloud backend.

The website must remain accessible when the business owner's local computer is turned off.

The deployment configuration must be documented.

---

# 9. PROJECT ARCHITECTURE

Use a clean and maintainable architecture.

A possible structure:

```text
skies-by-nas/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── (store)/
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   │   └── [slug]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   │
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── stock/
│   │   │   └── orders/
│   │   │
│   │   ├── api/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   │
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── stock/
│   │   └── admin/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   ├── validations/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── hooks/
│   ├── types/
│   └── config/
│
├── docs/
├── tests/
├── .env.example
├── AGENTS.md
├── PRD.md
├── README.md
└── package.json
```

This structure is a reference.

Adapt it to the actual project and installed Next.js version.

Do not create empty folders unnecessarily.

Keep UI components separate from business logic and database operations.

---

# 10. UI INTERACTION REQUIREMENTS

The website must feel interactive and responsive.

## Required Interactions

### Navigation
- Responsive navigation.
- Mobile menu.
- Active navigation states.
- Working links.

### Product Catalog
- Search.
- Category filtering.
- Sorting.
- Product cards.
- Availability indicators.

### Product Details
- Package selection.
- Price updates.
- Availability updates.
- Add-to-cart interaction.
- Order-now interaction.

### Shopping Cart
- Add item.
- Remove item.
- Update quantity.
- Change package.
- Update subtotal.
- Empty-cart state.

### Checkout
- Form validation.
- Order summary.
- Stock validation.
- Submit order.
- WhatsApp integration.
- Confirmation state.

### Admin
- Sidebar navigation.
- Product forms.
- Package forms.
- Stock adjustment.
- Order status updates.
- Confirmation dialogs.
- Success and error feedback.

## Interaction Feedback

Provide:
- Loading states.
- Success notifications.
- Error messages.
- Disabled states.
- Empty states.
- Confirmation dialogs where necessary.

Do not create decorative buttons that do nothing.

---

# 11. RESPONSIVE DESIGN

The website must support:
- Mobile.
- Tablet.
- Laptop.
- Desktop.
- Wide desktop.

Use a mobile-first approach.

## Mobile Requirements

- Responsive navigation.
- Readable typography.
- Appropriate product grid.
- Accessible buttons.
- Easy cart interaction.
- Simple checkout.
- No horizontal overflow.
- Clear product availability.
- Mobile-friendly WhatsApp ordering.

## Desktop Requirements

- Balanced content width.
- Appropriate whitespace.
- Clear navigation.
- Consistent product grid.
- Organized admin dashboard.
- Efficient product management.

Do not simply shrink the desktop design.

Adapt the interface to each viewport.

---

# 12. ACCESSIBILITY

Use:
- Semantic HTML.
- Proper heading hierarchy.
- Accessible form labels.
- Keyboard navigation.
- Visible focus states.
- Appropriate button types.
- Descriptive link text.
- Meaningful image alternative text.
- Readable color contrast.

Do not rely exclusively on color to communicate product status.

Ensure menus and dialogs are accessible.

Respect reduced-motion preferences.

---

# 13. SECURITY REQUIREMENTS

Security must be implemented at the server and database levels.

Requirements:
- Secure admin authentication.
- Server-side authorization.
- Input validation.
- Protected administrative operations.
- Safe database access.
- Environment variable management.
- No exposed service role keys.
- No privileged operations based only on client state.

Use Supabase Row Level Security where appropriate.

Do not assume that hiding admin routes protects administrative data.

Do not expose private credentials.

Do not trust client-provided prices.

Do not trust client-provided stock information.

The server must validate product and package availability.

---

# 14. ERROR HANDLING

The application must handle:
- Database errors.
- Missing products.
- Invalid product slugs.
- Unavailable packages.
- Out-of-stock products.
- Invalid quantities.
- Invalid customer input.
- Failed order creation.
- Failed WhatsApp opening.
- Unauthorized admin access.
- Empty catalog.
- Empty cart.

Display understandable messages.

Do not expose raw database errors to customers.

Preserve order information when a WhatsApp opening attempt fails.

---

# 15. SEO AND METADATA

Implement appropriate metadata.

Requirements:
- Store name.
- Page title.
- Description.
- Product metadata.
- Open Graph metadata.
- Appropriate favicon.
- Product-specific metadata where practical.

Use the installed Next.js metadata APIs.

Do not use duplicate or generic metadata for every product.

Do not create fake ratings or review counts.

---

# 16. PERFORMANCE

Prioritize:
- Optimized images.
- Appropriate font loading.
- Server rendering when useful.
- Small client-side bundles.
- Efficient database queries.
- Appropriate caching.
- Responsive images.
- Minimal unnecessary dependencies.

Avoid:
- Excessive Client Components.
- Unnecessary animation libraries.
- Repeated database queries.
- Unoptimized product images.
- Excessive state updates.

Do not compromise correctness for superficial performance optimization.

---

# 17. TESTING REQUIREMENTS

Test the following critical flows.

## Customer

1. Open homepage.
2. Browse catalog.
3. Search products.
4. Filter categories.
5. Open product details.
6. Select subscription package.
7. Check availability.
8. Add product to cart.
9. Update cart.
10. Checkout.
11. Validate customer information.
12. Submit order.
13. Generate WhatsApp message.
14. View order confirmation.

## Stock

1. Display available stock.
2. Display low stock.
3. Display unavailable package.
4. Prevent ordering unavailable packages.
5. Validate stock on the server.
6. Prevent overselling.
7. Update stock after the appropriate order operation.
8. Restore stock when a reserved order is cancelled or expires.

## Admin

1. Login.
2. Access dashboard.
3. Create product.
4. Edit product.
5. Create package.
6. Update price.
7. Update stock.
8. Mark package unavailable.
9. Restore package availability.
10. Review order.
11. Update order status.
12. Logout.

## Technical Validation

Run available:
- TypeScript checks.
- Lint.
- Tests.
- Production build.

Use the existing project scripts.

Do not claim tests passed unless they were actually executed.

---

# 18. IMPLEMENTATION PHASES

The project must be implemented incrementally.

## PHASE 1 — PROJECT ANALYSIS

Inspect:
- Existing files.
- Next.js version.
- Package dependencies.
- Current architecture.
- Existing design rules.
- Existing environment configuration.

Read relevant installed Next.js documentation.

Identify technical constraints.

Do not immediately overwrite existing project files.

Deliver:
- Project analysis.
- Implementation plan.
- Proposed architecture.
- Identified dependencies.

## PHASE 2 — DESIGN SYSTEM

Create:
- Color tokens.
- Typography.
- Spacing.
- Layout rules.
- Button variants.
- Card styles.
- Form styles.
- Product availability badges.
- Responsive behavior.

Use the provided pastel moodboard.

Deliver:
- Consistent design system.
- Shared UI components.
- Homepage visual foundation.

## PHASE 3 — CUSTOMER WEBSITE

Implement:
- Homepage.
- Navigation.
- Product catalog.
- Categories.
- Search.
- Product detail.
- Subscription package selection.
- Stock indicators.

Deliver:
- Functional customer browsing experience.

## PHASE 4 — CART AND CHECKOUT

Implement:
- Cart state.
- Cart persistence.
- Package selection.
- Quantity management.
- Checkout form.
- Server-side validation.
- Order creation.
- Order summary.
- WhatsApp message generation.
- Order confirmation.

Deliver:
- Functional customer order flow.

## PHASE 5 — DATABASE AND ADMIN

Implement:
- Supabase integration.
- Database schema.
- Admin authentication.
- Admin dashboard.
- Product management.
- Category management.
- Package management.
- Stock management.
- Order management.

Deliver:
- Functional administrative operations.

## PHASE 6 — SECURITY AND VALIDATION

Implement:
- Server-side authorization.
- Database policies.
- Stock validation.
- Order integrity.
- Input validation.
- Error handling.

Deliver:
- Secure and reliable core functionality.

## PHASE 7 — TESTING AND POLISH

Verify:
- Responsive layouts.
- Customer flows.
- Admin flows.
- Stock consistency.
- WhatsApp order generation.
- TypeScript.
- Lint.
- Production build.

Fix identified issues.

Deliver:
- Production-ready implementation within the defined scope.

---

# 19. ACCEPTANCE CRITERIA

The initial release is considered complete when:

### Customer Website

- Homepage displays store information.
- Catalog displays products from the database.
- Categories are dynamic.
- Product search works.
- Product details are accessible.
- Subscription packages are selectable.
- Prices update correctly.
- Availability is visible.
- Unavailable packages cannot be ordered.
- Cart functions correctly.
- Checkout validates customer information.
- Order totals are calculated from trusted server-side data.
- WhatsApp messages contain correct order details.
- Order confirmation is displayed.
- Website works on mobile and desktop.

### Admin

- Admin authentication works.
- Unauthorized users cannot access administrative operations.
- Products can be created.
- Products can be edited.
- Packages can be created.
- Prices can be updated.
- Stock can be updated.
- Availability can be changed.
- Orders can be viewed.
- Order statuses can be updated.
- Historical order data remains intact.

### Technical

- Database persists independently of the local computer.
- Server-side operations validate important data.
- Stock updates do not permit overselling.
- Secrets are not exposed.
- TypeScript checks pass.
- Lint passes where configured.
- Production build succeeds.
- Critical interactions are tested.
- Remaining limitations are documented.

---

# 20. FUTURE DEVELOPMENT

Potential future features:

## Customer Features
- Customer accounts.
- Order history.
- Order tracking.
- Wishlist.
- Product reviews.
- Notifications.
- Discount codes.
- Loyalty rewards.

## Business Features
- Sales analytics.
- Product performance reports.
- Low-stock notifications.
- Automatic stock alerts.
- Promotion management.
- Advanced order filtering.
- Customer segmentation.

## Payment Features
- Payment gateway.
- Payment verification.
- Automatic payment status updates.
- Refund workflow.

## Automation
- Automated order notifications.
- Scheduled stock reports.
- Automated subscription reminders.
- Product availability notifications.

Future features must not be implemented unless they are requested or clearly approved.

---

# 21. IMPORTANT BUSINESS RULES

1. Product availability must be accurate.
2. Product packages may have different stock quantities.
3. Product prices must come from trusted database records.
4. Customer cart data is not authoritative.
5. Orders must preserve historical price snapshots.
6. Order submission does not mean payment completion.
7. Opening WhatsApp does not mean payment completion.
8. Payment must be confirmed by an authorized administrator.
9. Stock must be validated on the server.
10. Unavailable packages cannot be ordered.
11. Cancelled orders must preserve history.
12. Stock reservation and release must follow a consistent policy.
13. Admin operations must be authorized.
14. Customer information must be handled responsibly.
15. The website must remain accessible without the owner's local computer running.

---

# 22. FINAL PRODUCT EXPECTATION

Skies by Nas must be a modern digital subscription store with a distinctive pastel lavender identity.

The final product must provide:

- A visually attractive homepage.
- A dynamic product catalog.
- Detailed product pages.
- Subscription package selection.
- Accurate stock information.
- A functional shopping cart.
- A simple checkout experience.
- WhatsApp-based ordering.
- An administrative dashboard.
- Product and package management.
- Stock management.
- Order management.
- Secure database integration.
- Responsive layouts.
- Maintainable code.

The implementation must prioritize:
1. User experience.
2. Functional correctness.
3. Stock and order integrity.
4. Visual consistency.
5. Security.
6. Maintainability.
7. Performance.

Do not build a generic ecommerce template.

Do not implement features that are only visually present but do not work.

Do not claim production readiness without verifying the implementation.

---

# 23. INSTRUCTIONS FOR ANTIGRAVITY

Read this PRD completely before implementing the project.

Treat this document as the primary product specification.

## First Action

Analyze the existing project and identify:
- Current Next.js version.
- Existing architecture.
- Installed dependencies.
- Existing design system.
- Existing project files.
- Required database configuration.
- Missing implementation requirements.

Read the relevant documentation for the installed Next.js version.

## Before Coding

Create a concise implementation plan.

Identify:
- Required pages.
- Required components.
- Database tables.
- Server-side operations.
- Customer workflows.
- Admin workflows.
- Security requirements.
- Testing requirements.

Do not immediately implement the entire application in one uncontrolled operation.

## During Implementation

- Follow the PRD.
- Follow the project's AGENTS.md.
- Preserve existing working functionality.
- Use the provided brand identity.
- Build incrementally.
- Keep code organized.
- Avoid unnecessary dependencies.
- Avoid fake functionality.
- Validate critical operations on the server.
- Verify actual implementation.

## When Requirements Are Unclear

Make reasonable decisions when the missing detail does not affect business correctness or security.

Document important assumptions.

Ask for clarification when a decision affects:
- Payment.
- Stock reservation.
- Product fulfillment.
- Authentication.
- Customer privacy.
- Business operations.

## Final Report

After implementation, provide:

1. Project analysis.
2. Implemented features.
3. Architecture and folder structure.
4. Database schema.
5. Customer ordering flow.
6. Admin capabilities.
7. Security measures.
8. Testing results.
9. Required environment variables.
10. Remaining work.

Do not claim that a feature is implemented unless it actually exists.

The objective is to build Skies by Nas as a reliable, maintainable, visually distinctive digital subscription store—not merely a frontend mockup.
