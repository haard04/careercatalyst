# Career Catalyst

Career Catalyst is a web application designed to help users track and manage their job applications seamlessly. It provides a user-friendly interface for organizing job opportunities and monitoring their progress through various stages of the application process.

## Technologies Used

- **Backend:** Django, REST APIs
- **Frontend:** React.js
- **Database:** AWS RDS

## Key Features

1. **User Authentication:**
   - Users can create accounts, log in, and log out.
   - Secure authentication system to protect user data.

2. **Job Tracking:**
   - Users can add and track job applications through different stages (e.g., Watchlist, Applied, Online Assessment, Interview, Accepted, Rejected).
   - Job details include role, company name, location, stipend, job type, job link, and referral information.

3. **Job Opportunities:**
   - All user-added jobs are displayed in the Job Opportunities section.
   - Each job is unique to the user and includes a report button.

4. **Reporting System:**
   - Users can report irrelevant or inappropriate job opportunities.
   - A job opportunity is deleted from the Job Opportunities section after receiving a certain number of reports.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   
2. Install Dependencies:
   
   ### For Backend: 
   ```bash
     cd backend
     pip install -r requirements.txt
   ```
   ### For Frontend:
  ```bash
    cd frontend
    npm install
  ```

3. Configure Database:
  - Set up your database credentials in the Django settings.
  - Migrate the database.
    
    ```bash
    cd backend
    python manage.py migrate
    ```
4. Run the Application:
   ### Start the Django development server.
     ```bash
     cd backend
     python manage.py runserver
     ```
  - Start the React.js development server.
    ```bash
    cd frontend
    npm start
    ```

5. Access the Application:
   ### Open your browser and navigate to http://localhost:3000 to access the Career Catalyst application.
