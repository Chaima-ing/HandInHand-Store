# HandInHand Store

**Where Every Purchase Makes a Difference**  

HandInHand Store is a web-based platform that allows users to explore, buy, and donate new and used products. It combines e-commerce with social impact by dedicating a donation percentage from every purchase to charitable causes.  

---

## 🚀 Features  

- **User Accounts & Authentication**  
  - Sign Up & Login  
  - Email / Code Verification  
  - Password Recovery  
  - Profile Management  

- **Product Management**  
  - Browse new & used products  
  - Search & filter by categories  
  - Product images & details  

- **Donation Integration**  
  - Each product shows donation percentage  
  - Purchases contribute to real causes  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js  
- **Backend:** Spring Boot (Java)  
- **Database:** MySQL   
- **Other Tools:** Figma (UI/UX design), OBS (demo recording)  

---

⚙️ Setup & Installation
1. Clone the Repository
git clone https://github.com/your-username/HandInHand-Store.git
cd HandInHand-Store

2. Backend (Spring Boot)

Navigate to the backend folder:

cd backend

Configure application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/handinhand_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=your_secret_key


Run the Spring Boot app:

mvn spring-boot:run

3. Database (MySQL)

Import the SQL script from /database/handinhand.sql into your MySQL server.

Make sure the database name matches handinhand_db or update it in application.properties.

4. Frontend (React)

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the development server:

npm start


The frontend will be available at:
http://localhost:3000

```

## 📂 Project Structure  

```
HandInHand-Store/
│── frontend/       # React.js code  
│── backend/        # Spring Boot code  
│── database/       # SQL scripts  
│── assets/         # Images, icons, mockups  
│── README.md       # Project documentation  
```

---

## 👩‍💻 Contributors  

- **Chaima** – Back-end development, design.
- **Rana** - Front-end development

---

👉 *Join Us. Hand in Hand, We Change Lives.*  
