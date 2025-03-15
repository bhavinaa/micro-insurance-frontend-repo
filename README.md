
# Microinsurance React Dashboard

This is a **React** front-end for managing **microinsurance policies** on a **Hyperledger Fabric** network. It uses a **Go REST API** to invoke chaincode for creating, reading, updating, and deleting (CRUD) policy records.

---

## 1. Overview

- **Create** new insurance policies
- **Read** existing policies from the ledger
- **Update** policy fields, such as status
- **Delete** a policy by ID
- Uses **x-www-form-urlencoded** to communicate with the Fabric REST API
- Demonstrates integration with a **Hyperledger Fabric** chaincode named `basic` on channel `mychannel`

---

## 2. Prerequisites

1. **Node.js** (v14 or higher recommended)
2. **npm** or **yarn**
3. **Hyperledger Fabric** network running locally (e.g. `mychannel` with chaincode `basic`)
4. **Go REST API** for chaincode (listening on `http://localhost:3000`)

---

## 3. Installation & Running

1. **Clone** this repository or download the code:

   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   ```

2. **Install** dependencies:

   ```bash
   cd <your-repo>
   npm install
   ```

3. **Start** the development server:

   ```bash
   npm start
   ```
   - By default, React tries to run on **localhost:3000**. 
   - If your **Go REST API** also runs on 3000, React will prompt to run on **3001**. Approve that so the Fabric API remains on 3000.

4. **Open** [http://localhost:3001](http://localhost:3001) (or whichever port React chooses) to view the application in your browser.

---

## 4. Connecting to Your Hyperledger Fabric API

- Make sure your **Fabric test network** is up and chaincode `basic` is deployed on channel `mychannel`.
- Ensure your **Go REST API** is running on `http://localhost:3000`.  
- In the React code, calls like:

  ```jsx
  fetch("http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys")
  ```

  or

  ```jsx
  fetch("http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=CreateInsurancePolicy", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString()
  });
  ```

  must match your chaincode name (`basic`) and channel name (`mychannel`).

---

## 5. Usage

1. **Create**: 
   - Click **“Create Policy”** → fill out the form. 
   - The chaincode function `CreateInsurancePolicy` is invoked with 9 arguments (policyID, farmerID, etc.). 
   - If successful, you’ll see a success message.

2. **Read**:
   - Click **“Read Policies”** → the app calls `GetAllInsurancePolicys` function. 
   - Displays a table of policies.

3. **Update** (Optional):
   - If your app has an **Update** tab, you’d enter a policy ID and new status (or other fields). 
   - That triggers the chaincode function `UpdateInsurancePolicy`.

4. **Delete**:
   - If you have a “Delete Policy” tab, enter the policy ID. 
   - The request calls `DeleteInsurancePolicy` with `args=policyID`.

5. **Refresh**:
   - If you want to see newly created policies in the read table, either re-click “Read” or incorporate an auto-refresh whenever you create a policy.

---

## 6. Folder Structure

A typical layout could look like:

```
my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CreatePolicy.js
│   │   ├── ReadPolicies.js
│   │   ├── UpdatePolicy.js
│   │   ├── DeletePolicy.js
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 7. Tips & Notes

1. **CORS**: 
   - If you see “CORS error,” you may need to configure the Go REST API to allow requests from `http://localhost:3001`.

2. **x-www-form-urlencoded**: 
   - For chaincode endpoints expecting repeated `args` fields, use `URLSearchParams` in your fetch body:
     ```jsx
     const formData = new URLSearchParams();
     formData.append("args", policyID);
     // etc.
     ```

3. **.gitignore**: 
   - Avoid committing `node_modules` or `.env` secrets. Add them to `.gitignore`.

4. **Production Build**: 
   - Use `npm run build` to create an optimized production build in the `build` folder.

5. **Chaincode Field Order**:
   - The order of arguments in `CreateInsurancePolicy` must match your chaincode method signature. 
   - Make sure to pass the correct number of arguments, or you’ll see `Index out of bounds` errors.

---
