PRODUCT REQUIREMENTS DOCUMENT (PRD)

PROJECT NAME:
BirthdayVerse – Reusable Personalized Birthday Website

VERSION:
2.0

PROJECT TYPE:
Reusable Birthday Greeting Web Application

PRIMARY TECHNOLOGY:
Frontend:
HTML5
CSS3
JavaScript (ES6+)

Future Full-Stack:
Java
Spring Boot
REST API
MySQL / PostgreSQL
Cloud Image Storage

============================================================
1. PRODUCT OVERVIEW
============================================================

BirthdayVerse is a reusable personalized birthday website that allows
users to create beautiful and interactive birthday experiences for
different people without creating a new website for every birthday.

The same application should be reusable for:

- Sister
- Brother
- Friend
- Best Friend
- Parents
- Partner
- Classmate
- Teacher
- Any other person

The user should be able to enter birthday information, upload photos,
write personal messages, select themes, choose music, preview the
experience, and generate a personalized birthday page.

IMPORTANT PRODUCT PRINCIPLE:

ONE APPLICATION
+
REUSABLE UI
+
DYNAMIC BIRTHDAY DATA
+
PHOTO UPLOAD
+
PERSONALIZED CONTENT
=
UNLIMITED BIRTHDAY EXPERIENCES


============================================================
2. PROBLEM STATEMENT
============================================================

Currently, creating a personalized birthday website usually requires
editing HTML, CSS, JavaScript, images, and messages manually for every
person.

This creates several problems:

1. Requires coding knowledge.
2. Photos must be manually replaced in project files.
3. Messages must be manually edited.
4. A separate project may be created for every person.
5. Sharing and managing multiple birthday pages is difficult.
6. The same design has to be rebuilt repeatedly.

BirthdayVerse solves this problem by providing a reusable birthday
website where personalization can be performed through a user-friendly
interface.


============================================================
3. PRODUCT VISION
============================================================

To build a reusable birthday experience platform where anyone can
create a beautiful, interactive and personalized birthday website
without modifying source code.


============================================================
4. PRODUCT OBJECTIVES
============================================================

Primary Objectives:

1. Create a reusable birthday website.
2. Allow users to upload photos directly through the website.
3. Allow users to enter names and personal information.
4. Allow users to write customized birthday messages.
5. Allow users to select different visual themes.
6. Allow users to add background music.
7. Provide a live preview before generating the birthday experience.
8. Provide interactive birthday animations.
9. Make the website responsive on mobile, tablet and desktop.
10. Store birthday configuration for reuse.
11. Design the architecture so a backend can be added later.
12. Eventually generate unique shareable birthday URLs.


============================================================
5. SECONDARY OBJECTIVES
============================================================

1. Provide an attractive modern UI.
2. Create an emotional and memorable birthday experience.
3. Reduce the technical knowledge required from the user.
4. Provide reusable components.
5. Maintain clean and modular code.
6. Optimize website loading performance.
7. Support multiple birthday configurations in future.
8. Make the project suitable for deployment as a real web application.


============================================================
6. PRODUCT SCOPE
============================================================

The project will be developed in two major versions.

VERSION 1:
Frontend Birthday Website

VERSION 2:
Full-Stack Birthday Platform


============================================================
7. VERSION 1 – FRONTEND MVP
============================================================

Version 1 will work without a backend.

Technology:

HTML5
CSS3
JavaScript ES6+
LocalStorage
File API
HTML5 Audio API
Intersection Observer API

Optional:

Canvas
Confetti JavaScript library
Google Fonts


============================================================
8. VERSION 1 – MAIN FEATURES
============================================================

The frontend MVP must include:

1. Birthday customization
2. Name input
3. Age input
4. Relationship input
5. Birthday date
6. Profile photo upload
7. Multiple memory photo uploads
8. Birthday message
9. Personal message
10. Final message
11. Theme selection
12. Background music
13. Live preview
14. Interactive birthday experience
15. Welcome screen
16. Surprise reveal
17. Photo gallery
18. Personal letter
19. Why-you-are-special section
20. Confetti animation
21. Typing animation
22. Smooth scrolling
23. Background animations
24. Optional countdown
25. LocalStorage saving
26. Reset configuration
27. Responsive design


============================================================
9. VERSION 2 – FULL-STACK SYSTEM
============================================================

