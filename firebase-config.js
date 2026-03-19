import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAlKSxzJQj27ZgNfuU2olM3nUo734_5hCM",
  authDomain:        "bloodlink-bd4ff.firebaseapp.com",
  projectId:         "bloodlink-bd4ff",
  storageBucket:     "bloodlink-bd4ff.firebasestorage.app",
  messagingSenderId: "452236946912",
  appId:             "1:452236946912:web:89e42d502c0d7931794f85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
```

Click **"Commit changes"** → **"Commit directly to main"** → **Commit**

---

### 👇 Then do these 3 things in Firebase:

**1.** Authentication → Enable **Email/Password** + **Google**

**2.** Firestore Database → Create → Test mode → `asia-south1`

**3.** Authentication → Settings → Authorized domains → Add:
```
antrojesvanth.github.io
