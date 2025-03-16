
# **Microinsurance Dashboard - Admin Panel**  

### **Admin Login Credentials**  

#### **Username:**  
📌 `admin@example.com`  

#### **Password:**  
📌 `qwerty`  

---

## **Application Screenshots**  

### ** Login Screen**  
![image](https://github.com/user-attachments/assets/27532e67-b801-4d3b-8352-7c72c3e096b2)  

### **1️⃣ Create Policy**  
![Create Policy](https://github.com/user-attachments/assets/f2db8d1a-ae5e-4701-9b91-8a4b767260fe)  

### **2️⃣ Read Policies**  
![image](https://github.com/user-attachments/assets/f85c5719-84df-4928-9813-c729099e1232)
 

### **3️⃣ Update Policies**  
![Update Policies](https://github.com/user-attachments/assets/7d9c6278-29bd-4141-92a5-1384deabee55)  

### **4️⃣ Delete Policies**  
![Delete Policies](https://github.com/user-attachments/assets/974bc8c3-2771-40fc-88b4-388543007f56)  

### **5️⃣ Dashboard & Analytics**  
![Dashboard & Analytics](https://github.com/user-attachments/assets/d28c9cf6-445f-438f-b1d8-1feeb472636c)  

---

## **🐞 Known Bugs & Issues**  

- 📌 **UI responsiveness**: Some components may not adjust perfectly on smaller screens.  
- 📌 **Backend dependency**: The application currently requires a local Hyperledger Fabric network for querying policies.  
- 📌 **Login persistence**: User authentication is stored in `localStorage`, but implementing a more secure method is recommended.  

---

## **🔮 Future Improvements**  

- ✅ **Enhance UI responsiveness** for mobile screens  
- ✅ **Integrate blockchain smart contract execution** for real-time transactions  
- ✅ **Implement role-based authentication** for multiple user levels  
- ✅ **Add search & filter functionality** for easier policy management  
- ✅ **Enhance analytics dashboard** with visual charts and real-time updates  

---

📌 *This document provides a structured overview of the application's current state, known issues, and potential improvements.*  


## Technical Debt
- cors is harcoded 
- authentication is hardcoded (no validation)
- the business logic is not fully correct, you should not be asking some of the inputs from the user. You need to generate it yourself
- the method of parameter passing is not secure
-  Lack of API Abstraction
-  Hardcoded Backend Endpoints
-  Error Handling is Basic