Version 2 will convert BirthdayVerse into a complete web application.

Frontend:

HTML
CSS
JavaScript

Backend:

Java
Spring Boot
REST API

Database:

MySQL or PostgreSQL

Storage:

Cloud image storage

Authentication:

User registration
Login
Logout

Deployment:

Frontend:
Vercel / Netlify

Backend:
Railway / Render / Cloud server

Database:
Cloud database


============================================================
10. VERSION 2 – FULL-STACK FEATURES
============================================================

1. User registration
2. User login
3. User authentication
4. Create birthday
5. Edit birthday
6. Delete birthday
7. Upload photos
8. Store photos online
9. Store birthday information in database
10. Select theme
11. Select music
12. Preview birthday page
13. Generate unique birthday URL
14. Share birthday URL
15. Manage multiple birthday pages
16. Birthday dashboard
17. Birthday page activation/deactivation
18. View created birthday pages
19. Edit existing birthday pages
20. Delete birthday pages


============================================================
11. TARGET USERS
============================================================

Primary Users:

- Students
- Young adults
- Friends
- Families
- Couples
- Social media users

Secondary Users:

- Event organizers
- Gift creators
- Small businesses
- Birthday planners


============================================================
12. USER ROLES
============================================================

VERSION 1:

Creator:
Person who creates the birthday experience.

Recipient:
Person receiving the birthday experience.

VERSION 2:

1. Registered User
2. Birthday Recipient
3. Admin


============================================================
13. MAIN USER FLOW – VERSION 1
============================================================

START
  ↓
Open BirthdayVerse
  ↓
Create Birthday
  ↓
Enter Person Details
  ↓
Upload Profile Photo
  ↓
Upload Memory Photos
  ↓
Enter Birthday Messages
  ↓
Select Theme
  ↓
Select Music
  ↓
Preview
  ↓
Save Configuration
  ↓
Generate Birthday Experience
  ↓
Open Birthday Experience
  ↓
Share Manually


============================================================
14. MAIN USER FLOW – VERSION 2
============================================================

USER
  ↓
Register / Login
  ↓
Dashboard
  ↓
Create Birthday
  ↓
Enter Details
  ↓
Upload Photos
  ↓
Add Messages
  ↓
Select Theme
  ↓
Select Music
  ↓
Preview
  ↓
Save
  ↓
Backend API
  ↓
Database + Cloud Storage
  ↓
Generate Unique Birthday URL
  ↓
Share Link
  ↓
RECIPIENT OPENS LINK
  ↓
Birthday Experience


============================================================
15. BIRTHDAY EXPERIENCE FLOW
============================================================

Recipient opens birthday link.

        ↓

Welcome Screen

"Someone prepared something special for you..."

        ↓

START SURPRISE BUTTON

        ↓

Surprise Animation

        ↓

Birthday Reveal

"Happy Birthday, ANANYA!"

        ↓

Profile Photo

        ↓

Personal Birthday Message

        ↓

Memory Gallery

        ↓

Personal Letter

        ↓

Why You Are Special

        ↓

Optional Mini Game

        ↓

Final Surprise

        ↓

Confetti

        ↓

Final Birthday Message

        ↓

"Happy Birthday!"


============================================================
16. APPLICATION PAGES – VERSION 1
============================================================

1. index.html

Main birthday experience.

2. customize.html

Birthday customization page.

3. preview.html

Live birthday preview.

Optional:

4. about.html

Information about BirthdayVerse.


============================================================
17. APPLICATION PAGES – VERSION 2
============================================================

1. Landing Page
2. Register Page
3. Login Page
4. User Dashboard
5. Create Birthday Page
6. Edit Birthday Page
7. Preview Page
8. Birthday Experience Page
9. Profile Page
10. Settings Page
11. Admin Dashboard


============================================================
18. CUSTOMIZATION PAGE
============================================================

The customization page is one of the most important features.

The user should NOT need to edit the code.

Example:

------------------------------------------------------------
CREATE YOUR BIRTHDAY
------------------------------------------------------------

Person Name:
[ Ananya                         ]

Age:
[ 22                             ]

Relationship:
[ Sister                         ]

Birthday:
[ 10 / 09 / 2026                ]

Profile Photo:

[ Upload Photo ]

Memory Photos:

