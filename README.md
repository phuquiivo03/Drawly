# 🎁 Lucky Slot

A simple social giveaway platform where users can create a giveaway, share an invite link, let others claim slots, and randomly select a winner.

## 💡 Concept

Instead of directly giving away an item, the owner creates a **Lucky Slot event** and divides it into multiple slots.

Example:

```text
🎁 Mechanical Keyboard

20 slots
10 people joined

Share the link → Friends pick a slot → Random draw → 🎉 Winner
```

The platform focuses on **simple sharing and social interaction**, rather than being a marketplace.

---

## 🔄 Main Flow

```text
Create Event
     ↓
Add Item & Slots
     ↓
Generate Share Link
     ↓
Share to Facebook / X / Discord / ...
     ↓
Participants Join
     ↓
Claim a Slot
     ↓
All Slots Filled / Event Ends
     ↓
Random Draw
     ↓
🎉 Winner
```

## 🔐 Authentication

Users can access an event through its public link without logging in.

Authentication is only required when joining or creating an event.

Supported providers can include:

- Facebook
- X
- Email

Supabase Auth manages authentication and user identities.

---

## 💰 Payment

The platform can support both:

- **Free events**
- **Paid slots**

For paid events, the platform does **not hold the money**.

Participants pay directly to the event owner through their configured payment method. Payment verification can be added later through QR/bank/MoMo integrations.

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend / Services

- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Supabase Realtime

No separate backend server is required for the MVP.

---

## 🗄 Core Data

```text
User
 └── creates → Event
                  │
                  ├── Item
                  ├── Slots
                  │     └── Participant
                  │
                  └── Winner
```

Main tables:

```text
...
```

---

## 🚀 MVP

The first version focuses on:

- Create a giveaway
- Generate shareable link
- Join an event
- Claim a slot
- Realtime slot updates
- Random winner selection
- Winner/result page
- Social login

Future features can include payment verification, live draw animation, notifications, and more social integrations.
