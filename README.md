
# Prep-AI
### AI-Powered Mock Interview & Career Preparation Platform

Prep-AI is an all-in-one career preparation platform powered by **Gemini AI**.  
It helps users practice **mock interviews**, analyze resumes, build resumes, generate cover letters, and practice technical questions — all with real-time, personalized AI feedback.

Built using **Next.js, Drizzle ORM, Neon PostgreSQL, Clerk Authentication**, and **Gemini AI**.

---

## 🚀 Features

### 🎤 AI Mock Interviews
- Real-time AI interviewer (voice/text)  
- Behavioural + HR + Technical questions  
- Adaptive difficulty based on user performance  
- Instant feedback on clarity, correctness, and confidence  

### 📄 Resume Analyzer
- Upload a resume  
- AI checks content, keywords, formatting, and structure  
- Provides ATS-style suggestions  

### 🏗 Resume Builder
- Create resumes from scratch  
- AI-assisted content generation  
- Export-ready output  

### ✉ Cover Letter Generator
- Generates job-specific cover letters  
- Adjustable tone and customization options  

### 💻 Technical Practice
- Topic-wise technical questions (Python, Java, Web Dev, etc.)  
- Explanation-rich AI feedback  

### 🔐 Secure Authentication
- Powered by Clerk  
- User data protected with role-based access, MFA support  

---

## 🧰 Tech Stack

**Frontend & Backend:** Next.js, React, TailwindCSS  
**Database:** Neon PostgreSQL, Drizzle ORM  
**AI:** Gemini AI  
**Authentication:** Clerk  
**Deployment:** Vercel  

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/priyanshu0511/prep-ai.git
cd prep-ai
```
### 2️⃣ Install dependencies
```bash
npm install
``` 

### 3️⃣ Create a `.env` file

Add your credentials:
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Drizzle / Database
NEXT_PUBLIC_DRIZZLE_DB_URL=your_database_url_here

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Interview Instructions
NEXT_PUBLIC_INFORMATION="Enable your webcam and microphone to start the interview.

There are 5 questions to answer, and at the end, you’ll get a report on your responses.

Note: We never record your video—this is for practice only."
NEXT_PUBLIC_INFO2="Click on record option to start recording your video for Interview. At last we will provide you a report on your answers."

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Contact Page
NEXT_PUBLIC_CONTACT_PAGE_PUBLIC_KEY=your_contact_page_public_key_here

```

### 4️⃣ Run the development server
```bash
npm run dev
```
## 🎯 Why Prep-AI?
-   Centralizes all interview-prep tools in one place
-   Gives personalized feedback instead of static question banks
-   Helps build confidence through realistic AI simulations
-   Great for students, job-seekers, and professionals
----------

## 📌 Future Enhancements

-   Multilingual interview support
-   More technical domains
-   Recruiter insight integration
-   Behavioral sentiment analysis
    

----------

## 🤝 Contributing

Contributions are welcome!
1.  Fork the repo
2.  Create a branch
3.  Submit a PR
    

----------

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

----------

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