[ Add Photos ]

Birthday Message:

[ Happy Birthday!                ]

Personal Message:

[ Write your personal message... ]

Final Message:

[ Write your final message... ]

Theme:

[ Cute ▼ ]

Music:

[ Select Music ]

[ Preview Birthday ]

[ Save Birthday ]

------------------------------------------------------------


============================================================
19. PHOTO UPLOAD SYSTEM
============================================================

Users should be able to upload photos directly from the website.

The system should support:

1. Profile photo
2. Multiple memory photos
3. Image preview
4. Image removal
5. Image replacement
6. Image validation

Supported formats:

JPG
JPEG
PNG
WEBP

The system should validate:

- File type
- File size
- Number of uploaded images

VERSION 1:

Images can be temporarily stored using browser-supported storage
mechanisms and/or represented through File API data.

VERSION 2:

Images should be uploaded to cloud storage through the backend.

Database should store the image URL rather than storing large image
files directly inside the database.


============================================================
20. MESSAGE CUSTOMIZATION
============================================================

The user should be able to customize:

1. Main birthday message
2. Personal message
3. Memory captions
4. "Why you are special" message
5. Final message

Example:

Main Message:

"Happy Birthday!"

Personal Message:

"You are one of the most special people in my life.
Thank you for always being there."

Final Message:

"Keep smiling, keep shining and enjoy your special day!"


============================================================
21. THEME SYSTEM
============================================================

The application should support multiple themes.

Initial themes:

1. Cute
2. Elegant
3. Romantic
4. Fun
5. Dark Neon

Future themes:

6. Minimal
7. Floral
8. Galaxy
9. Cartoon
10. Luxury
11. Nature
12. Festival


============================================================
22. MUSIC SYSTEM
============================================================

Users can select background music.

Features:

1. Play music
2. Pause music
3. Resume music
4. Volume control
5. Music toggle
6. Auto-play where browser policies allow
7. Music selection

Important:

The system should handle browser restrictions on automatic audio
playback.

Audio should normally begin after the user interacts with the page.


============================================================
23. INTERACTIVE FEATURES
============================================================

The birthday experience should include:

1. Start Surprise button
2. Animated birthday reveal
3. Confetti
4. Floating hearts
5. Floating balloons
6. Typing text
7. Image transitions
8. Scroll animations
9. Button hover effects
10. Smooth page transitions
11. Gallery navigation
12. Music controls
13. Surprise elements
14. Optional mini game


============================================================
24. OPTIONAL MINI GAME
============================================================

The birthday experience may include a small game.

Examples:

1. Catch the Hearts
2. Pop the Balloons
3. Birthday Memory Quiz
4. Guess the Birthday Message
5. Find the Hidden Surprise

The game should be optional.

The user can enable or disable the game during customization.


============================================================
25. PHOTO GALLERY
============================================================

The gallery should support:

1. Grid view
2. Carousel
3. Next / Previous buttons
4. Full-screen image
5. Image captions
6. Smooth transitions
7. Mobile-friendly layout

Example:

PHOTO 1 → PHOTO 2 → PHOTO 3 → PHOTO 4


============================================================
26. COUNTDOWN FEATURE
============================================================

Optional birthday countdown.

Example:

BIRTHDAY COUNTDOWN

02 Days
05 Hours
32 Minutes
10 Seconds

When the countdown reaches zero:

"Happy Birthday!"


============================================================
27. LOCAL STORAGE – VERSION 1
============================================================

LocalStorage should store birthday configuration such as:

- Name
- Age
- Relationship
- Birthday
- Messages
- Theme
- Music selection
- Other configuration values

The application should allow:

SAVE
LOAD
EDIT
RESET


============================================================
28. FUTURE DATABASE – VERSION 2
============================================================

Example Birthday entity:

Birthday
------------------------------------------------------------
id
user_id
name
age
relationship
birthday_date
profile_image_url
birthday_message
personal_message
final_message
theme
music
created_at
updated_at
status
share_code
------------------------------------------------------------


============================================================
29. FUTURE DATABASE ENTITIES
============================================================

USER

id
name
email
password_hash
created_at


BIRTHDAY

id
user_id
name
age
relationship
birthday_date
messages
theme
music
share_code
status
created_at
updated_at


PHOTO

