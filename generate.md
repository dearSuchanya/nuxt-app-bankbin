# Role
Act as a Senior Full Stack Developer specializing in Nuxt 3 and Tailwind CSS.

# Project Goal
Create a "Waste Bank System" (Web Application) used to manage buying recyclable waste from members.
The critical requirement is to **store all data in-memory (using Pinia or Nuxt useState)**. There is NO backend and NO database connection. Data should reset when the browser is refreshed (or persist via localStorage if easy to implement, but primarily in-memory).

# Tech Stack
- Framework: Nuxt 3 (Composition API, Script Setup)
- Styling: Tailwind CSS (use a green/eco-friendly color palette)
- Icons: Lucide Vue or Heroicons
- State Management: Pinia (Preferred) or useState

# Data Models (In-Memory Stores)
1. **Members Store**:
   - `id`: string (UUID or simple ID)
   - `name`: string
   - `phoneNumber`: string
   - `totalPoints`: number (or currency balance)
   - *Action*: `registerMember`, `updateBalance`
2. **Waste Types Store**:
   - `id`: string
   - `name`: string (e.g., Plastic Bottles, Glass, Cardboard, Aluminum Cans)
   - `pricePerKg`: number
   - *Action*: `updatePrice`
3. **Transactions Store**:
   - `id`: string
   - `memberId`: string
   - `wasteTypeId`: string
   - `weight`: number (kg)
   - `totalAmount`: number (calculated from weight * pricePerKg)
   - `timestamp`: date string
   - *Action*: `addTransaction`

# Required Pages & Features
Please generate the code for the following pages with a responsive Sidebar/Navbar layout:

## 1. Dashboard (Home Page - `/`)
- Display Summary Cards:
  - Total Members (count)
  - Total Waste Collected (kg)
  - Total Money Paid Out (currency)
- Show a "Recent Transactions" table (Limit to last 5).

## 2. Members Management (`/members`)
- A table listing all members with columns: ID, Name, Phone, Current Balance.
- A prominent button to "+ Register New Member".
- Clicking the button opens a Modal or navigates to a form to add a member.

## 3. Waste Price Settings (`/prices`)
- A list of waste types showing their current buying price per kg.
- Input fields allow the admin to edit the price per kg for each type.

## 4. Deposit/Transaction (The Core Feature - `/deposit`)
- A form to record a waste deposit.
- **Step 1**: Select Member (Dropdown or Search by name).
- **Step 2**: Select Waste Type (Dropdown showing name and current price).
- **Step 3**: Input Weight (kg).
- **Auto-Calculate**: Show the "Total Amount" to pay immediately as the weight changes.
- **Submit**: Clicking "Confirm Transaction" should:
  1. Add a record to the `Transactions Store`.
  2. Update the `Member's Balance` in the `Members Store`.
  3. Show a success toast/notification.
  4. Reset the form.

## 5. Transaction History (`/history`)
- A full table of all transactions.
- Filters (optional): Filter by Member or Waste Type.

# UI/UX Requirements
- Use a clean, modern design.
- Main Color: Emerald Green (`bg-emerald-600`, etc.) for buttons and headers.
- Use Card layouts for forms and tables.
- Ensure the layout is responsive (mobile-friendly).

# Seed Data
- Please initialize the Pinia stores with some **Mock Data** so the application is not empty upon first load.
  - Create 3-5 dummy members.
  - Create standard waste types (Plastic: 5 THB/kg, Glass: 2 THB/kg, Paper: 3 THB/kg).
  - Create 5-10 past transactions.

# Output Format
- Provide the full file structure.
- Provide the code for `nuxt.config.ts`, `tailwind.config.ts`.
- Provide the code for Pinia stores (`stores/wasteBank.ts`).
- Provide the Vue components and Pages.