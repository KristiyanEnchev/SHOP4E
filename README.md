# SHOP4E 👟

## 🏗️ Overview

**SHOP4E** is a modern e-commerce platform specialized in sneakers, built with **Node.js** and **React 18 (Vite)**, leveraging **MongoDB**, **Express**, **Redux Toolkit**, and a clean component architecture. The application features a complete shopping experience with product discovery, cart management, Stripe payments, and an admin dashboard for product and user management. It's containerized with **Docker** and features a clean, responsive UI built with **TailwindCSS** and **shadcn/ui** components.

---

<p align="center" style="display: flex; justify-content: space-between; align-items: center;">
    <img style="width: 49%" src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1659807508/samples/New%20Assets/first_jep2fa.jpg" />
    <img style="width: 49%" src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1659807508/samples/New%20Assets/5_cr9gzk.jpg" />
</p>
<p align="center" style="display: flex; justify-content: space-between; align-items: center;">
    <img style="width: 49%" src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1660329609/samples/New%20Assets/Admin1_eirpka.jpg" />
    <img style="width: 49%" src="https://res.cloudinary.com/dmkgrwjes/image/upload/v1660329607/samples/New%20Assets/Admin2jpg_usx8t8.jpg" />
</p>

---

## 👀 Try it out

To run the project locally:

```bash
git clone https://github.com/KristiyanEnchev/SHOP4E.git
```

```bash
cd Shop4e/
```

```bash
cp .env.example .env
```

Update the `.env` file with your Stripe API key and other configuration as needed.

```bash
docker-compose up --build -d
```

---

## 🔠 Configuration

- **Default Accounts**:
  - Admin: Email: admin@example.com, Password: 123456
  - User: Email: user@example.com, Password: 123456
- **Storage Options**: Local storage or Cloudinary (set in .env)
- **Payments**: Stripe integration for secure checkout
- **Database**: MongoDB
- **API URL**: `http://localhost:5000`
- **UI URL**: `http://localhost:3000`

---

## 🔧 Built with

### Backend:

- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for data persistence
- [JWT](https://jwt.io/) for authentication
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for password hashing
- [Stripe](https://stripe.com/) for payment processing
- [Multer](https://github.com/expressjs/multer) & [Sharp](https://sharp.pixelplumbing.com/) for image upload and processing
- [Cloudinary](https://cloudinary.com/) (optional) for cloud image storage
- [Winston](https://github.com/winstonjs/winston) for logging
- [Zod](https://github.com/colinhacks/zod) for validation
- [Swagger](https://swagger.io/) for API documentation
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit) for API security

### Frontend:

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for state management
- [React Router 6](https://reactrouter.com/) for routing
- [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) for form validation
- [TailwindCSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Lucide React](https://lucide.dev/) for icons
- [React Hot Toast](https://react-hot-toast.com/) for notifications

### DevOps:

- **Docker & Docker Compose**: Containerized development and deployment
- **Nginx**: Serving the React frontend

---

## 📚 Features

- **Product Catalog**: Browse and search sneakers by categories
- **User Authentication**: Register, login, and profile management
- **Shopping Cart**: Add, update, and remove items
- **Checkout Process**: Secure payments via Stripe integration
- **User Dashboard**: View order history and details
- **Admin Panel**: Comprehensive product and user management
- **Responsive Design**: Optimized for all devices
- **Image Upload**: Store product images locally or in the cloud
- **API Rate Limiting**: Protection against abuse
- **API Documentation**: Swagger integration for clear API reference

---

## ✏️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Show your support

Give a ⭐ if you like this project and find it helpful!

---

## 🧏‍♂️️ Author

[![Facebook](https://img.shields.io/badge/kristiyan.enchev-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)](https://www.facebook.com/kristiqn.enchev.5/) [![Instagram](https://img.shields.io/badge/kristiyan-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/kristiyan_e/)[
![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kristiqnenchevv@gmail.com)

---