id
birthday_id
image_url
caption
display_order
created_at


THEME

id
name
description
preview_image
status


============================================================
30. UNIQUE BIRTHDAY URL
============================================================

Version 2 should generate a unique birthday URL.

Example:

birthdayverse.com/b/ANANYA2026

or:

birthdayverse.com/b/8FJ72K


The recipient does not need an account.

They simply open the shared link.

Example:

Creator
  ↓
Creates Birthday
  ↓
System generates link
  ↓
Creator copies link
  ↓
Sends through WhatsApp / Instagram / Email
  ↓
Recipient opens link
  ↓
Birthday experience starts


============================================================
31. DASHBOARD – VERSION 2
============================================================

Dashboard should display:

My Birthdays

--------------------------------------
Ananya's Birthday
10 September 2026
Status: Active
[Edit] [Preview] [Share] [Delete]
--------------------------------------

Rahul's Birthday
25 October 2026
Status: Active
[Edit] [Preview] [Share] [Delete]
--------------------------------------

Priya's Birthday
12 December 2026
Status: Draft
[Edit] [Preview] [Delete]
--------------------------------------


============================================================
32. TECHNICAL ARCHITECTURE – VERSION 1
============================================================

Browser
   ↓
HTML
   ↓
CSS
   ↓
JavaScript
   ↓
LocalStorage
   ↓
File API
   ↓
Birthday Experience


No backend is required for Version 1.


============================================================
33. TECHNICAL ARCHITECTURE – VERSION 2
============================================================

                    FRONTEND
                       |
              HTML/CSS/JavaScript
                       |
                    REST API
                       |
               JAVA SPRING BOOT
                       |
        -------------------------------
        |                             |
      MYSQL                    CLOUD STORAGE
        |                             |
 Birthday Data                   Photos
        |
 User Data


============================================================
34. FRONTEND MODULES
============================================================

1. App Module
2. Birthday Data Module
3. Customization Module
4. Renderer Module
5. Gallery Module
6. Animation Module
7. Audio Module
8. Storage Module
9. Theme Module
10. Validation Module
11. Preview Module


============================================================
35. BACKEND MODULES – VERSION 2
============================================================

1. Authentication Module
2. User Module
3. Birthday Module
4. Photo Module
5. Theme Module
6. Music Module
7. Share Link Module
8. File Upload Module
9. Validation Module
10. Admin Module


============================================================
36. PROJECT FOLDER STRUCTURE – VERSION 1
============================================================

birthdayverse/
│
├── index.html
├── customize.html
├── preview.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── animations.css
│   ├── themes.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── birthday-data.js
│   ├── renderer.js
│   ├── customization.js
│   ├── gallery.js
│   ├── animations.js
│   ├── audio.js
│   ├── storage.js
│   ├── validation.js
│   └── preview.js
│
└── assets/
    ├── images/
    ├── music/
    └── icons/


============================================================
37. FUTURE PROJECT STRUCTURE – VERSION 2
============================================================

birthdayverse/
│
├── frontend/
│   ├── index.html
│   ├── customize.html
│   ├── dashboard.html
│   ├── birthday.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   └── springboot/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── security/
│       ├── exception/
│       └── config/
│
└── database/
    └── schema.sql


============================================================
38. DYNAMIC DATA MODEL – VERSION 1
============================================================

Example:

const birthdayData = {

    name: "Ananya",

    age: 22,

    relationship: "Sister",

    birthday: "2026-09-10",

    profileImage: "...",

    photos: [
        "...",
        "...",
        "..."
    ],

    birthdayMessage:
        "Happy Birthday!",

    personalMessage:
        "You are one of the most special people in my life.",

    finalMessage:
        "Keep smiling and stay happy always!",

    theme: "cute",

    music: "..."

};


IMPORTANT:

The UI must NOT contain hard-coded personal information.

The UI should receive information from birthdayData.


============================================================
39. DYNAMIC RENDERING
============================================================

HTML:

<h1 id="birthday-name"></h1>

JavaScript:

document.querySelector("#birthday-name")
        .textContent = birthdayData.name;


Therefore:

Changing the birthdayData should automatically change the birthday
experience.

The same application can be reused for different people.


============================================================
40. FORM VALIDATION
============================================================

Required fields:

Name
Birthday date
Birthday message

Optional fields:

