# CAREFAST – Healthack Team Repository

CAREFAST is a mobile-first preventive risk monitoring and rapid emergency response app,
built for the Healthack hackathon under the Emergency Care Systems theme.

This repository is for **internal team use only** and follows strict role-based ownership.

---

## 👥 Team Roles

- **Tanishk** – Emergency Mode (core emergency screen)
- **Aditya** – App setup, navigation, global state
- **Ayushi** – Patient home & daily check-in screens
- **Mahi** – Risk engine & risk result screen
- **Vanshika** – Doctor dashboard (role-based)
- **Ayush** – Emergency timeline feature

Each member must work only on their assigned responsibility.

---

## 🛠 Tech Stack

- React Native (Expo)
- TypeScript
- Mock data only
- Rule-based logic (no AI diagnosis)

---

## 📂 Folder Structure (DO NOT CHANGE)
app/
├── App.tsx
├── navigation/
├── screens/
├── components/
├── context/
├── utils/


---

## 🔁 Git Workflow (MANDATORY)

1. Clone the repository
```bash
git clone <repo-url>
cd carefast-healthack


Create your own branch

git checkout -b role-yourname-feature


Example:

role-mahi-risk-engine


Work only on your assigned files

Push your code

git add .
git commit -m "Completed <feature name>"
git push origin role-yourname-feature

🎨 UI & COLOR RULES

White background everywhere

Green → vitals / safe

Light blue → logs & major sections

Red + white → emergency only

📸 Screenshots

Take screenshots of your work regularly.
Screenshots will be used for demo backup and PPT.

⏰ Deadline

Final internal deadline:
8th evening (Sunday)

After this, only bug fixes are allowed.

📌 Important Notes

No direct push to main

No backend APIs

No AI diagnosis or medical claims

Demo stability is highest priority