Age
Relationship
Personal message
Final message
Photos
Music

Validation should check:

1. Empty name
2. Invalid date
3. Invalid image type
4. Image size
5. Maximum image count
6. Invalid text length

User should receive clear validation messages.


============================================================
41. RESPONSIVE DESIGN
============================================================

The application must work on:

Mobile
Tablet
Laptop
Desktop

Priority:

Mobile-first design.

The birthday experience should look good when opened from a mobile
phone because the recipient will commonly receive the birthday link
through messaging applications.


============================================================
42. UI/UX REQUIREMENTS
============================================================

Design should be:

Modern
Clean
Emotional
Interactive
Colorful
Smooth
Mobile-friendly

Avoid:

1. Excessive animations
2. Slow loading
3. Too many buttons
4. Complicated navigation
5. Poor contrast
6. Unnecessary popups


============================================================
43. ACCESSIBILITY
============================================================

The application should support:

1. Semantic HTML
2. Keyboard navigation
3. Alt text for images
4. Readable font sizes
5. Sufficient color contrast
6. Visible focus states
7. Reduced-motion preference


============================================================
44. PERFORMANCE REQUIREMENTS
============================================================

The website should:

1. Compress images where possible.
2. Avoid unnecessary JavaScript libraries.
3. Lazy-load gallery images.
4. Optimize CSS.
5. Minimize unnecessary animations.
6. Avoid blocking page rendering.
7. Use efficient DOM manipulation.

Large uploaded images should be resized/compressed before being stored
or uploaded in the full-stack version.


============================================================
45. SECURITY – VERSION 1
============================================================

Since Version 1 does not have a backend:

1. Do not store passwords.
2. Do not request sensitive information.
3. Validate uploaded files.
4. Sanitize user-generated text where required.
5. Do not execute uploaded content.
6. Limit image size and quantity.


============================================================
46. SECURITY – VERSION 2
============================================================

Full-stack version should implement:

1. Password hashing
2. Authentication
3. Authorization
4. Input validation
5. File validation
6. Secure file uploads
7. API validation
8. CORS configuration
9. SQL injection protection
10. Secure environment variables
11. HTTPS
12. Access control


============================================================
47. ERROR HANDLING
============================================================

The system should handle:

1. Invalid image
2. Large image
3. Missing required information
4. Failed image upload
5. Failed API request
6. Database error
7. Invalid birthday URL
8. Deleted birthday
9. Expired share link
10. Browser storage failure

Example:

"Unable to upload image. Please choose a JPG, PNG or WEBP image
under the allowed size."


============================================================
48. PREVIEW SYSTEM
============================================================

The customization page should provide a live preview.

Flow:

User changes name
       ↓
Preview updates

User uploads photo
       ↓
Preview updates

User changes theme
       ↓
Preview updates

User changes message
       ↓
Preview updates

This allows users to see the final result before saving.


============================================================
49. RESET FUNCTION
============================================================

A Reset button should allow the user to clear the current
configuration.

Confirmation:

"Are you sure you want to reset this birthday?"

Buttons:

Cancel
Reset


============================================================
50. BIRTHDAY EXPERIENCE SECTIONS
============================================================

SECTION 1:

Welcome

"Someone has prepared a special surprise for you..."


SECTION 2:

Surprise Unlock

"Ready?"

[ Open My Surprise ]


SECTION 3:

Birthday Reveal

"Happy Birthday, Ananya!"


SECTION 4:

Profile

Display profile photo and basic information.


SECTION 5:

Birthday Message

Display personalized birthday message.


SECTION 6:

Memory Gallery

Display uploaded photos.


SECTION 7:

Personal Letter

Display long-form personal message.


SECTION 8:

Why You Are Special

Display customized reasons/messages.


SECTION 9:

Mini Game

Optional.


SECTION 10:

Final Surprise

Confetti + animations.


SECTION 11:

Final Message

"Happy Birthday!
Keep smiling and enjoy your special day!"


============================================================
51. ANIMATION REQUIREMENTS
============================================================

Animations should include:

1. Fade in
2. Slide in
3. Scale
4. Floating elements
5. Confetti
6. Typing effect
7. Gallery transitions
8. Button effects
9. Scroll reveal

Animations should be optimized for mobile devices.


============================================================
52. CUSTOM CURSOR
============================================================

Optional desktop-only feature.

The custom cursor should not interfere with normal interaction.

It should be disabled automatically on touch devices.


============================================================
53. SCROLL ANIMATIONS
============================================================

Use Intersection Observer API to trigger animations when sections
enter the viewport.

Example:

Welcome
 ↓
Reveal
 ↓
Gallery
 ↓
Letter
 ↓
Final Surprise


============================================================
54. PHOTO CAPTIONS
============================================================

Each uploaded photo may optionally contain a caption.

Example:

Photo:
[image]

Caption:
"Our first college memory ❤️"


============================================================
55. MUSIC CONTROL UI
============================================================

A small music control should be available.

Example:

♪ Music ON

Click:

♪ Music OFF


============================================================
56. SHARE FEATURE – VERSION 1
============================================================

Version 1 can provide:

"Share" button

Possible options:

Copy URL
WhatsApp
Email
Social sharing where supported

Since Version 1 may use static hosting and LocalStorage, sharing a
fully personalized configuration between different devices is limited.

Therefore, true cross-device sharing should be implemented in
Version 2 using a backend and unique birthday URL.


============================================================
57. SHARE FEATURE – VERSION 2
============================================================

The backend will generate a unique public URL.

Example:

https://birthdayverse.com/b/AB12345


The recipient does not require login.

The birthday creator can:

Copy Link
Share Link
Deactivate Link
Edit Birthday
Delete Birthday


============================================================
58. ADMIN FEATURES – FUTURE
============================================================

Admin dashboard may include:

1. User management
2. Birthday page management
3. Reported content management
4. Storage monitoring
5. Application statistics
6. Theme management
7. System configuration


============================================================
59. NON-GOALS FOR VERSION 1
============================================================

The first version will NOT include:

1. User accounts
2. Login
3. Backend
4. Database
5. Cloud storage
6. Payment system
7. Complex admin panel
8. Social network
9. Real-time messaging


============================================================
60. DEVELOPMENT ROADMAP
============================================================

PHASE 1 – PROJECT SETUP

Create:

index.html
customize.html
CSS files
JavaScript files
assets folders


PHASE 2 – BASIC UI

Build:

Welcome screen
Customization form
Preview
Birthday experience


PHASE 3 – DYNAMIC DATA

Implement:

birthdayData
Dynamic rendering
Reusable components


PHASE 4 – PHOTO UPLOAD

Implement:

Profile photo upload
Multiple photo upload
Image preview
Image removal
Validation


PHASE 5 – CUSTOMIZATION

Implement:

Name
Age
Relationship
Messages
Theme
Music


PHASE 6 – INTERACTIONS

Implement:

Buttons
Gallery
Music
Typing effect
Confetti


PHASE 7 – LOCAL STORAGE

Implement:

Save
Load
Edit
Reset


PHASE 8 – RESPONSIVE DESIGN

Test:

Mobile
Tablet
Desktop


PHASE 9 – TESTING

Perform:

Functional testing
UI testing
Mobile testing
Browser testing
Performance testing


PHASE 10 – DEPLOYMENT

Deploy frontend using:

GitHub Pages
Vercel
Netlify


============================================================
61. FULL-STACK DEVELOPMENT ROADMAP
============================================================

PHASE 11:

Create Spring Boot backend.


PHASE 12:

Create REST APIs.


PHASE 13:

Create MySQL database.


PHASE 14:

Implement user authentication.


PHASE 15:

Implement birthday CRUD operations.


PHASE 16:

Implement image upload.


PHASE 17:

Connect cloud image storage.


PHASE 18:

Implement unique birthday URLs.


PHASE 19:

Create dashboard.


PHASE 20:

Deploy frontend + backend + database.


============================================================
62. API DESIGN – VERSION 2
============================================================

AUTH:

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout


BIRTHDAY:

POST /api/birthdays

GET /api/birthdays

GET /api/birthdays/{id}

PUT /api/birthdays/{id}

DELETE /api/birthdays/{id}


PHOTOS:

POST /api/birthdays/{id}/photos

GET /api/birthdays/{id}/photos

DELETE /api/photos/{id}


PUBLIC:

GET /api/public/b/{shareCode}


============================================================
63. EXAMPLE FULL-STACK FLOW
============================================================

POST /api/birthdays

Request:

{
    "name": "Ananya",
    "age": 22,
    "relationship": "Sister",
    "birthday": "2026-09-10",
    "birthdayMessage": "Happy Birthday!",
    "personalMessage": "You are very special to me.",
    "finalMessage": "Keep smiling!",
    "theme": "cute"
}


Backend:

Validate request
      ↓
Save birthday
      ↓
Generate share code
      ↓
Return birthday ID + share URL


Response:

{
    "birthdayId": 101,
    "shareCode": "AB12345",
    "shareUrl": "/b/AB12345"
}


============================================================
64. DATA SEPARATION PRINCIPLE
============================================================

The application must separate:

DATA
from
UI
from
BUSINESS LOGIC


Example:

birthday-data.js

Contains birthday configuration.


renderer.js

Displays the configuration.


animations.js

Handles animations.


gallery.js

Handles gallery.


storage.js

Handles LocalStorage.


This makes the project maintainable and reusable.


============================================================
65. CODE QUALITY REQUIREMENTS
============================================================

Follow:

1. Meaningful variable names.
2. Modular JavaScript.
3. Reusable functions.
4. No unnecessary duplicate code.
5. Separate CSS files logically.
6. Avoid hard-coded personal information.
7. Use comments for complex logic.
8. Keep files organized.
9. Use semantic HTML.
10. Validate all user input.


============================================================
66. TEST CASES
============================================================

TC001:
Open website.

Expected:
Welcome page loads correctly.


TC002:
Enter birthday name.

Expected:
Name appears in preview.


TC003:
Upload valid image.

Expected:
Image preview appears.


TC004:
Upload invalid file.

Expected:
Error message appears.


TC005:
Upload multiple images.

Expected:
Gallery preview appears.


TC006:
Change theme.

Expected:
Preview theme changes.


TC007:
Change birthday message.

Expected:
Preview updates.


TC008:
Save configuration.

Expected:
Configuration is stored.


TC009:
Reload page.

Expected:
Saved configuration can be restored.


TC010:
Reset configuration.

Expected:
Configuration is cleared.


TC011:
Open on mobile.

Expected:
Responsive layout works.


TC012:
Click Start Surprise.

Expected:
Birthday reveal begins.


TC013:
Play music.

Expected:
Music starts after permitted user interaction.


TC014:
Open invalid birthday link.

Expected:
Friendly error page.


============================================================
67. SUCCESS CRITERIA
============================================================

The project will be considered successful when:

1. One application can create multiple birthday experiences.
2. Users do not need to modify source code.
3. Photos can be uploaded through the website.
4. Birthday messages can be customized.
5. Themes can be changed.
6. Birthday experience updates dynamically.
7. Website works on mobile.
8. Configuration can be saved.
9. Birthday experience is visually attractive.
10. The architecture can be extended into a full-stack platform.


============================================================
68. MVP DEFINITION
============================================================

The MVP must contain:

[✓] Reusable birthday UI
[✓] Customization page
[✓] Name input
[✓] Birthday date
[✓] Relationship
[✓] Photo upload
[✓] Multiple memory photos
[✓] Birthday message
[✓] Personal message
[✓] Final message
[✓] Theme selection
[✓] Music
[✓] Live preview
[✓] Birthday reveal
[✓] Gallery
[✓] Confetti
[✓] Animations
[✓] LocalStorage
[✓] Responsive design
[✓] Reset configuration


============================================================
69. FUTURE PREMIUM FEATURES
============================================================

Possible future features:

1. Multiple birthday templates
2. AI-generated birthday messages
3. AI-generated birthday poems
4. AI-generated birthday captions
5. AI-generated birthday songs
6. Voice messages
7. Video memories
8. Multiple music tracks
9. QR code generation
10. Custom domain
11. Password-protected birthday page
12. Expiry date
13. Analytics
14. Social sharing
15. Premium themes


============================================================
70. FINAL PRODUCT VISION
============================================================

BirthdayVerse should eventually become a birthday website platform.

The final user experience should be:

User creates account
        ↓
Dashboard
        ↓
Create Birthday
        ↓
Enter person's details
        ↓
Upload photos
        ↓
Write messages
        ↓
Choose theme
        ↓
Choose music
        ↓
Preview
        ↓
Generate Birthday
        ↓
Unique Link
        ↓
Share Link
        ↓
Recipient opens link
        ↓
Interactive Birthday Experience


============================================================
71. IMPORTANT ARCHITECTURAL PRINCIPLE
============================================================

DO NOT create separate projects for different people.

Wrong:

birthday-sister/
birthday-friend/
birthday-brother/

Correct:

BirthdayVerse
     |
     +--- Birthday Data 1
     +--- Birthday Data 2
     +--- Birthday Data 3
     +--- Birthday Data 4


The application remains the same.

Only the data changes.


============================================================
72. EXAMPLE
============================================================

For Sister:

Name:
Ananya

Relationship:
Sister

Photos:
Sister photos

Message:
Personal sister message


For Friend:

Name:
Rahul

Relationship:
Friend

Photos:
Friend photos

Message:
Personal friend message


The same application handles both.

No source-code modification should be required.


============================================================
73. DEVELOPMENT PRIORITY
============================================================

Priority 1:
Project structure

Priority 2:
Customization form

Priority 3:
Photo upload

Priority 4:
Dynamic birthday data

Priority 5:
Birthday experience UI

Priority 6:
Gallery

Priority 7:
Animations

Priority 8:
Music

Priority 9:
LocalStorage

Priority 10:
Live preview

Priority 11:
Responsive design

Priority 12:
Testing

Priority 13:
Deployment

Priority 14:
Spring Boot backend

Priority 15:
MySQL database

Priority 16:
Cloud image storage

Priority 17:
Authentication

Priority 18:
Unique birthday URLs

Priority 19:
Dashboard


============================================================
74. SENIOR DEVELOPER PRINCIPLES
============================================================

1. Build MVP first.
2. Do not over-engineer Version 1.
3. Keep frontend independent from personal data.
4. Use reusable components.
5. Separate data, UI and logic.
6. Keep JavaScript modular.
7. Optimize images.
8. Test mobile early.
9. Avoid unnecessary libraries.
10. Design Version 1 so Version 2 can add a backend easily.
11. Never hard-code personal birthday information into UI.
12. Validate user input.
13. Handle errors gracefully.
14. Use Git for version control.
15. Maintain a clean README.
16. Use meaningful commits.
17. Keep the application scalable.


============================================================
75. FINAL SYSTEM ARCHITECTURE
============================================================

                 BIRTHDAYVERSE
                       |
          -------------------------
          |                       |
      VERSION 1                VERSION 2
          |                       |
     FRONTEND ONLY            FULL STACK
          |                       |
 HTML + CSS + JS          HTML/CSS/JS
          |                       |
    LocalStorage            REST API
          |                       |
     File API              Spring Boot
                                  |
                             MySQL/PostgreSQL
                                  |
                           Cloud Image Storage
                                  |
                           Unique Birthday URL


============================================================
76. FINAL REQUIREMENT
============================================================

The most important requirement of BirthdayVerse is REUSABILITY.

The developer must create ONE birthday website application that can
be reused for unlimited people.

The user should NOT have to:

- Create a new project
- Edit HTML manually
- Replace image paths manually
- Edit JavaScript manually
- Change CSS manually

Instead, the user should:

OPEN WEBSITE
      ↓
CUSTOMIZE
      ↓
UPLOAD PHOTOS
      ↓
WRITE MESSAGE
      ↓
SELECT THEME
      ↓
PREVIEW
      ↓
SAVE
      ↓
GENERATE
      ↓
SHARE


============================================================
77. FINAL PROJECT GOAL
============================================================

Build a modern, responsive, interactive and reusable birthday website
that starts as a frontend-only application and can later evolve into
a complete full-stack birthday platform.

FINAL TECHNOLOGY ROADMAP:

VERSION 1:

HTML
CSS
JavaScript
LocalStorage
File API

↓

VERSION 2:

Java
Spring Boot
REST API
MySQL
Cloud Storage

↓

VERSION 3:

Authentication
Dashboard
Unique Birthday URLs
Sharing
Multiple Templates
AI Features
Cloud Deployment


FINAL PRINCIPLE:

ONE CODEBASE
+
DYNAMIC DATA
+
USER PHOTO UPLOAD
+
PERSONALIZATION
+
REUSABLE UI
+
FULL-STACK READY ARCHITECTURE

=
BIRTHDAYVERSE